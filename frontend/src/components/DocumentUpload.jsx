import { useFormContext } from "../context/FormContext";

const DocumentUpload = () => {

  const { documents, setDocuments } = useFormContext();

  const handleChange = (index, field, value) => {
    const updated = [...documents];
    updated[index][field] = value;
    setDocuments(updated);
  };

  const addDocument = () => {
    setDocuments([
      ...documents,
      { fileName: "", fileType: "", file: null }
    ]);
  };

  const removeDocument = (index) => {
    const updated = [...documents];
    updated.splice(index, 1);
    setDocuments(updated);
  };

  return (
    <div className="section">
      <h3>Upload Documents</h3>

      {documents.map((doc, index) => (
        <div className="document-child-component-main-div" key={index}>

          <input
            placeholder="File Name"
            className="input-field"
            value={doc.fileName}
            onChange={(e) =>
              handleChange(index, "fileName", e.target.value)
            }
          />

          <select
            value={doc.fileType}
            className="input-field"
            onChange={(e) =>
              handleChange(index, "fileType", e.target.value)
            }
          >
            <option value="">Type</option>
            <option value="image">Image</option>
            <option value="pdf">PDF</option>
          </select>

          <input
            type="file"
            className="input-field"
            onChange={(e) =>
              handleChange(index, "file", e.target.files[0])
            }
          />

          {index > 0 && (
            <button onClick={() => removeDocument(index)}>X</button>
          )}
        </div>
      ))}

      <button onClick={addDocument}>+ Add Document</button>
    </div>
  );
};

export default DocumentUpload;