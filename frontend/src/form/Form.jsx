
import Address from "../components/Address";
import DocumentUpload from "../components/DocumentUpload";
import InputField from "../components/inputField";
import { useFormContext } from "../context/FormContext";
import "../index.css";
import API from "../services/api";

const Form = () => {
  // destructuring the state from the context
  const {
    form, setForm,
    documents
  } = useFormContext();

  const handleSubmit = async () => {
    try {

      if (documents.length < 2) {
        return alert("Minimum 2 documents required");
      }

      const formData = new FormData();

      Object.keys(form).forEach(key => {
        formData.append(key, form[key]);
      });

      formData.append("residentialAddress", JSON.stringify(form?.residentialAddress));
      formData.append(
        "permanentAddress",
        JSON.stringify(form.sameAsResidential ? form?.residentialAddress : form?.permanentAddress)
      );

      documents.forEach((doc) => {
        formData.append("documents", doc.file);
        formData.append("fileTypes[]", doc.fileType);
      });

      await API.post("/users", formData);

      alert("Submitted Successfully");

    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  return (
    <div className="container">

      <h1 className="title">User Credentials</h1>

      <div className="parent-input-div-first">
        <InputField label="First Name"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />

        <InputField label="Last Name"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
      </div>

      <div className="parent-input-div-second">
        <InputField label="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <InputField label="Date of Birth" type="date"
          value={form.dob}
          onChange={(e) => setForm({ ...form, dob: e.target.value })}
        />
      </div>

      <Address
        title="Residential Address"
        data={form?.residentialAddress}
        setData={(updatedAddress) =>
          setForm((prev) => ({
            ...prev,
            residentialAddress: updatedAddress
          }))
        }
      />

      <div className="checkbox">
        <span>Same as Residential Address</span>
        <input
          type="checkbox"
          checked={form.sameAsResidential}
          onChange={(e) => setForm({ ...form, sameAsResidential: e.target.checked })}
        />
      </div>

      {!form.sameAsResidential && (
        <Address
          title="Permanent Address"
          data={form?.permanentAddress}
          setData={(updatedAddress) =>
            setForm((prev) => ({
              ...prev,
              permanentAddress: updatedAddress
            }))
          }
        />
      )}

      <DocumentUpload />

      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>

    </div>
  );
};

export default Form;