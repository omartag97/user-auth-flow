import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RegistrationForm from "./components/RegistrationForm";
import TestAuthPage from "./components/TestAuthPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/test-auth" element={<TestAuthPage />} />
        <Route path="/" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
};

export default App;
