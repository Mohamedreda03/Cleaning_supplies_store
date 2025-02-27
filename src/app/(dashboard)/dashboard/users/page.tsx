"use client";

import DataTable from "./_components/DataTable";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationButtons from "@/components/pagination-buttons";
import { Suspense, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CirclePlus, Search } from "lucide-react";
import CustomModel from "@/components/models/CustomModel";
import AddUserForm from "./_components/AddUserForm";
import Loading from "@/components/Loading";

export default function Users() {
  const pageSize = 10;
  const [pageNumber, setPageNumber] = useState(1);

  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchButon, setSearchButon] = useState<string>("");

  const onClose = () => {
    setIsOpen(false);
  };

  const { data: users, isLoading } = useQuery({
    queryKey: ["users", pageNumber, pageSize, searchButon],
    queryFn: async () => {
      return await axios.get(
        "/api/users?page=" +
          pageNumber +
          "&size=" +
          pageSize +
          "&search=" +
          search
      );
    },
  });

  const handleSearchButon = () => {
    setSearchButon(Math.random().toString());
  };

  return (
    <>
      <CustomModel isOpen={isOpen} onClose={onClose} title="أضافة مستخدم">
        <AddUserForm onClose={onClose} />
      </CustomModel>
      <div>
        <div className="px-5 py-10 flex items-center justify-between">
          <h1 className="text-3xl font-medium border-b-2 border-color-1">
            المستخدمين
          </h1>
          <div>
            <Button onClick={() => setIsOpen(true)} variant="custom">
              أضافة مستخدم
              <CirclePlus className="mr-2" size={20} />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4 pb-3 px-5 max-w-[500px] w-full">
          <Input
            type="text"
            className="w-full"
            placeholder={"ابحث باسم المستخدم"}
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
        <DataTable users={users?.data?.data} isLoading={isLoading} />
        {users?.data?.count > 1 && (
          <PaginationButtons
            currentPage={Number(pageNumber)}
            searchTotalPages={users?.data?.count}
            setCurrentPage={setPageNumber}
          />
        )}
      </div>
    </>
  );
}
