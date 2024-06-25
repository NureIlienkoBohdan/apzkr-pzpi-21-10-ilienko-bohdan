// // src/App.tsx
// import React from "react";
// import { useTranslation } from "react-i18next";

// function App() {
//   const { t, i18n } = useTranslation();

//   const changeLanguage = (lng: string) => {
//     i18n.changeLanguage(lng);
//   };

//   return (
//     <div className="App">
//       <h1 className="text-3xl font-bold underline">{t("welcome")}</h1>
//       <p>{t("hello_world")}</p>
//       <button onClick={() => changeLanguage("en")}>English</button>
//       <button onClick={() => changeLanguage("uk")}>Українська</button>
//     </div>
//   );
// }

// export default App;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserData } from "./state/userSlice";
import { Router } from "./routing";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
    // if (!userData) navigate("/login");
  }, [dispatch]);

  return <Router />;
}

export default App;
