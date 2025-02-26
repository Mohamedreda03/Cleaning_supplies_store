import Image from "next/image";

export default function Hero() {
  return (
    <div
      className="relative flex flex-col h-[600px] justify-center items-center w-full text-white"
      style={{
        backgroundImage: "url('/banar.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-color-1/30 to-color-1/40"></div>
      <div
        style={{ position: "relative", zIndex: 1 }}
        className="flex flex-col items-center justify-center"
      >
        <h1 className="text-5xl text-center mb-6 font-bold">
          احصل علي افضل المنتجات
        </h1>
        <h2 className="text-2xl max-w-[700px] text-center">
          تسوق منتجات عالية الجودة بأفضل الأسعار
        </h2>
      </div>
    </div>
  );
}
