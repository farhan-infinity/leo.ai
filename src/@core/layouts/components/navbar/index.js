// ** React Imports
import { Fragment } from "react";

// ** Custom Components
import NavbarUser from "./NavbarUser";
import NavbarSearch from "./NavbarSearch";
// ** Third Party Components
import { Sun, Menu } from "react-feather";
import Moon from "../../../../../assets/icon/moon";

import { NavItem, NavLink } from "reactstrap";
const ThemeNavbar = (props) => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props;

  // ** Function to toggle Theme (Light/Dark)
  const handleThemeToggler = () => {
    if (skin === 'light') {
      setSkin('dark')
    } else {
      setSkin('light')
    }
  }

  return (
    <Fragment>
      <div>
        <div className="bookmark-wrapper d-flex align-items-center">
          <ul className="navbar-nav d-xl-none">
            <NavItem className="mobile-menu me-auto">
              <NavLink
                className="nav-menu-main menu-toggle hidden-xs is-active"
                onClick={() => setMenuVisibility(true)}
              >
                <Menu className="ficon" />
              </NavLink>
            </NavItem>
          </ul>
          <NavbarSearch />
        </div>
      </div>

      <NavbarUser skin={skin} setSkin={setSkin} />

      <div
        className="theme-button dark-theme-button"
        style={{ marginLeft: "10px" }}
      >
        <NavItem className="d-none d-lg-block">
          <NavLink
            onClick={() => handleThemeToggler()}
            className="nav-link-style dark-theme-nav-link-style"
          >
            {skin === 'light' ? <Sun className="ficon" /> : <Moon />}
          </NavLink>
        </NavItem>
      </div>
    </Fragment>
  );
};

export default ThemeNavbar;
