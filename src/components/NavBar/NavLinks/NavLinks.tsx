"use client";
import Link from "next/link";
import { buttonVariants } from "../../ui/button";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", pathName: "/" },
  { name: "My Events", pathName: "/event_series" },
  { name: "Favorites", pathName: "/favorites" },
  { name: "Subscriptions", pathName: "/subscriptions" },
];

const NavLinks = () => {
  const pathName = usePathname();

  return (
    <div className="flex justify-center items-center p-2">
      {links.map((link) => {
        const isPathNameCurrent =
          pathName === link.pathName
            ? "text-white bg-primary"
            : "text-primary bg-white";

        return (
          <Link
            key={link.name}
            className={`${buttonVariants({
              variant: "outline",
            })} ${isPathNameCurrent} border-primary hover:text-primary mr-2`}
            href={link.pathName}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
