"use client"; // Mark this as a Client Component

import { CircleUser, Package, User2Icon } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const User = () => {
  return (
    <div>
      {/* Show Sign In button if user is signed out */}
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>

      {/* Show UserButton and Dropdown Menu if user is signed in */}
      <SignedIn>
        <div className="flex items-center gap-2">
          {/* Clerk User Button */}
          <UserButton afterSignOutUrl="/" />

          {/* Dropdown Menu for Account Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User2Icon className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/orders" className="w-full">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    <span>My Orders</span>
                  </div>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SignedIn>
    </div>
  );
};

export default User;