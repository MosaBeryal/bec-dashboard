import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import EmployeeMonitoring from "./pages/EmployeeMonitoring";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";

export default function App() {
  const currentUser = localStorage.getItem("token");

  const isLoggedIn = !!currentUser;

  console.log(isLoggedIn);

  const MainLayout = () => {
    return (
      <div className="flex max-h-screen bg-[#bcc0e2]">
        <Sidebar />
        <div className="flex-1 flex flex-col mt-5 mx-4">
          <Navbar />
          <main className="flex-1 p-6 bg-gray-100 max-h-screen overflow-x-scroll">
            <Outlet />
          </main>
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <EmployeeMonitoring />,
        },
        // {
        //   path: "/employee-list",
        //   element: <EmployeeList />, // Uncomment if needed
        // },
        // Add other routes here
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
