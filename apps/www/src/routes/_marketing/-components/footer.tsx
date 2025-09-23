import { Logo } from "@rectangular-labs/ui/components/icon";
import { Link } from "@tanstack/react-router";

const links = [
  {
    title: "Study Materials",
    href: "#",
  },
  {
    title: "Practice Tests",
    href: "#",
  },
  {
    title: "Success Stories",
    href: "#",
  },
  {
    title: "Pricing",
    href: "#",
  },
  {
    title: "Support",
    href: "#",
  },
  {
    title: "About",
    href: "#",
  },
];

export function Footer() {
  return (
    <footer className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Link aria-label="go home" className="mx-auto block size-fit" to="/">
          <Logo />
        </Link>

        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {links.map((link) => (
            <a
              className="block text-muted-foreground duration-150 hover:text-primary"
              href={link.href}
              key={`nav-${link.title}`}
            >
              <span>{link.title}</span>
            </a>
          ))}
        </div>
        <span className="block text-center text-muted-foreground text-sm">
          {" "}
          © {new Date().getFullYear()} Part B Exam Guide. All rights reserved.
          Your pathway to Singapore legal practice.
        </span>
      </div>
    </footer>
  );
}
