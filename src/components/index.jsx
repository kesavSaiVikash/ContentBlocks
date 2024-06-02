import "./index.css"; // Custom CSS classes wrapped around Tailwind CSS styles specifically for all components

// Exporting all COMPONENTS for easier import in other parts of the application

export { default as AuthLayout } from "./AuthLayout"; // Layout component for authentication pages
export { default as ErrorMessage } from "./ErrorMessage"; // Component to display error messages
export { default as ErrorPopup } from "./ErrorPopup"; // Component to display error popups with a close button
export { default as Loading } from "./Loading"; // Loading spinner component
export { default as Navbar } from "./Navbar"; // Navbar component for navigation
export { default as Modal } from "./Modal"; // Modal component for displaying modals
export { default as FormInput } from "./FormInput"; // Input field component with error handling for forms
export { default as FormButton } from "./FormButton"; // Button component for forms with loading state handling
export { default as ProtectedRoute } from "./ProtectedRoute"; // Higher order component to protect routes making only accessible when authenticated
