import React from "react";
import Navbar from "../components/Navbar/Navbar";

export default function MainLayout({ children }) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">{children}</main>
        </>
    )
}