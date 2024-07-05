// ** Dropdowns Imports
import UserDropdown from "./UserDropdown";

const NavbarUser = ({ skin }) => {
  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      <UserDropdown skin={skin} />
    </ul>
  );
};
export default NavbarUser;
