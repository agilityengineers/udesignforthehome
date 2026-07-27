import { Route, Switch, Router as WouterRouter } from "wouter";
import HomePage from "@/pages/home";
import HardWindowTreatmentsPage from "@/pages/hard-window-treatments";
import SoftWindowTreatmentsPage from "@/pages/soft-window-treatments";
import MotorizationPage from "@/pages/motorization";
import PrivacyPage from "@/pages/privacy";
import TermsPage from "@/pages/terms";
import AdminPage from "@/pages/admin";
import AdminLoginPage from "@/pages/admin-login";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/hard-window-treatments" component={HardWindowTreatmentsPage} />
      <Route path="/soft-window-treatments" component={SoftWindowTreatmentsPage} />
      <Route path="/motorization" component={MotorizationPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/admin/login" component={AdminLoginPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}
