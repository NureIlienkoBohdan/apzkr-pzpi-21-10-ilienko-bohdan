import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const About: React.FC = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can add the logic to send the form data to the specified email
    console.log("Form submitted:", form);
  };

  return (
    <div className="text-center max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-5xl font-bold mb-4">{t("aboutUs")}</h2>
      <p className="mt-4 text-lg">{t("aboutDescription")}</p>
      <div className="flex flex-col md:flex-row mt-10 items-center">
        <img
          className="w-full md:w-1/2 h-auto"
          src="https://media.licdn.com/dms/image/C5612AQFpHzVZuc97eg/article-cover_image-shrink_600_2000/0/1527669755535?e=2147483647&v=beta&t=p5ShCmaljaq59YWbtW78nGE3JkkTDs-lwRlGB1i85Tw"
          alt="Teamwork"
        />
        <div className="md:ml-10 mt-4 md:mt-0">
          <h3 className="text-3xl font-semibold mb-2">{t("teamworkTitle")}</h3>
          <p className="text-lg">{t("teamworkContent")}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mt-10 items-center">
        <div className="md:mr-10 mt-4 md:mt-0">
          <h3 className="text-3xl font-semibold mb-2">
            {t("innovationTitle")}
          </h3>
          <p className="text-lg">{t("innovationContent")}</p>
        </div>
        <img
          className="w-full md:w-1/2 h-auto"
          src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
          alt="Innovation"
        />
      </div>
      <div className="flex flex-col md:flex-row mt-10 items-center">
        <img
          className="w-full md:w-1/2 h-auto"
          src="https://images.frandroid.com/wp-content/uploads/2016/12/flirtey-7-eleven-photo-2.jpg"
          alt="KhNURE Students"
        />
        <div className="md:ml-10 mt-4 md:mt-0">
          <h3 className="text-3xl font-semibold mb-2">{t("aboutTitle")}</h3>
          <p className="text-lg">{t("aboutContent")}</p>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-3xl font-semibold mb-2">{t("contactUs")}</h3>
        <form className="max-w-md mx-auto mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-left text-lg font-medium mb-2"
              htmlFor="name"
            >
              {t("name")}
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg"
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-left text-lg font-medium mb-2"
              htmlFor="email"
            >
              {t("email")}
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg"
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-left text-lg font-medium mb-2"
              htmlFor="message"
            >
              {t("message")}
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg"
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            type="submit"
          >
            {t("sendMessage")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default About;
