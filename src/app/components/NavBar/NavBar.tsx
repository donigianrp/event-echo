import Link from "next/link";

export default function NavBar() {
  return (
    <div>
      <div className="flex justify-between p-2">
        <Link className="flex p-2" href={"/"}>
          Logo
        </Link>
        <Link className="flex p-2" href={"/account"}>
          Account
        </Link>
      </div>
      <div className="flex justify-center p-2">
        <Link className="p-2" href={"/"}>
          Home
        </Link>
        <Link className="p-2" href={"/event_series"}>
          Event Series
        </Link>
        <Link className="p-2" href={"/favorites"}>
          Favorites
        </Link>
        <Link className="p-2" href={"/subscriptions"}>
          Subscriptions
        </Link>
      </div>
    </div>
  );
}
