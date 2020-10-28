import { useState } from "react";

const useSignUpForm = (callback) => {
    const [inputs, setInputs] = useState({});
    const handleSubmit = (event) => {
      if (event) {
        event.preventDefault();
      }
    }
    const handleInputChange = (name,value) => {
      setInputs(inputs => ({...inputs, [name]: value}));
    }
    const handleEdit = (item) => {
      setInputs(item);
    }
    return {
      handleSubmit,
      handleInputChange,
      handleEdit,
      inputs
    };
  }

export default useSignUpForm;