import { Link } from "react-router-dom";

import logo from "../assets/logo.webp";

const Header = () => {
  return (
    <header className="bg-white shadow-md w-full p-4 absolute top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center w-full px-4">
        <div className="flex items-center">
          <Link to="/">
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="h-12 w-12 object-cover" />
              <span className="text-xl font-bold text-gray-800">
                Shoppingli
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;
