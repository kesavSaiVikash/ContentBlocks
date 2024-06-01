import React from "react"; // Importing React for creating components
import { Loading } from "../components"; // Importing Loading component to display a loading spinner

// This is a button component used in forms, with dynamic text and loading state handling

const FormButton = ({ text, loading }) => (
  <button type="submit" disabled={loading} className="form-button">
    {/* Show loading spinner if loading is true, otherwise show the text */}
    {loading ? <Loading /> : text}
  </button>
);

export default FormButton;
