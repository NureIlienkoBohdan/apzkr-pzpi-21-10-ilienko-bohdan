import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobApplications } from "../state/jobApplicationSlice";
import { RootState } from "../store";

const JobApplicationList: React.FC = () => {
  const dispatch = useDispatch();
  const { applications, status } = useSelector(
    (state: RootState) => state.jobApplications
  );

  useEffect(() => {
    dispatch(fetchJobApplications());
  }, [dispatch]);

  return (
    <div>
      <h2>My Job Applications</h2>
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Job Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applications.map((app) => (
            <tr key={app.id}>
              <td className="px-6 py-4 whitespace-nowrap">{app.jobTitle}</td>
              <td className="px-6 py-4 whitespace-nowrap">{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobApplicationList;
