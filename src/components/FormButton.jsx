import React from "react";
import { Loading } from "../components";

// This is a button component used in forms, with dynamic text and loading state handling

const FormButton = ({ text, loading }) => (
  <button type="submit" disabled={loading} className="form-button">
    {/* Show loading spinner if loading is true, otherwise show the text */}
    {loading ? <Loading /> : text}
  </button>
);

export default FormButton;
