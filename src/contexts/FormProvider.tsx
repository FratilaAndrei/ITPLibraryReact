import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { formType } from "../data/types/type";

export type formContextType = {
  formArray: formType[];
  updateFormArray: (updateForm: formType) => void;
  updateEditedForm: (editedForm: formType) => void;
};

const initialFormContext = {
  formArray: [],
  updateFormArray: () => {},
  updateEditedForm: () => {},
};

export const FormContext = createContext<formContextType>(initialFormContext);

const FormProvider: FC<PropsWithChildren> = ({ children }) => {
  const getInitialForms = () => {
    const FORM_STORAGE = localStorage.getItem("order-form");
    return FORM_STORAGE ? JSON.parse(FORM_STORAGE) : [];
  };
  const [formArray, setFormArray] = useState<formType[]>(getInitialForms());

  useEffect(() => {
    localStorage.setItem("order-form", JSON.stringify(formArray));
  }, [formArray]);

  const updateFormArray = (updateForm: formType) => {
    const formWithId = {
      ...updateForm,
      id: uuidv4(),
    };
    const updatedFormArray = [...formArray, formWithId];
    setFormArray(updatedFormArray);

    // Store the updated array in localStorage
    localStorage.setItem("order-form", JSON.stringify(updatedFormArray));
  };

  const updateEditedForm = (editedForm: formType) => {
    const existingForm = formArray.find((form) => form.id === editedForm.id);
    if (existingForm) {
      localStorage.setItem("order-form", JSON.stringify(editedForm));
      setFormArray([...formArray, existingForm]);
    }
  };

  return (
    <FormContext.Provider
      value={{ formArray, updateFormArray, updateEditedForm }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
