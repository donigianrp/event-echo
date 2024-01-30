import NavLinks from './nav_links/nav_links';

const NavBar = () => {
  return (
    <div className="border-b h-screen hidden md:block fixed p-5 w-54 bg-opacity-30 dark:bg-slate-700 dark:bg-opacity-30 border-border bg-slate-200 backdrop-blur-md">
      <NavLinks navStyle="default" />
    </div>
  );
};

export default NavBar;
