import NavLinks from './nav_links/nav_links';
import Header from '../header/header';

const NavBar = () => {
  return (
    <>
      <div className="min-h-screen hidden lg:flex p-5 sticky left-0 bg-opacity-30 border-r border-border">
        <div className="sticky self-start top-5">
          <div className="flex flex-col grow gap-4">
            <Header />
            <NavLinks navStyle="default" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
