import React from "react";

interface DroneDetailsProps {
  drone: {
    name: string;
    manufacturer: string;
    weight?: number;
    max_speed?: number;
    max_flight_time?: number;
    max_range?: number;
    price?: number;
    description?: string;
  };
  closeModal: () => void;
}

const DroneDetails: React.FC<DroneDetailsProps> = ({ drone, closeModal }) => {
  return (
    <div className="p-4">
      <button
        onClick={closeModal}
        className="bg-red-500 text-white px-4 py-2 rounded absolute top-0 right-0"
      >
        Close
      </button>
      <h2 className="text-2xl font-bold mb-4">{drone.name}</h2>
      <p>
        <strong>Manufacturer:</strong> {drone.manufacturer}
      </p>
      {drone.weight && (
        <p>
          <strong>Weight:</strong> {drone.weight} g
        </p>
      )}
      {drone.max_speed && (
        <p>
          <strong>Max Speed:</strong> {drone.max_speed} km/h
        </p>
      )}
      {drone.max_flight_time && (
        <p>
          <strong>Max Flight Time:</strong> {drone.max_flight_time} min
        </p>
      )}
      {drone.max_range && (
        <p>
          <strong>Max Range:</strong> {drone.max_range} km
        </p>
      )}
      {drone.price && (
        <p>
          <strong>Price:</strong> ${drone.price}
        </p>
      )}
      {drone.description && (
        <p>
          <strong>Description:</strong> {drone.description}
        </p>
      )}
    </div>
  );
};

export default DroneDetails;
