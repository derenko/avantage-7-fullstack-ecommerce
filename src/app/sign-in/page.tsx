import { AuthProviderButton } from "@/components/sign-in";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const providers = await getProviders();

  if (!providers) {
    return redirect("/");
  }

  const providersArray = Object.values(providers);

  return (
    <Card className="w-[500px] m-auto mt-[200px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Create account using one of the providers
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {providersArray.map((provider) => (
          <AuthProviderButton key={provider.id} provider={provider} />
        ))}
      </CardContent>
    </Card>
  );
}
