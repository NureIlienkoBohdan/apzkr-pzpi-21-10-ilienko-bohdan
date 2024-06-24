import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewDrone } from "../state/droneSlice";

interface DroneFormProps {
  closeModal: () => void;
}

const DroneForm: React.FC<DroneFormProps> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    droneModel: { id: "" },
    plan: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addNewDrone(formData));
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Drone Model ID:</label>
        <input
          type="text"
          name="droneModel.id"
          value={formData.droneModel.id}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div>
        <label>Plan:</label>
        <select
          name="plan"
          value={formData.plan}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        >
          <option value="">Select Plan</option>
          <option value="BASIC">Basic</option>
          <option value="PREMIUM">Premium</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Drone
      </button>
      <button
        type="button"
        onClick={closeModal}
        className="bg-red-500 text-white px-4 py-2 rounded ml-4"
      >
        Close
      </button>
    </form>
  );
};

export default DroneForm;
