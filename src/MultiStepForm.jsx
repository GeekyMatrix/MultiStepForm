import React, { useState } from "react";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    country: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  // Validation Logic
  const validate = () => {
    let newErrors = {};

    if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      newErrors.firstName = "First Name must contain only letters";
    }

    if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      newErrors.lastName = "Last Name must contain only letters";
    }

    if (step === 3 && !/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain only digits";
    }

    if (step === 3 && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (validate()) setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    if (validate()) {
      alert("Form Submitted Successfully!");
      console.log(formData);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-80">
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
          <button onClick={nextStep} className="btn">
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="input"
          />
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Australia">Australia</option>
            <option value="South Africa">South Africa</option>
            <option value="England">England</option>
          </select>
          <div className="flex justify-between">
            <button onClick={prevStep} className="btn">
              Back
            </button>
            <button onClick={nextStep} className="btn">
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
          <div className="flex justify-between">
            <button onClick={prevStep} className="btn">
              Back
            </button>
            <button onClick={handleSubmit} className="btn">
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
  <div className="mb-4">
    <input
      type="text"
      name={name}
      placeholder={label}
      value={value}
      onChange={onChange}
      className="input"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default MultiStepForm;
