import { db } from "@/lib/db";
import FormData from "./_components/FormData";
import Loading from "@/components/Loading";
import { MoveLeft, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  const [product, categories] = await Promise.all([
    db.product.findFirst({
      where: {
        id: params.productId,
      },
    }),
    db.category.findMany(),
  ]);

  if (!product) {
    return <Loading />;
  }

  return (
    <div>
      <Link
        href="/dashboard/products"
        className="px-5 py-5 flex items-center gap-3"
      >
        <Button
          variant="secondary"
          className="flex items-center gap-3"
          size="sm"
        >
          <MoveRight size={18} />
          العوده للخلف
        </Button>
      </Link>
      <FormData data={product} categories={categories} />
    </div>
  );
}
