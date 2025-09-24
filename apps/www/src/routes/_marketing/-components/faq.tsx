import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@rectangular-labs/ui/components/ui/accordion";
import { Badge } from "@rectangular-labs/ui/components/ui/badge";
import { Section } from "@rectangular-labs/ui/components/ui/section";

export const FAQ2 = () => (
  <Section>
    <div className="container mx-auto">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <Badge variant="outline">FAQ</Badge>
          <div className="flex flex-col gap-2">
            <h4 className="max-w-xl text-center font-regular text-3xl tracking-tighter md:text-5xl">
              Frequently Asked Questions
            </h4>
            <p className="max-w-xl text-center text-lg text-muted-foreground leading-relaxed tracking-tight">
              Get answers to common questions about the Singapore Part B Bar
              Examination and our comprehensive study guide.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-3xl">
          <Accordion className="w-full" collapsible type="single">
            {[
              {
                question: "What is the Singapore Part B Bar Examination?",
                answer:
                  "The Part B Bar Examination is a professional qualification exam required for admission to the Singapore Bar. It tests knowledge across 8 core areas of Singapore law and legal practice.",
              },
              {
                question: "What subjects are covered in Part B?",
                answer:
                  "The exam covers Constitutional Law, Contract Law, Tort Law, Criminal Law, Evidence Law, Property Law, Family Law, Company Law, and Administrative Law.",
              },
              {
                question: "How long should I study for Part B?",
                answer:
                  "Most candidates study for 3-6 months, depending on their legal background. Our structured study plan helps you prepare efficiently within this timeframe.",
              },
              {
                question: "What is the pass rate for Part B?",
                answer:
                  "The pass rate varies yearly but typically ranges from 60-70%. With proper preparation using our comprehensive materials, your chances of success increase significantly.",
              },
              {
                question: "Can I retake the exam if I fail?",
                answer:
                  "Yes, you can retake the Part B examination. However, there are specific waiting periods and application requirements for retakes.",
              },
              {
                question: "How is the exam structured?",
                answer:
                  "The Part B exam consists of multiple-choice questions and written components testing your knowledge of Singapore law and legal principles.",
              },
              {
                question: "Do you offer one-on-one tutoring?",
                answer:
                  "Yes, we provide personalized tutoring sessions with qualified Singapore lawyers who can help clarify difficult concepts and exam strategies.",
              },
              {
                question: "What makes your study guide different?",
                answer:
                  "Our materials are specifically tailored for the Singapore Part B exam, regularly updated with recent case law, and include proven exam techniques from successful candidates.",
              },
            ].map((faq, index) => (
              <AccordionItem
                key={`faq-${faq.question.slice(0, 20)}`}
                value={`index-${index}`}
              >
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  </Section>
);
