import { FormProvider } from "./context/FormContext";
import Form from "./form/Form";

function App() {
  return (
    <FormProvider>
      <Form />
    </FormProvider>
  );
}

export default App;