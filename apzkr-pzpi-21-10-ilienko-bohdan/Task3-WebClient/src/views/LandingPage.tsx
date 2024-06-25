import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mt-10">{t("welcome")}</h2>
      <p className="mt-4 text-lg">{t("explore")}</p>
      <img
        className="mx-auto mt-10"
        src="https://via.placeholder.com/600x400"
        alt="Landing"
      />
      <Link
        to="/collaborate"
        className="mt-10 inline-block bg-blue-500 text-white px-6 py-3 rounded"
      >
        {t("collaborateWithUs")}
      </Link>
    </div>
  );
};

export default LandingPage;
