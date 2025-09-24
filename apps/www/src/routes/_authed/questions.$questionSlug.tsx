import { allQuestions } from "@rectangular-labs/content/collections";
import * as Icons from "@rectangular-labs/ui/components/icon";
import { Badge } from "@rectangular-labs/ui/components/ui/badge";
import { Button } from "@rectangular-labs/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@rectangular-labs/ui/components/ui/card";
import { Label } from "@rectangular-labs/ui/components/ui/label";
import { Progress } from "@rectangular-labs/ui/components/ui/progress";
import {
  RadioGroup,
  RadioGroupItem,
} from "@rectangular-labs/ui/components/ui/radio-group";
import {
  createFileRoute,
  Link,
  notFound,
  useNavigate,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { type } from "arktype";
import { useState } from "react";

// Server function to get a specific question by slug
const getQuestionBySlug = createServerFn({
  method: "GET",
})
  .validator(
    type({
      slug: "string",
    }),
  )
  .handler(({ data: { slug } }) => {
    const question = allQuestions.find((q) => q.slug === slug);
    if (!question) {
      throw notFound();
    }
    return question;
  });

// Server function to get all question slugs for navigation
const getAllQuestionSlugs = createServerFn({
  method: "GET",
}).handler(() => {
  return allQuestions.map((q) => q.slug);
});
export const Route = createFileRoute("/_authed/questions/$questionSlug")({
  component: QuestionPage,
  loader: async ({ params }) => {
    // Use server function to get the specific question
    const question = await getQuestionBySlug({
      data: { slug: params.questionSlug },
    });
    const allQuestionSlugs = await getAllQuestionSlugs();

    return {
      question,
      allQuestionSlugs,
    };
  },
});

function QuestionPage() {
  const { question, allQuestionSlugs } = Route.useLoaderData();
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const questions = allQuestionSlugs;

  const currentIndex = questions.indexOf(question.slug);
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === question.answer;
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      void navigate({
        to: "/questions/$questionSlug",
        params: {
          questionSlug: questions[currentIndex + 1] ?? "contract-law-1",
        },
      });
      // Reset state for next question
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      void navigate({
        to: "/questions/$questionSlug",
        params: {
          questionSlug: questions[currentIndex - 1] ?? "contract-law-1",
        },
      });
      // Reset state for previous question
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const getSubjectFromSlug = (slug: string) => {
    const parts = slug.split("-");
    return parts
      .slice(0, -1)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-6 py-16 md:px-8 md:py-24">
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
              {getSubjectFromSlug(question.slug)}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-muted-foreground text-sm">
              <span>
                Question {currentIndex + 1} of {questions.length}
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
                            ? "border-green-300 bg-green-50"
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
                              <Icons.Check className="h-5 w-5 text-green-600" />
                            ) : selectedAnswer === index ? (
                              <Icons.X className="h-5 w-5 text-red-600" />
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
                      ? "border-green-300 bg-green-50"
                      : "border-red-300 bg-red-50"
                  }`}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        isCorrect ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {isCorrect ? (
                        <Icons.Check className="h-5 w-5 text-green-700" />
                      ) : (
                        <Icons.X className="h-5 w-5 text-red-700" />
                      )}
                    </div>
                    <div>
                      <h3
                        className={`font-semibold ${
                          isCorrect ? "text-green-800" : "text-red-800"
                        }`}
                      >
                        {isCorrect ? "Correct!" : "Incorrect"}
                      </h3>
                      <p
                        className={`text-sm ${
                          isCorrect ? "text-green-700" : "text-red-700"
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

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <div className="flex w-full gap-4">
                  <Button
                    className="flex-1"
                    disabled={currentIndex === 0}
                    onClick={handlePrevious}
                    size="lg"
                    variant="outline"
                  >
                    <Icons.ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  {!showResult ? (
                    <Button
                      className="flex-1"
                      disabled={selectedAnswer === null}
                      onClick={handleSubmit}
                      size="lg"
                    >
                      Submit Answer
                    </Button>
                  ) : currentIndex === questions.length - 1 ? (
                    <Button asChild className="flex-1" size="lg">
                      <Link className="gap-2" to="/questions">
                        <Icons.Trophy className="h-4 w-4" />
                        Finish Quiz
                      </Link>
                    </Button>
                  ) : (
                    <Button className="flex-1" onClick={handleNext} size="lg">
                      Next Question
                      <Icons.ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
