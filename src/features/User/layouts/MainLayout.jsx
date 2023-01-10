import Navbar from "features/User/components/Navbar/Navbar";
import React from "react";

export default function MainLayout({ children }) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">{children}</main>
        </>
    )
}