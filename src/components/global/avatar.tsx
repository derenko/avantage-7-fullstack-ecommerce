"use client";

import { User, LogOut, ShoppingCart } from "lucide-react";
import { useMemo } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar as AvatarComponent,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface AvatarProps {
  image: string;
  name: string;
}

const links = [
  {
    label: "Personal",
    href: "/personal",
    icon: <User className="mr-2 h-4 w-4" />,
  },
];

export const Avatar: React.FC<AvatarProps> = ({ image, name }) => {
  const firstTwoLettersOfName = useMemo(() => {
    const [firstName, lastName] = name.split(" ");
    return `${firstName[0]} ${lastName[0]}`.toUpperCase();
  }, [name]);

  const handleClickSignOut = () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <AvatarComponent className="cursor-pointer">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{firstTwoLettersOfName}</AvatarFallback>
        </AvatarComponent>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {links.map((link) => (
            <DropdownMenuItem
              key={link.href}
              asChild
              className="cursor-pointer"
            >
              <Link href={link.href}>
                {link.icon}
                <span>{link.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleClickSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
