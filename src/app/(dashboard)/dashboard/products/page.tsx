"use client";

import DataTable from "./_components/DataTable";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "@/components/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationButtons from "@/components/pagination-buttons";
import { Button } from "@/components/ui/button";
import { CirclePlus, Search } from "lucide-react";
import { Suspense, useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Users() {
  // const searchParams = useSearchParams();
  // const pageSize = searchParams.get("size") || 10;
  // const pageNumber = searchParams.get("page") || 1;

  const pageSize = 10;
  const [pageNumber, setPageNumber] = useState(1);

  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [searchButon, setSearchButon] = useState<string>("");

  const handleSearchButon = () => {
    setSearchButon(Math.random().toString());
  };

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", pageNumber, pageSize, searchButon],
    queryFn: async () => {
      return await axios.get(
        "/api/products?page=" +
          pageNumber +
          "&size=" +
          pageSize +
          "&search=" +
          search
      );
    },
  });

  return (
    <div>
      <div className="px-5 py-10 flex items-center justify-between">
        <h1 className="text-3xl font-medium border-b-2 border-color-1">
          المنتجات
        </h1>
        <div>
          <Link href="/dashboard/products/new-product">
            <Button
              variant="custom"
              className="text-lg flex items-center justify-center gap-2"
            >
              اضافة منتج
              <CirclePlus size={20} />
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4 pb-3 px-5 max-w-[500px] w-full">
        <Input
          type="text"
          className="w-full"
          placeholder={"ابحث باسم المنتج"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          onClick={handleSearchButon}
          variant="custom"
          className="max-w-[70px] w-full"
        >
          <Search size={20} />
        </Button>
      </div>
      <DataTable data={products?.data?.data} isLoading={isLoading} />
      {products?.data?.count > 1 && (
        <PaginationButtons
          currentPage={Number(pageNumber)}
          searchTotalPages={products?.data?.count}
          setCurrentPage={setPageNumber}
        />
      )}
    </div>
  );
}
