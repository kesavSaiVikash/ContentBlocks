import React from "react";
import { Loading } from "../components"; // Importing the Loading component

// A button component used in forms, with loading state handling
const FormButton = ({ text, loading }) => (
  <button
    type="submit"
    disabled={loading} // Disable the button when loading
    className="w-full py-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
  >
    {loading ? <Loading /> : text}{" "}
    {/* Show loading component if loading, otherwise show button text */}
  </button>
);

export default FormButton;
