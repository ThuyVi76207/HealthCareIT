import Navbar from "features/User/components/Navbar/Navbar";
import React from "react";
import Footer from "../components/Footer/Footer";

export default function MainLayout({ children }) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </>
    )
}