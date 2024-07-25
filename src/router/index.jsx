import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
// layouts
import SiteLayout from "../layouts/SiteLayout";
// guards
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";
// components
import ProgressBar from "../components/ProgressBar";

const Loadable = (Component) => {
    const LoadableComponent = (props) => {
        return (
            <Suspense fallback={<ProgressBar />}>
                <Component {...props} />
            </Suspense>
        );
    };

    LoadableComponent.displayName = `Loadable(${Component.displayName || Component.name || 'Component'})`;

    return LoadableComponent;
};

export default function Router() {
    return useRoutes([
        {
            path: "/",
            element: (
                <AuthGuard>
                    <Stickies />
                </AuthGuard>
            ),
        },
        {
            path: "auth",
            children: [
                {
                    path: "login",
                    element: (
                        <GuestGuard>
                            <Login />
                        </GuestGuard>
                    ),
                },
                {
                    path: "register",
                    element: (
                        <GuestGuard>
                            <Register />
                        </GuestGuard>
                    ),
                },
                {
                    path: "forgot-password",
                    element: (
                        <GuestGuard>
                            <ForgotPassword />
                        </GuestGuard>
                    ),
                },
                {
                    path: "password-recovery",
                    element: (
                        <GuestGuard>
                            <RecoverPassword />
                        </GuestGuard>
                    ),
                }
            ],
        },
        {
            path: "*",
            element: <SiteLayout />,
            children: [
                { path: "*", element: <Navigate to="/" replace /> },
            ],
        },
        { path: "*", element: <Navigate to="/" replace /> },
    ]);
}

// AUTH PAGES
const Login = Loadable(lazy(() => import("../pages/auth/Login")));
const Register = Loadable(lazy(() => import("../pages/auth/Register")));
const ForgotPassword = Loadable(lazy(() => import("../pages/auth/ForgotPassword")));
const RecoverPassword = Loadable(lazy(() => import("../pages/auth/RecoverPassword")));

// APP PAGE
const Stickies = Loadable(lazy(() => import("../pages/Stickies")));