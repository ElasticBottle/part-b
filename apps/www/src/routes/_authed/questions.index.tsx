import { allQuestions } from "@rectangular-labs/content/collections";
import { asc, count, createDb, eq, sql, sum } from "@rectangular-labs/db";
import { userAnswerTable } from "@rectangular-labs/db/schema/user-answer-schema";
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
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getCurrentSession } from "~/lib/auth";
import { serverEnv } from "~/lib/env";

// Server function to compute per-subject stats for current user
const getDashboardData = createServerFn({ method: "GET" }).handler(async () => {
  const env = serverEnv();
  const db = createDb(env.DATABASE_URL);
  const session = await getCurrentSession();
  const userId = session?.user?.id ?? null;

  // Aggregate total questions per subject from content
  const subjects = Array.from(
    new Set(allQuestions.map((q) => q.subject)),
  ).sort();
  const totalPerSubject = subjects.reduce<Record<string, number>>((acc, s) => {
    acc[s] = allQuestions.filter((q) => q.subject === s).length;
    return acc;
  }, {});

  const baseSelect = db
    .select({
      subject: userAnswerTable.subject,
      answered_count: count().mapWith(Number),
      correct_count: sum(
        sql<number>`case when ${userAnswerTable.isCorrect} then 1 else 0 end`,
      ).mapWith(Number),
    })
    .from(userAnswerTable)
    .groupBy(userAnswerTable.subject)
    .orderBy(asc(userAnswerTable.subject));

  const rows = userId
    ? await baseSelect.where(eq(userAnswerTable.userId, userId))
    : await baseSelect;

  const bySubject: Record<
    string,
    { total: number; answered: number; correct: number }
  > = {};
  for (const s of subjects) {
    bySubject[s] = {
      total: totalPerSubject[s] ?? 0,
      answered: 0,
      correct: 0,
    };
  }
  for (const r of rows) {
    const current = bySubject[r.subject] ?? {
      total: totalPerSubject[r.subject] ?? 0,
      answered: 0,
      correct: 0,
    };
    current.answered = r.answered_count;
    current.correct = r.correct_count;
    bySubject[r.subject] = current;
  }

  const totalQuestions = allQuestions.length;
  const totalAnswered = Object.values(bySubject).reduce(
    (a, b) => a + b.answered,
    0,
  );
  const totalCorrect = Object.values(bySubject).reduce(
    (a, b) => a + b.correct,
    0,
  );

  return {
    subjects,
    bySubject,
    totals: { totalQuestions, totalAnswered, totalCorrect },
    firstSlug: allQuestions[0]?.slug ?? "contract-law-1",
  };
});

export const Route = createFileRoute("/_authed/questions/")({
  component: QuestionsIntro,
  loader: async () => {
    const data = await getDashboardData();
    return data;
  },
});

function QuestionsIntro() {
  const { subjects, bySubject, totals, firstSlug } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-6 py-16 md:px-8 md:py-24">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/90 shadow-xl ring-2 ring-border/30">
            <Icons.BookOpen className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text font-semibold text-4xl text-transparent tracking-tight md:text-5xl">
            Part B Law Exam Quiz
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Test your knowledge of Singapore law with comprehensive questions
            covering all major areas of the Part B examination.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border border-border/50 bg-card/80 text-center text-card-foreground shadow-xl backdrop-blur-sm supports-[backdrop-filter]:bg-card/70">
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-border/20">
                <Icons.Target className="h-6 w-6 text-primary" />
              </div>
              <div className="mb-1 font-semibold text-3xl text-foreground tracking-tight">
                {totals.totalQuestions}
              </div>
              <div className="text-muted-foreground text-sm">
                Practice Questions
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/50 bg-card/80 text-center text-card-foreground shadow-xl backdrop-blur-sm supports-[backdrop-filter]:bg-card/70">
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-border/20">
                <Icons.Clock className="h-6 w-6 text-primary" />
              </div>
              <div className="mb-1 font-semibold text-3xl text-foreground tracking-tight">
                {Math.max(10, Math.round(totals.totalQuestions * 1.5))}
              </div>
              <div className="text-muted-foreground text-sm">
                Minutes Duration
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/50 bg-card/80 text-center text-card-foreground shadow-xl backdrop-blur-sm supports-[backdrop-filter]:bg-card/70">
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-border/20">
                <Icons.Trophy className="h-6 w-6 text-primary" />
              </div>
              <div className="mb-1 font-semibold text-3xl text-foreground tracking-tight">
                {subjects.length}
              </div>
              <div className="text-muted-foreground text-sm">Subject Areas</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-4xl">
          <Card className="mb-10 border border-border/50 bg-card/90 text-card-foreground shadow-xl backdrop-blur-sm supports-[backdrop-filter]:bg-card/70">
            <CardHeader className="pb-8 text-center">
              <CardTitle className="font-semibold text-3xl tracking-tight">
                Quiz Coverage
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground md:text-lg">
                This comprehensive quiz covers all major areas tested in the
                Singapore Part B law examination
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                {subjects.map((subject) => {
                  const s = bySubject[subject] ?? {
                    total: 0,
                    answered: 0,
                    correct: 0,
                  };
                  const percent = s.total
                    ? Math.round((s.correct / s.total) * 100)
                    : 0;
                  return (
                    <Card
                      className="border border-border/50 bg-muted/30 shadow-sm"
                      key={subject}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{subject}</CardTitle>
                          <Badge className="text-xs" variant="secondary">
                            {s.correct}/{s.total} correct
                          </Badge>
                        </div>
                        <CardDescription className="text-xs">
                          Answered {s.answered} of {s.total}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-2 w-full overflow-hidden rounded bg-muted">
                          <div
                            className="h-2 bg-primary"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="mb-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-primary" />
                  <p className="text-muted-foreground">
                    <strong>Multiple Choice Questions:</strong> Each question
                    has 4 options with only one correct answer
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-primary" />
                  <p className="text-muted-foreground">
                    <strong>Instant Feedback:</strong> Get immediate results
                    after each question with detailed explanations
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-primary" />
                  <p className="text-muted-foreground">
                    <strong>Navigate Freely:</strong> Move back and forth
                    between questions to review your answers
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Button
                  asChild
                  className="h-12 px-8 text-base shadow-lg transition-all duration-200 hover:shadow-xl"
                  size="lg"
                >
                  <Link
                    params={{ questionSlug: firstSlug }}
                    to="/questions/$questionSlug"
                  >
                    <Icons.BookOpen className="mr-2 h-5 w-5" />
                    Start Quiz
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Back to Home */}
          <div className="text-center">
            <Button asChild className="gap-2" variant="outline">
              <Link to="/">
                <Icons.ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
