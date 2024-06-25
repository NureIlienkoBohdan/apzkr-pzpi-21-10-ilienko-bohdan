import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  applyForJobOpening,
  fetchJobOpenings,
} from "../state/jobApplicationSlice";
import { RootState } from "../store";

const JobApplicationForm: React.FC = () => {
  const dispatch = useDispatch();
  const [coverLetter, setCoverLetter] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("");
  const jobOpenings = useSelector(
    (state: RootState) => state.jobApplication.jobOpenings
  );

  useEffect(() => {
    dispatch(fetchJobOpenings());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "coverLetter") {
      setCoverLetter(value);
    } else if (name === "selectedJobId") {
      setSelectedJobId(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedJobId) {
      dispatch(applyForJobOpening({ jobId: selectedJobId, coverLetter }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2>Apply for Job</h2>
      <div>
        <label>Job Opening:</label>
        <select
          name="selectedJobId"
          value={selectedJobId}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
        >
          <option value="" disabled>
            Select a job
          </option>
          {jobOpenings.map((job) => (
            <option key={job.id} value={job.id}>
              {job.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Cover Letter:</label>
        <textarea
          name="coverLetter"
          value={coverLetter}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded"
          rows={4}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Apply
      </button>
    </form>
  );
};

export default JobApplicationForm;
