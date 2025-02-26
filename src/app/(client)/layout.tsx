import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";

import Image from "next/image";
import Link from "next/link";

export default function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>

      <Footer />
    </div>
  );
}
