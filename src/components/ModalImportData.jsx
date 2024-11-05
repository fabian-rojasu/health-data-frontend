import { useState } from "react";
import useModal from "../hooks/useModal";
import "./ModalImport.css";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const ModalImportData = () => {
  const { auth } = useAuth();
  const { modal, handleModal } = useModal();
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataType, setDataType] = useState(null); // Default value

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", auth);
    formData.append("file_type", dataType);
    formData.append("file", selectedFile);

    console.log(formData.get("user_id"));
    console.log(formData.get("file_type"));
    console.log(formData.get("file"));

    fetch("http://127.0.0.1:8000/import-data", {
      method: "POST",
      body: formData,
    });

    toast.success("Data imported successfully");

    handleModal();
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