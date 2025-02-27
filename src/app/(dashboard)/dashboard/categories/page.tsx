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
  const pageSize = 10;
  const [pageNumber, setPageNumber] = useState(1);

  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [searchButon, setSearchButon] = useState<string>("");
  const handleSearchButon = () => {
    setSearchButon(Math.random().toString());
  };

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories", pageNumber, pageSize, searchButon],
    queryFn: async () => {
      return await axios.get(
        "/api/categories?page=" +
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
        <h1 className="md:text-3xl text-2xl font-medium border-b-2 border-color-1">
          الفئات
        </h1>
        <div>
          <Link href="/dashboard/categories/new-category">
            <Button
              variant="custom"
              className="md:text-lg flex items-center justify-center gap-2"
            >
              انشاء فئة
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
      <DataTable data={categories?.data?.data} isLoading={isLoading} />
      {categories && categories?.data?.count > 1 && (
        <PaginationButtons
          currentPage={Number(pageNumber)}
          searchTotalPages={categories?.data?.count}
          setCurrentPage={setPageNumber}
        />
      )}
    </div>
  );
}
