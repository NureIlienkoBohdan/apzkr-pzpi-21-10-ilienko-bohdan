import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createJobOpening } from "../state/jobOpeningsSlice";

interface JobOpeningFormProps {
  closeModal: () => void;
}

const JobOpeningForm: React.FC<JobOpeningFormProps> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: 0,
    salaryCurrency: "USD",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createJobOpening(formData));
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative">
      <button
        onClick={closeModal}
        className="bg-red-500 text-white px-4 py-2 rounded absolute top-0 right-0"
      >
        Close
      </button>
      <h2>Add Job Opening</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
          rows={4}
        />
      </div>
      <div>
        <label>Requirements:</label>
        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
          rows={4}
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div>
        <label>Salary (USD):</label>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div>
        <label>Salary Currency:</label>
        <select
          name="salaryCurrency"
          value={formData.salaryCurrency}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Job Opening
      </button>
    </form>
  );
};

export default JobOpeningForm;
