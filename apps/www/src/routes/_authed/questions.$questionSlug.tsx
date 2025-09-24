import { allQuestions } from "@rectangular-labs/content/collections";
import { createDb } from "@rectangular-labs/db";
import { userAnswerTable } from "@rectangular-labs/db/schema/user-answer-schema";
import * as Icons from "@rectangular-labs/ui/components/icon";
import { Badge } from "@rectangular-labs/ui/components/ui/badge";
import {
  Button,
  buttonVariants,
} from "@rectangular-labs/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@rectangular-labs/ui/components/ui/card";
import { Label } from "@rectangular-labs/ui/components/ui/label";
import { Progress } from "@rectangular-labs/ui/components/ui/progress";
import {
  RadioGroup,
  RadioGroupItem,
} from "@rectangular-labs/ui/components/ui/radio-group";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { type } from "arktype";
import { useState } from "react";
import { getCurrentSession } from "~/lib/auth";
import { serverEnv } from "~/lib/env";

// Server function to get question details including navigation metadata
const getQuestionDetails = createServerFn({ method: "GET" })
  .validator(
    type({
      slug: "string",
    }),
  )
  .handler(({ data: { slug } }) => {
    const index = allQuestions.findIndex((q) => q.slug === slug);
    if (index === -1) {
      throw notFound();
    }
    const question = allQuestions[index];
    if (!question) {
      throw notFound();
    }

    const totalQuestions = allQuestions.length;
    const previousSlug =
      index > 0 ? (allQuestions[index - 1]?.slug ?? null) : null;
    const nextSlug =
      index < totalQuestions - 1
        ? (allQuestions[index + 1]?.slug ?? null)
        : null;

    return {
      question,
      questionIndex: index,
      previousSlug,
      nextSlug,
      totalQuestions,
    };
  });

// Server function to record a user's answer
const recordAnswer = createServerFn({ method: "POST" })
  .validator(
    type({
      slug: "string",
      selectedAnswer: "number",
    }),
  )
  .handler(async ({ data: { slug, selectedAnswer } }) => {
    const env = serverEnv();
    const db = createDb(env.DATABASE_URL);
    const session = await getCurrentSession();
    const userId = session?.user?.id;
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const question = allQuestions.find((q) => q.slug === slug);
    if (!question) {
      throw notFound();
    }
    const isCorrect = selectedAnswer === question.answer;

    await db
      .insert(userAnswerTable)
      .values({
        userId,
        questionSlug: slug,
        subject: question.subject,
        selectedAnswer,
        isCorrect,
        answeredAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [
          userAnswerTable.userId,
          userAnswerTable.questionSlug,
          userAnswerTable.subject,
        ],
        set: {
          selectedAnswer,
          isCorrect,
          answeredAt: new Date(),
        },
      });

    return { isCorrect, subject: question.subject };
  });

export const Route = createFileRoute("/_authed/questions/$questionSlug")({
  component: QuestionPage,
  loader: async ({ params }) => {
    const details = await getQuestionDetails({
      data: { slug: params.questionSlug },
    });
    return details;
  },
});

