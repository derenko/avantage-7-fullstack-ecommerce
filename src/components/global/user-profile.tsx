import Link from "next/link";
import { User } from "lucide-react";

import { getServerUser } from "@/core/helpers";
import { Avatar } from "./avatar";
import { Button } from "../ui/button";

export async function UserProfile() {
  const user = await getServerUser();

  if (user) {
    return <Avatar image={user?.image!} name={user?.name!} />;
  } else {
    return (
      <Button variant="outline" asChild>
        <Link href="/sign-in" className="relative">
          <User />
          Sign In
        </Link>
      </Button>
    );
  }
}
