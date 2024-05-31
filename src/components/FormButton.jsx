import React from "react";
import { Loading } from "../components";

// This is a button component used in our forms, with loading state handling.

const FormButton = ({ text, loading }) => (
  <button type="submit" disabled={loading} className="form-button">
    {loading ? <Loading /> : text}
  </button>
);

export default FormButton;
