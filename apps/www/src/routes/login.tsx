import { AuthCard } from "@rectangular-labs/ui/components/auth/auth-card";
import { AuthProvider } from "@rectangular-labs/ui/components/auth/auth-provider";
import { DiscordIcon, GoogleIcon } from "@rectangular-labs/ui/components/icon";
import { ThemeToggle } from "@rectangular-labs/ui/components/theme-provider";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { type } from "arktype";
import { authClient, getCurrentSession } from "~/lib/auth";
import { clientEnv } from "~/lib/env";

export const Route = createFileRoute("/login")({
  validateSearch: type({
    "next?": "string",
  }),
  loaderDeps: ({ search }) => {
    return {
      next: search.next,
    };
  },
  loader: async ({ deps }) => {
    const session = await getCurrentSession();
    if (session && deps.next) {
      return redirect({ to: deps.next });
    }
    return;
  },
  component: Login,
});

function Login() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const normalizedSuccessCallbackURL = search.next
    ? `${clientEnv().VITE_APP_URL}${search.next}`
    : `${clientEnv().VITE_APP_URL}/questions`;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <ThemeToggle className="absolute top-4 right-4" />
      <AuthProvider
        authClient={authClient}
        // credentials={}
        // plugins={["oneTap"]}
        redirects={{
          successCallbackURL: normalizedSuccessCallbackURL,
          onSuccess: () => {
            void navigate({ to: normalizedSuccessCallbackURL });
          },
        }}
        socialProviders={[
          {
            provider: "google",
            name: "Google",
            icon: GoogleIcon,
            method: "social",
          },

          {
            provider: "discord",
            name: "Discord",
            icon: DiscordIcon,
            method: "social",
          },
        ]}
      >
        <AuthCard />
      </AuthProvider>
    </div>
  );
}
