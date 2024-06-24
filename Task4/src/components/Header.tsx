import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../state/userSlice";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const user = useSelector(selectUser);
  const isAuthenticated = !!user.userData;

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <header className="bg-blue-500 p-4 text-white flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img src="logo_without_bg.png" alt="Drone Logo" className="w-8 h-8" />
        <h1 className="text-2xl font-bold">{t("myLandingPage")}</h1>
      </div>
      <nav className="flex items-center space-x-4">
        <Link to="/" className="text-white">
          {t("home")}
        </Link>
        <Link to="/about" className="text-white">
          {t("about")}
        </Link>
        <select
          className="bg-blue-500 text-white border border-white rounded px-2 py-1"
          onChange={changeLanguage}
          value={i18n.language}
        >
          <option value="en">🇺🇸 English</option>
          <option value="uk">🇺🇦 Ukrainian</option>
        </select>
        {isAuthenticated ? (
          <>
            <Link
              to="/profile"
              className="bg-white text-blue-500 px-4 py-2 rounded"
            >
              {t("profile")}
            </Link>
            <Link
              to="/dashboard"
              className="bg-white text-blue-500 px-4 py-2 rounded"
            >
              {t("dashboard")}
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className="bg-white text-blue-500 px-4 py-2 rounded"
            >
              {t("signup")}
            </Link>
            <Link
              to="/signin"
              className="bg-white text-blue-500 px-4 py-2 rounded"
            >
              {t("signin")}
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
