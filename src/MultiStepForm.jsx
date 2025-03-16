import React, { useState } from "react";

const MultiStepForm = () => {
  const [step, setStep] = useState(1); // State for Managing Form Steps

  // State for Storing Form Data(formData stores the values of all form fields)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    country: "",
    email: "",
    phone: "",
  });

  //State for Validation Errors
  const [errors, setErrors] = useState({}); //errors stores validation messages for each field.

  // Validation Function
  const validate = () => {
    let newErrors = {}; //Empty object to Store validation messages

    if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      newErrors.firstName = "First Name must contain only letters";
    }

    if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      newErrors.lastName = "Last Name must contain only letters";
    }

    if (step === 3 && !/^[0-9]+$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain only digits";
    }

    if (step === 3 && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    //Updating the Errors State
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Handling the Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //For Next Page
  const nextStep = () => {
    if (validate()) setStep(step + 1);
  };

  //For Previous Page
  const prevStep = () => {
    setStep(step - 1);
  };

  //Submitting the Form
  const handleSubmit = () => {
    if (validate()) {
      alert("Form Submitted Successfully!");
      console.log(formData);
    }
  };

  return (
    <div className="container mt-5 p-4 border rounded bg-light">
      <h2>Welcome to my Page!</h2>

      {step === 1 && (
        <>
          <InputField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
          <InputField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />
          <button onClick={nextStep} className="btn btn-primary">
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="form-control mb-3"
          />
          <label className="form-label">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="form-control mb-3"
          >
            <option value="India">India</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Australia">Australia</option>
            <option value="South Africa">South Africa</option>
            <option value="England">England</option>
          </select>
          <div className="d-flex justify-content-between">
            <button onClick={prevStep} className="btn btn-secondary">
              Back
            </button>
            <button onClick={nextStep} className="btn btn-primary">
              Next
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <div className="d-flex justify-content-between">
            <button onClick={prevStep} className="btn btn-secondary">
              Back
            </button>
            <button onClick={handleSubmit} className="btn btn-success">
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({ label, name, value, onChange, error }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    <input
      type="text"
      name={name}
      placeholder={label}
      value={value}
      onChange={onChange}
      className="form-control"
    />
    {error && <div className="text-danger small">{error}</div>}
  </div>
);

export default MultiStepForm;

