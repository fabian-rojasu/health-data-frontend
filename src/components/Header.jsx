import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import useModal from "../hooks/useModal";
import { useNavigate } from 'react-router-dom';
export const Header = () => {
  const navigate = useNavigate();
  const { handleModal } = useModal();

  const handleImport = () => {
    handleModal();
  };

  return (
    <header className="main-header">
      <h2 className="title-header">Health App</h2>

      <div className="navbar">
        {/* Button for import data */}
        <button className="btn-import"
          onClick={handleImport}
        >
          <BiImport color="fff" size={20}  />
          Import Data
        </button>

        <Link
          to="/profile"
          className="btn-profile"
          onClick={() => navigate('/profile')}
        >
          
          <FaUserCircle color="0b1122" size={30}/>
        </Link>
      </div>
    </header>
  );
};
