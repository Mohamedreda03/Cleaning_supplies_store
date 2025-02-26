import { auth } from "@/auth";
import DashboardNavbar from "@/components/dashboard-navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return (
    <>
      <Sidebar />
      <DashboardNavbar />
      <main className="md:pr-56">{children}</main>
    </>
  );
}
