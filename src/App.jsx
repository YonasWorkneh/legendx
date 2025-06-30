import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Analytics from "./pages/Analytics";
import AppLayout from "./ui/AppLayout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Offers from "./pages/Offers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContextProvider, useAppContext } from "./contexts/AppContext";
import Members from "./pages/Members";
import Profile from "./features/customers/Profile/Profile";
import Settings from "./pages/Settings";
import Gym from "./features/Settings/gym/Gym";
import ProfileSettings from "./features/Settings/profile/Profile";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import SignIn from "./pages/Signin";
import ProtectedRoute from "./features/Authentication/ProtectedRoute/ProtectedRoute";
import PageNotFound from "./ui/PageNotFound/PageNotFound";
import Equipments from "./pages/Equipments";
import { useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  return (
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<SignIn />} />
            {/* <Route path="/signup" element={<Signup />} /> */}

            {/* Protected Routes Wrapper */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/:gymId"
                element={<AppLayout onSetTheme={setTheme} />}
              >
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="memberships" element={<Offers />} />

                {/* Customers */}
                <Route path="customers" element={<Members />}>
                  <Route path=":customerId" element={<Profile />} />
                </Route>
                <Route path="trainers" />

                {/* Settings */}
                <Route path="settings" element={<Settings />}>
                  <Route index element={<Navigate replace to="gym" />} />
                  <Route path="gym" element={<Gym />} />
                  <Route path="profile" element={<ProfileSettings />} />
                </Route>
                {/* equipments */}
                <Route path="equipments" element={<Equipments />} />
                {/* Analytics */}
                <Route path="analytics" element={<Analytics />} />
                <Route path="signup" element={<Signup />} />
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 4000 },
            error: { duration: 5000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "8px 24px",
              background: theme === "dark" ? "#111" : "#fff",
              border: theme === "dark" ? "1px solid #222" : "none",
              color: theme === "dark" ? "#d9d9d9" : "var(--color-grey-700)",
            },
          }}
        />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </AppContextProvider>
  );
}

export default App;
