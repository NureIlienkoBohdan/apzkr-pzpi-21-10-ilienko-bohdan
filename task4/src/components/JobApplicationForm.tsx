import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { applyForJobOpening } from "../services/collaborationsService";

const JobApplicationForm: React.FC<{ jobId: string }> = ({ jobId }) => {
  const dispatch = useDispatch();
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(applyForJobOpening({ jobId, coverLetter }));
    setCoverLetter("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Cover Letter:</label>
        <textarea
          name="coverLetter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
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
