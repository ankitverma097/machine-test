import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {

    const [form, setForm] = useState({
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      sameAsResidential: false,
      residentialAddress: {
        street1: "",
        street2: ""
      },
      permanentAddress: {
        street1: "",
        street2: ""
      }
    });


  const [documents, setDocuments] = useState([
    { fileName: "", fileType: "", file: null },
    { fileName: "", fileType: "", file: null }
  ]);

  return (
    <FormContext.Provider value={{
      form, setForm,
      documents, setDocuments
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);