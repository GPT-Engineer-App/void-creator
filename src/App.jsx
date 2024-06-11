import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import OnboardingPackageUpsell from "./pages/OnboardingPackageUpsell.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/onboarding-upsell" element={<OnboardingPackageUpsell />} />
      </Routes>
    </Router>
  );
}

export default App;