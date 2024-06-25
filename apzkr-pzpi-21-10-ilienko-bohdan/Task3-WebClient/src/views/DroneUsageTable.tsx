import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDroneUsages, deleteDroneUsage } from "../state/droneUsageSlice";
import { RootState } from "../store";
import Modal from "../components/Modal";
import DroneUsageForm from "../components/DroneUsageForm";

const DroneUsageTable: React.FC = () => {
  const dispatch = useDispatch();
  const { droneUsages, status } = useSelector(
    (state: RootState) => state.droneUsages
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDroneUsages());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteDroneUsage(id));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Drone Usage Management</h2>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Drone Usage
      </button>
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Drone ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Usage Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              End Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {droneUsages.map((usage) => (
            <tr key={usage.id}>
              <td className="px-6 py-4 whitespace-nowrap">{usage.user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{usage.drone.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {usage.usage_type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {usage.start_time}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{usage.end_time}</td>
              <td className="px-6 py-4 whitespace-nowrap">{usage.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleDelete(usage.id)}
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
          <DroneUsageForm closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default DroneUsageTable;
