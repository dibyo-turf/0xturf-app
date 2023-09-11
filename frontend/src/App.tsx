import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin";
import Dashboard from "./pages/dashboard";
import Register from "./pages/register";
import AuthGaurd from "./pages/AuthGaurd";
import Leaderboard from "./pages/leaderboard";
import Portfolio from "./pages/portfolio";
import LoadingScreen from "./components/loaders/LoadingScreen";
import Profile from "./components/sections/profile";
import Providers from "./components/Providers";

export default function App() {
    const [activeState, setActiveState] = React.useState<number>(1);
    return (
        <Providers>
            <AuthGaurd>
                <Routes>
                    <Route element={<Dashboard />} path="/" />
                    <Route element={<SignIn />} path="/signin" />
                    {/* This is to specify that for every page request it should rerender */}
                    <Route
                        element={<Register />}
                        path="/register"
                        key={document.location.href}
                    />
                    <Route element={<Leaderboard />} path="/leaderboard" />
                    <Route
                        element={<Portfolio setActiveState={setActiveState} />}
                        path="/portfolio"
                    />
                    {/* <Route element={<Portfolio />} path="/gamer/:turf_id" /> */}
                    <Route element={<LoadingScreen />} path="/loading" />
                    {/* <Route element={<Leaderboard />} path="/communities" /> */}
                    <Route
                        element={
                            <Profile
                                activeState={activeState}
                                setActiveState={setActiveState}
                            />
                        }
                        path="/profile"
                    />
                </Routes>
            </AuthGaurd>
        </Providers>
    );
}