function QuestionPage() {
  const { question, questionIndex, previousSlug, nextSlug, totalQuestions } =
    Route.useLoaderData();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  const handleSubmit = async () => {
    if (selectedAnswer === null) return;
    try {
      const result = await recordAnswer({
        data: { slug: question.slug, selectedAnswer },
      });
      setIsCorrect(!!result?.isCorrect);
      setShowResult(true);
    } catch {
      // Fall back to local evaluation on error
      const correct = selectedAnswer === question.answer;
      setIsCorrect(correct);
      setShowResult(true);
    }
  };

  const onNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  return (
    <div className="bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-6 py-16 md:px-8">
        {/* Header with Progress */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <Button asChild className="gap-2" variant="outline">
              <Link to="/questions">
                <Icons.ChevronLeft className="h-4 w-4" />
                Back to Quiz
              </Link>
            </Button>
            <Badge className="text-sm" variant="secondary">
              {question.subject}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-muted-foreground text-sm">
              <span>
                Question {questionIndex + 1} of {totalQuestions}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress className="h-2" value={progress} />
          </div>
        </div>

        {/* Question Card */}
        <div className="mx-auto max-w-4xl">
          <Card className="mb-10 border border-border/50 bg-card/90 text-card-foreground shadow-xl backdrop-blur-sm supports-[backdrop-filter]:bg-card/70">
            <CardHeader>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Icons.BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Part B Law Examination
                  </CardTitle>
                  <CardDescription>Multiple Choice Question</CardDescription>
                </div>
              </div>
              <div className="font-medium text-lg leading-relaxed md:text-xl">
                {question.question}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <RadioGroup
                className="space-y-4"
                disabled={showResult}
                onValueChange={(value) =>
                  setSelectedAnswer(parseInt(value, 10))
                }
                value={selectedAnswer?.toString() ?? null}
              >
                {question.options.map((option: string, index: number) => (
                  <div
                    className="flex items-center space-x-3"
                    key={`option-${index}-${option}`}
                  >
                    <RadioGroupItem
                      className="mt-1"
                      id={`option-${index}`}
                      value={index.toString()}
                    />
                    <Label
                      className={`flex-1 cursor-pointer rounded-lg border p-4 transition-colors ${
                        showResult
                          ? index === question.answer
                            ? "border-green-300 bg-green-50 dark:border-green-700/60 dark:bg-green-900/30"
                            : selectedAnswer === index &&
                                index !== question.answer
                              ? "border-destructive/30 bg-destructive/10 text-destructive"
                              : "border-border bg-card"
                          : selectedAnswer === index
                            ? "border-primary/40 bg-primary/5"
                            : "border-border bg-card hover:bg-muted/50"
                      }`}
                      htmlFor={`option-${index}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm md:text-base">
                          {String.fromCharCode(65 + index)}. {option}
                        </span>
                        {showResult && (
                          <div className="ml-2">
                            {index === question.answer ? (
                              <Icons.Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                            ) : selectedAnswer === index ? (
                              <Icons.X className="h-5 w-5 text-red-600 dark:text-red-400" />
                            ) : null}
                          </div>
                        )}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {/* Result Display */}
              {showResult && (
                <div
                  className={`rounded-lg border-2 p-6 ${
                    isCorrect
                      ? "border-green-300 bg-green-50 dark:border-green-700/60 dark:bg-green-900/30"
                      : "border-red-300 bg-red-50 dark:border-red-700/60 dark:bg-red-900/30"
                  }`}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        isCorrect
                          ? "bg-green-100 dark:bg-green-900/30"
                          : "bg-red-100 dark:bg-red-900/30"
                      }`}
                    >
                      {isCorrect ? (
                        <Icons.Check className="h-5 w-5 text-green-700 dark:text-green-300" />
                      ) : (
                        <Icons.X className="h-5 w-5 text-red-700 dark:text-red-300" />
                      )}
                    </div>
                    <div>
                      <h3
                        className={`font-semibold ${
                          isCorrect
                            ? "text-green-800 dark:text-green-200"
                            : "text-red-800 dark:text-red-200"
                        }`}
                      >
                        {isCorrect ? "Correct!" : "Incorrect"}
                      </h3>
                      <p
                        className={`text-sm ${
                          isCorrect
                            ? "text-green-700 dark:text-green-300"
                            : "text-red-700 dark:text-red-300"
                        }`}
                      >
                        {isCorrect
                          ? "Well done! You selected the right answer."
                          : `The correct answer is ${String.fromCharCode(65 + question.answer)}.`}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            {/* Action Buttons */}
            <CardFooter className="justify-between gap-4">
              {previousSlug && (
                <Link
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className: "flex-1",
                  })}
                  onClick={onNext}
                  params={{ questionSlug: previousSlug }}
                  to="/questions/$questionSlug"
                >
                  <Icons.ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Link>
              )}
              {!showResult && (
                <Button
                  className="flex-1"
                  disabled={selectedAnswer === null}
                  onClick={handleSubmit}
                  size="lg"
                >
                  Submit Answer
                </Button>
              )}
              {showResult && nextSlug && (
                <Link
                  className={buttonVariants({
                    size: "lg",
                    className: "flex-1",
                  })}
                  onClick={onNext}
                  params={{ questionSlug: nextSlug }}
                  to="/questions/$questionSlug"
                >
                  Next
                </Link>
              )}
              {showResult && !nextSlug && (
                <Link
                  className={buttonVariants({
                    size: "lg",
                    className: "flex-1",
                  })}
                  onClick={onNext}
                  to="/questions"
                >
                  <Icons.Trophy className="h-4 w-4" />
                  Finish Quiz
                </Link>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
