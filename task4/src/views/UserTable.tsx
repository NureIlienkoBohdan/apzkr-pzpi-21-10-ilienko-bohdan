import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser, blockUser } from "../services/userService";
import { UserState } from "../state/userManagementSlice";
import Modal from "../components/Modal";
import UserForm from "../components/UserForm";
import { RootState } from "../store";

const UserTable: React.FC = () => {
  const dispatch = useDispatch();
  const userManagement: UserState = useSelector(
    (state: RootState) => state.userManagement
  );
  const { users, status } = userManagement;

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  const handleBlock = (userId: string) => {
    dispatch(blockUser(userId));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700 transition-colors"
      >
        Add User
      </button>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b space-x-2">
                <button
                  onClick={() => handleBlock(user.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition-colors"
                >
                  Block
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <UserForm closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default UserTable;
