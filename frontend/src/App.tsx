import { useEffect, useState } from "react";
import "./app.css";

interface ShortenResponse {
  shortUrl: string;
  originalUrl: string;
}
function App() {
  const [shortURL, setShortURL] = useState("");
  const [originalURL, getOriginalURL] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleURLInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    getOriginalURL(e.target.value);
  };

  const shortenUrl = async (originalUrl: string): Promise<void> => {
    const res = await fetch("http://localhost:3000/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl }),
    });

    if (!res.ok) {
      throw new Error("Failed to shorten URL");
    }
    const shortURL = await res.json();
    setShortURL(shortURL.shortUrl);
  };

  return (
    <div className="flex gap-20 flex-col justify-between h-full items-center bg-stone-900 text-white p-4">
      <span className="p-2 ml-auto text-gray-200">
        <a href="https://github.com/schonee/little-url">Github</a>
      </span>
      <div className="flex flex-col gap-4 w-2xl items-center">
        <h1 className="text-6xl font-bold font-amatica tracking-wide bg-gradient-to-r from-pink-500  to-indigo-400 text-transparent bg-clip-text">
          Little URL
        </h1>
        <div className="flex flex-col gap-4 w-2xl items-center">
          <input
            onChange={handleURLInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 "
            id="url"
            type="text"
            placeholder="Insert big URL"
          />

          <button
            className="bg-pink-500 p-2 rounded-md max-w-64 align-middle shadow-pink-500/50 shadow-md cursor-pointer"
            onClick={() => {
              shortenUrl(originalURL);
            }}
          >
            Make it Little
          </button>
          {shortURL && (
            <>
              <p>Your little url:</p>
              <div className="visibi shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 ">
                {shortURL && shortURL}
              </div>
            </>
          )}
        </div>
      </div>
      <footer className="text-gray-500">Made by Thalia Schöne </footer>
    </div>
  );
}

export default App;
