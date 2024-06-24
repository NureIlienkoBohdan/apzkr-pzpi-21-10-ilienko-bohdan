import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllDrones, deleteExistingDrone } from "../state/droneSlice";
import { RootState } from "../store";
import Modal from "../components/Modal";
import DroneForm from "../components/DroneForm";
import DroneDetails from "../components/DroneDetails";

const DroneTable: React.FC = () => {
  const dispatch = useDispatch();
  const { drones, status } = useSelector((state: RootState) => state.drone);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState(null);

  useEffect(() => {
    dispatch(fetchAllDrones());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteExistingDrone(id));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDetails = (drone: any) => {
    setSelectedDrone(drone);
    setIsDetailsOpen(true);
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);
  };

  return (
    <div>
      <h2>Drone Management</h2>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Drone
      </button>
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Model ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Plan
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {drones.map((drone) => (
            <tr key={drone.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {drone.droneModel.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{drone.plan}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleDelete(drone.id!)}
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
                <button
                  onClick={() => openDetails(drone)}
                  className="text-green-600 hover:text-green-900 ml-4"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <DroneForm closeModal={closeModal} />
        </Modal>
      )}
      {isDetailsOpen && selectedDrone && (
        <Modal onClose={closeDetails}>
          <DroneDetails drone={selectedDrone} closeModal={closeDetails} />
        </Modal>
      )}
    </div>
  );
};

export default DroneTable;
