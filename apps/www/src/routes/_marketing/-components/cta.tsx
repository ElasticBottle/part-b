import * as Icons from "@rectangular-labs/ui/components/icon";
import { Badge } from "@rectangular-labs/ui/components/ui/badge";
import { Button } from "@rectangular-labs/ui/components/ui/button";

export const CTA1 = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="flex flex-col items-center gap-8 rounded-md bg-muted p-4 text-center lg:p-14">
        <div>
          <Badge>Ready to Pass?</Badge>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="max-w-xl font-regular text-3xl tracking-tighter md:text-5xl">
            Start Your Part B Journey Today!
          </h3>
          <p className="max-w-xl text-lg text-muted-foreground leading-relaxed tracking-tight">
            Join thousands of successful candidates who passed the Singapore
            Part B Bar Examination using our proven study methods. Get instant
            access to comprehensive materials, practice tests, and expert
            guidance.
          </p>
        </div>
        <div className="flex flex-row gap-4">
          <Button className="gap-4" variant="outline">
            Book Free Consultation <Icons.PhoneCall className="h-4 w-4" />
          </Button>
          <Button className="gap-4">
            Get Full Access <Icons.MoveRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
);
