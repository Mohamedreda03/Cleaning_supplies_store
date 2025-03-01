import { db } from "@/lib/db";
import FormData from "./_components/FormData";
import { Category } from "@prisma/client";

export default async function NewCategory() {
  const categories = await db.category.findMany();

  return (
    <div>
      <div className="px-5 py-10 flex items-center justify-between">
        <h1 className="text-3xl font-medium border-b-2 border-color-1">
          اضافة منتج
        </h1>
        <div></div>
      </div>
      <div>
        <FormData categories={categories as Category[]} />
      </div>
    </div>
  );
}
