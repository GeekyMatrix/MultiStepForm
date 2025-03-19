import React, { useState } from "react";
import InputField from "./InputField";

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

  const validate = () => {
    let newErrors = {};

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
            type="email"
          />
          <InputField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            type="tel"
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

export default MultiStepForm;


