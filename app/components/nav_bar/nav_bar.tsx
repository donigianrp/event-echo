import NavLinks from './nav_links/nav_links';
import Header from '../header/header';

const NavBar = () => {
  return (
    <>
      <div className="h-screen hidden md:block fixed p-5 bg-opacity-30 border-r border-border w-[164px]">
        <Header />
        <NavLinks navStyle="default" />
      </div>
    </>
  );
};

export default NavBar;
