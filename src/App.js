import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Events from "./pages/Events";
import LogIn from "./pages/LogIn";
import HomePage from "./pages/HomePage";
import EventsRoot from "./pages/EventsRoot";
import ErrorPage from "./pages/ErrorPage";
import EventForm from "./components/EventForm";
import EventDetail from "./pages/EventDetail";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import SignUp from "./pages/SignUp";
import { UserAuthContextProvider } from "./store/auth-context";

const yes = window.localStorage.getItem("isLoggedIn");
console.log(yes);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element:
          yes === true ? (
            <HomePage />
          ) : (
            <ProtectedRoutes Component={HomePage} />
          ),
      },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          { index: true, element: <ProtectedRoutes Component={Events} /> },
          {
            path: "create",
            element: <ProtectedRoutes Component={EventForm} />,
          },
          {
            path: ":eventId",
            children: [
              {
                index: true,
                element: <EventDetail />,
              },
              { path: "edit/:eventId", element: <EventForm /> },
            ],
          },
        ],
      },
      {
        path: "login",
        children: [
          { index: true, element: <LogIn /> },
          { path: "signup", element: <SignUp /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <UserAuthContextProvider>
      <RouterProvider router={router} />
    </UserAuthContextProvider>
  );
}

export default App;
