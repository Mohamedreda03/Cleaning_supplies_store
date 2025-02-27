"use client";

import FormData from "./_components/FormData";
import Loading from "@/components/Loading";
import { MoveLeft, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CategoryDetails() {
  const params = useParams();
  const router = useRouter();
  const session = useSession();

  const { data: category } = useQuery({
    queryKey: ["categories", params.categoryId],
    queryFn: async () =>
      await axios.get(`/api/categories/${params.categoryId}`),
  });

  if (!category) {
    return <Loading />;
  }

  return (
    <div>
      <Link
        href="/dashboard/categories"
        className="px-5 py-5 flex items-center gap-3"
      >
        <Button
          variant="secondary"
          className=" flex items-center gap-3"
          size="sm"
        >
          <MoveRight size={18} />
          <span>العودة للخلف</span>
        </Button>
      </Link>
      <FormData data={category.data.data} />
    </div>
  );
}
