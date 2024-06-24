import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobOpenings, deleteJobOpening } from "../state/jobOpeningsSlice";
import { RootState } from "../store";
import Modal from "../components/Modal";
import JobOpeningForm from "../components/JobOpeningForm";

const JobOpeningTable: React.FC = () => {
  const dispatch = useDispatch();
  const { jobOpenings, status } = useSelector(
    (state: RootState) => state.jobOpenings
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchJobOpenings());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteJobOpening(id));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Job Openings Management</h2>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Job Opening
      </button>
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {jobOpenings.map((job) => (
            <tr key={job.id}>
              <td className="px-6 py-4 whitespace-nowrap">{job.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{job.location}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleDelete(job.id!)}
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
          <JobOpeningForm closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default JobOpeningTable;
