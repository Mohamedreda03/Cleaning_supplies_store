import Products from "@/components/Products";

export const metadata = {
  title: "المنتجات",
};

export const dynamic = "force-dynamic";

export default function Menu() {
  return (
    <div className="max-w-screen-xl mx-auto p-7">
      <div className="flex items-center justify-center">
        <h1 className="text-5xl border-b-2 border-color-1">المنتجات</h1>
      </div>

      <Products />
    </div>
  );
}
