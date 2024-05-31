import React from "react";
import { Loading } from "../components"; 

// A button component used in forms, with loading state handling
const FormButton = ({ text, loading }) => (
  <button
    type="submit"
    disabled={loading} // Disable the button when loading
    className="form-button"
  >
    {loading ? <Loading /> : text}
    {/* Show loading component if loading, otherwise show button text */}
  </button>
);

export default FormButton;
