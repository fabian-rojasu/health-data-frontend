import { useState } from "react";
import useModal from "../hooks/useModal";
import "./ModalImport.css";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const ModalImportData = ({ onDataImported }) => {
  const { auth } = useAuth();
  const { modal, handleModal } = useModal();
  const [selectedFile, setSelectedFile] = useState(
    "weight"
  );
  const [dataType, setDataType] = useState("weight");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", auth.userId);
    formData.append("file_type", dataType);
    formData.append("file", selectedFile);

    try {
      await fetch("http://127.0.0.1:8000/import-data", {
        method: "POST",
        body: formData,
      });

      toast.success("Data imported successfully");
      onDataImported();
      handleModal();
    } catch (error) {
      console.error(error)
      toast.error("Error importing data");
    }
  };

  if (!modal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-import">
        <h2 className="title-modal">Import Data</h2>
        
        <form onSubmit={handleSubmit}>
          <label className="label-modal">
            Data Type:
            <select 
              className="select-modal"
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
            >
              <option value="weight">Weight</option>
              <option value="height">Height</option>
              <option value="body_composition">Body Composition</option>
              <option value="body_fat_percentage">Body Fat Percentage</option>
              <option value="water">Water</option>
              <option value="steps">Steps</option>
              <option value="exercises">Exercises</option>
            </select>
          </label>

          <label className="label-modal">
            File:
            <input
              type="file"
              className="input-modal"
              onChange={handleFileChange}
              required
            />
          </label>

          <div>
            <button type="submit" className="btn-modal">
              Import
            </button>
            <button 
              type="button" 
              className="btn-cancel"
              onClick={handleModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalImportData;