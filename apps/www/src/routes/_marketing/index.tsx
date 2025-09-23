import { createFileRoute } from "@tanstack/react-router";
import { CTA1 } from "./-components/cta";
import { FAQ2 } from "./-components/faq";
import { Feature1 } from "./-components/features";
import { Hero2 } from "./-components/hero";

export const Route = createFileRoute("/_marketing/")({
  component: App,
});

function App() {
  return (
    <>
      <Hero2 />
      <Feature1 />
      <FAQ2 />
      <CTA1 />
    </>
  );
}
