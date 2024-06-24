// src/components/DroneModelForm.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDroneModel } from "../services/droneModelsService";

interface DroneModelFormProps {
  closeModal: () => void;
}

const DroneModelForm: React.FC<DroneModelFormProps> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    weight: 0,
    max_speed: 0,
    max_flight_time: 0,
    max_range: 0,
    price: 0,
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addDroneModel(formData));
    // closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative">
      <button
        onClick={closeModal}
        className="bg-red-500 text-white px-4 py-2 rounded absolute top-0 right-0"
      >
        Close
      </button>
      <h2>Add Drone Model</h2>
      {/* нужна кнопка, чтобы была возможность закрыть модалку */}

      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div>
        <label>Manufacturer:</label>
        <input
          type="text"
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div>
        <label>Weight (g):</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div>
        <label>Max Speed (km/h):</label>
        <input
          type="number"
          name="max_speed"
          value={formData.max_speed}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div>
        <label>Max Flight Time (min):</label>
        <input
          type="number"
          name="max_flight_time"
          value={formData.max_flight_time}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div>
        <label>Max Range (km):</label>
        <input
          type="number"
          name="max_range"
          value={formData.max_range}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      <div>
        <label>Price (USD):</label>
        <input
          type="number"
          name="price"
          value={formData.price}
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
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Drone Model
      </button>
    </form>
  );
};

export default DroneModelForm;
