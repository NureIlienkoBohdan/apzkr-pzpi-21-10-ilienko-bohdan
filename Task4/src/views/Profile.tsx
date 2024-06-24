import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, selectUser, logOut } from "../state/userSlice";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());

    navigate("/");
  };

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-4xl font-bold text-center">Profile</h2>
      {user.userData ? (
        <div className="mt-4">
          <p>
            <strong>Name:</strong> {user.userData.name}
          </p>
          <p>
            <strong>Email:</strong> {user.userData.email}
          </p>
          <p>
            <strong>Birth Date:</strong> {user.userData.birthDate}
          </p>
          <p>
            <strong>Roles: </strong> {user.userData.roles.join(", ")}
          </p>

          {/* need button for log-out */}

          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
          >
            Log Out
          </button>
        </div>
      ) : (
        <p className="mt-4 text-center">Loading...</p>
      )}
    </div>
  );
};

export default Profile;
