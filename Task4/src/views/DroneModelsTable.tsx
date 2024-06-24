// src/views/DroneModelsTable.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDroneModels,
  deleteDroneModel,
  addDroneModel,
} from "../services/droneModelsService";
import { RootState } from "../store";
import Modal from "../components/Modal";
import DroneModelForm from "../components/DroneModelForm";

const DroneModelsTable: React.FC = () => {
  const dispatch = useDispatch();
  const { droneModels, status } = useSelector(
    (state: RootState) => state.droneModels
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDroneModels());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteDroneModel(id));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Drone Models Management</h2>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Drone Model
      </button>
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Manufacturer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {droneModels.map((model) => (
            <tr key={model.id}>
              <td className="px-6 py-4 whitespace-nowrap">{model.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {model.manufacturer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleDelete(model.id!)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
                <button
                  onClick={openModal}
                  className="text-indigo-600 hover:text-indigo-900 ml-4"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <DroneModelForm closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default DroneModelsTable;
