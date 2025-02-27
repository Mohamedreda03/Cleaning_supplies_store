import DashboardNavbar from "@/components/dashboard-navbar";
import Sidebar from "@/components/sidebar";
import React from "react";
import "./dash.css";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <DashboardNavbar />
      <main className="md:pr-56">{children}</main>
    </>
  );
}
