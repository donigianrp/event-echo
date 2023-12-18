"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const links = [
  { name: "Home", pathName: "/" },
  { name: "My Events", pathName: "/event_series" },
  { name: "Favorites", pathName: "/favorites" },
  { name: "Subscriptions", pathName: "/subscriptions" },
];

interface Props {
  navStyle: "default" | "mobile";
}

const NavLinks = ({ navStyle }: Props) => {
  return (
    <div
      className={`${
        navStyle === "mobile" ? "" : "absolute left-1/2 -translate-x-1/2"
      }`}
    >
      <NavigationMenu className="m-auto">
        <NavigationMenuList
          className={`${navStyle === "mobile" ? "flex-col" : "flex-row"} gap-2`}
        >
          {links.map((link) => {
            return (
              <NavigationMenuItem key={link.name}>
                <Link href={link.pathName} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {link.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavLinks;
