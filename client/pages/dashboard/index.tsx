import React from "react";
import { useAppSelector } from "@/store/store";

const AuthViewer = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    return (
        <div className="flex gap border border-1 border-black p-20">
            You are now {isAuthenticated ? "Logged  In" : "Logged Out"}
        </div>
    );
};
export default AuthViewer;