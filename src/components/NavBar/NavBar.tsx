import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { constants } from "crypto";
import NavLinks from "./NavLinks/NavLinks";
import { Skeleton } from "../ui/skeleton";
import MobileNav from "./Mobilenav/MobileNav";

const NavBar = () => {
  return (
    <div className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between p-2 bg-gray-100 bg-opacity-50 shadow-sm backdrop-blur-md">
      <div className="flex">
        <MobileNav />
        <Link className="hidden p-2 md:flex" href={"/"}>
          Logo
        </Link>
      </div>
      <div className="hidden md:flex md:items-center">
        <NavLinks navStyle="default" />
      </div>
      <div className="flex items-center">
        <Link className="flex p-2" href={"/account"}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              <Skeleton className="w-12 h-12 rounded-full" />
            </AvatarFallback>
          </Avatar>
        </Link>
        <Button variant="ghost" size="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
