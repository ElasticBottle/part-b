import * as Icons from "@rectangular-labs/ui/components/icon";
import { Badge } from "@rectangular-labs/ui/components/ui/badge";

export const Feature1 = () => (
  <div className="w-full py-20 lg:px-8 lg:py-40">
    <div className="container mx-auto">
      <div className="container grid grid-cols-1 items-center gap-8 rounded-lg border px-4 py-8 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div>
              <Badge variant="outline">Comprehensive Study Platform</Badge>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="max-w-xl text-left font-regular text-3xl tracking-tighter lg:text-5xl">
                Everything You Need to Pass Part B
              </h2>
              <p className="max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight">
                Our comprehensive platform covers all areas of Singapore law
                tested in the Part B Bar Examination.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-3 lg:grid-cols-1 lg:pl-6">
            <div className="flex flex-row items-start gap-6">
              <Icons.Check className="mt-2 h-4 w-4 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Complete Coverage</p>
                <p className="text-muted-foreground text-sm">
                  All 8 core areas of law including Constitutional, Contract,
                  Criminal, Tort, Property, Family, Company, Administrative, and
                  Evidence Law.
                </p>
              </div>
            </div>
            <div className="flex flex-row items-start gap-6">
              <Icons.Check className="mt-2 h-4 w-4 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Practice Questions</p>
                <p className="text-muted-foreground text-sm">
                  Hundreds of realistic exam questions with detailed
                  explanations to test your knowledge.
                </p>
              </div>
            </div>
            <div className="flex flex-row items-start gap-6">
              <Icons.Check className="mt-2 h-4 w-4 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Expert Guidance</p>
                <p className="text-muted-foreground text-sm">
                  Study materials created by experienced Singapore legal
                  practitioners and bar exam experts.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="aspect-square rounded-md bg-muted"></div>
      </div>
    </div>
  </div>
);
