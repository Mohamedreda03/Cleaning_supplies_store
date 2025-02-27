"use client";

import DataTable from "./_components/DataTable";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "@/components/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationButtons from "@/components/pagination-buttons";
import { Suspense, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Orders() {
  const [searchByName, setSearchByName] = useState<string>("");
  const [searchByPhone, setSearchByPhone] = useState<string>("");
  const [searchByUserId, setSearchByUserId] = useState<string>("");
  const [searchButon, setSearchButon] = useState<string>("");
  const pageSize = 10;
  const [pageNumber, setPageNumber] = useState(1);

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", pageNumber, pageSize, searchButon],
    queryFn: async () => {
      return await axios.get(
        "/api/orders?page=" +
          pageNumber +
          "&size=" +
          pageSize +
          "&name=" +
          searchByName +
          "&phone=" +
          searchByPhone +
          "&userId=" +
          searchByUserId
      );
    },
  });

  const handleSearchButon = () => {
    setSearchButon(Math.random().toString());
  };

  return (
    <div>
      <div className="px-5 py-10 flex items-center justify-between">
        <h1 className="text-3xl font-medium border-b-2 border-color-1">
          الطلبات
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-3 px-5 max-w-[900px] w-full">
        <Input
          type="text"
          className="w-full"
          placeholder={"ابحث باسم العميل"}
          value={searchByName}
          onChange={(e) => setSearchByName(e.target.value)}
        />
        <Input
          type="text"
          className="w-full"
          placeholder={"ابحث برقم العميل"}
          value={searchByPhone}
          onChange={(e) => setSearchByPhone(e.target.value)}
        />
        <Input
          type="text"
          className="w-full"
          placeholder={"ابحث بكود الشريك"}
          value={searchByUserId}
          onChange={(e) => setSearchByUserId(e.target.value)}
        />

        <Button
          onClick={handleSearchButon}
          variant="custom"
          className="max-w-[70px] w-full"
        >
          <Search size={20} />
        </Button>
      </div>

      <DataTable orders={orders?.data?.data} isLoading={isLoading} />
      {orders?.data?.count > 1 && (
        <PaginationButtons
          currentPage={Number(pageNumber)}
          searchTotalPages={orders?.data?.count}
          setCurrentPage={setPageNumber}
        />
      )}
    </div>
  );
}
