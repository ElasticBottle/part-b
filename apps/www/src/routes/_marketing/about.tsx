import * as Icons from "@rectangular-labs/ui/components/icon";
import { Button } from "@rectangular-labs/ui/components/ui/button";
import { Section } from "@rectangular-labs/ui/components/ui/section";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_marketing/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container relative">
      <Section className="pb-8">
        <h1 className="font-bold text-2xl">About Pass Part B</h1>
        <p className="text-muted-foreground text-sm">
          Your trusted partner in preparing for the Singapore Part B Bar
          Examination.
        </p>
      </Section>
      <Section className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl">Our Mission</h2>
        <p className="text-muted-foreground">
          At Pass Part B, our mission is to empower aspiring legal professionals
          to pass the Singapore Part B Bar Examination with confidence. We
          understand the challenges and pressures that come with this critical
          step in your legal career, and we are dedicated to providing a
          comprehensive, user-friendly, and effective study platform to help you
          succeed.
        </p>
        <h2 className="font-bold text-2xl">
          What is the Singapore Part B Bar Exam?
        </h2>
        <p className="text-muted-foreground">
          The Singapore Part B Bar Examination is the final hurdle for law
          graduates seeking to be admitted to the Singapore Bar. It is a
          rigorous assessment that tests practical skills and knowledge across a
          wide range of legal subjects. Passing this exam is a mandatory
          requirement to qualify as a lawyer in Singapore, making it one of the
          most important examinations in a lawyer's journey.
        </p>
        <h2 className="font-bold text-2xl">Why Choose Pass Part B?</h2>
        <p className="text-muted-foreground">
          We have meticulously designed our platform to cater to the specific
          needs of Part B candidates. Here's what sets us apart:
        </p>
        <ul className="flex list-inside list-disc flex-col gap-2 text-muted-foreground">
          <li>
            <strong>Comprehensive Coverage:</strong> Our study materials cover
            all the essential topics for the Part B exam, ensuring you have a
            solid foundation in every subject.
          </li>
          <li>
            <strong>Extensive Practice Questions:</strong> We offer a vast bank
            of practice questions that mirror the format and difficulty of the
            actual exam, allowing you to test your knowledge and improve your
            exam-taking skills.
          </li>
          <li>
            <strong>Effective Exam Strategies:</strong> Beyond just knowledge,
            we provide valuable insights and strategies on how to approach the
            exam, manage your time effectively, and tackle difficult questions.
          </li>
          <li>
            <strong>User-Friendly Interface:</strong> Our platform is designed
            to be intuitive and easy to navigate, so you can focus on what
            matters most - studying.
          </li>
        </ul>
        <h2 className="font-bold text-2xl">Our Approach to Learning</h2>
        <p className="text-muted-foreground">
          We believe in a structured and active approach to learning. Our
          content is organized to guide you through the syllabus logically. By
          combining detailed study guides with interactive quizzes, we help you
          reinforce your learning and track your progress. Our goal is to make
          your study process as efficient and effective as possible.
        </p>
        <div className="flex flex-row gap-3 pt-8">
          <Button asChild className="gap-4" size="lg">
            <Link to="/questions">
              Start Studying Now <Icons.MoveRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </div>
  );
}
