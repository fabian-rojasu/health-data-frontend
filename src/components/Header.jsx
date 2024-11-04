import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";

export const Header = () => {
  return (
    <header className="main-header">
      <h2 className="title-header">Health App</h2>

      <div className="navbar">
        {/* Button for import data */}
        <button className="btn-import">
          <BiImport color="fff" size={20}  />
          Import Data
        </button>

        <Link>
          <FaUserCircle color="0b1122" size={30} />
        </Link>
      </div>
    </header>
  );
};
