import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createDroneUsage } from "../state/droneUsageSlice";

interface DroneUsageFormProps {
  closeModal: () => void;
}

const DroneUsageForm: React.FC<DroneUsageFormProps> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    user: { id: "" },
    drone: { id: "" },
    usage_type: "subscription",
    subscription: { id: "" },
    rental: { id: "" },
    start_time: "",
    end_time: "",
    status: "",
    condition: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createDroneUsage(formData));
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
      <h2>Add Drone Usage</h2>
      <div>
        <label>User ID:</label>
        <input
          type="text"
          name="user.id"
          value={formData.user.id}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div>
        <label>Drone ID:</label>
        <input
          type="text"
          name="drone.id"
          value={formData.drone.id}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div>
        <label>Usage Type:</label>
        <select
          name="usage_type"
          value={formData.usage_type}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        >
          <option value="subscription">Subscription</option>
          <option value="one-time rental">One-time Rental</option>
        </select>
      </div>
      {formData.usage_type === "subscription" && (
        <div>
          <label>Subscription ID:</label>
          <input
            type="text"
            name="subscription.id"
            value={formData.subscription.id}
            onChange={handleChange}
            className="w-full px-2 py-1 border rounded"
          />
        </div>
      )}
      {formData.usage_type === "one-time rental" && (
        <div>
          <label>Rental ID:</label>
          <input
            type="text"
            name="rental.id"
            value={formData.rental.id}
            onChange={handleChange}
            className="w-full px-2 py-1 border rounded"
          />
        </div>
      )}
      <div>
        <label>Start Time:</label>
        <input
          type="datetime-local"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div>
        <label>End Time:</label>
        <input
          type="datetime-local"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div>
        <label>Status:</label>
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div>
        <label>Condition:</label>
        <input
          type="text"
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Drone Usage
      </button>
    </form>
  );
};

export default DroneUsageForm;
