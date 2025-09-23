import * as Icons from "@rectangular-labs/ui/components/icon";
import { Badge } from "@rectangular-labs/ui/components/ui/badge";
import { Button } from "@rectangular-labs/ui/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Hero2 = () => (
  <div className="w-full">
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">
        <div>
          <Badge variant="outline">Your Path to Legal Practice</Badge>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="max-w-2xl text-center font-regular text-5xl tracking-tighter md:text-7xl">
            Master the Singapore Part B Bar Exam
          </h1>
          <p className="max-w-2xl text-center text-lg text-muted-foreground leading-relaxed tracking-tight md:text-xl">
            Pass the Singapore Part B Bar Examination with confidence. Our
            comprehensive study guide covers all essential legal topics,
            practice questions, and exam strategies to help you qualify for
            legal practice in Singapore.
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <Button asChild className="gap-4" size="lg" variant="outline">
            <Link to="/questions">
              Take Practice Quiz <Icons.ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button className="gap-4" size="lg">
            Start Studying Now <Icons.MoveRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
);
