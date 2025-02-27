"use client";

import DeleteModel from "@/components/models/DeleteModel";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "@prisma/client";
import axios from "axios";
import { LoaderCircle, Trash2 } from "lucide-react";
import Link from "next/link";

import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

interface TableProps extends Category {
  _count: {
    products: number;
  };
}

export default function DataTable({
  data,
  isLoading: isDataLoading,
}: {
  data: TableProps[];
  isLoading: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/categories/${selectedCategory}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      toast.success("تم حذف التصنيف بنجاح");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("لا يمكن حذف هذا التصنيف");
    },
  });

  const handleDelete = () => {
    mutate();
  };

  return (
    <>
      <DeleteModel
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onDelete={handleDelete}
        title={"حذف التصنيف"}
        description={"هل انت متاكد من حذف التصنيف"}
      />
      <div className="px-5 pb-10">
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">أسم التصنيف</TableHead>
              <TableHead className="text-center">عدد المنتجات</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isDataLoading && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-lg text-muted-foreground h-20"
                >
                  <LoaderCircle className="animate-spin mx-auto" size={32} />
                </TableCell>
              </TableRow>
            )}
            {data?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-lg text-muted-foreground"
                >
                  لا يوجد طلبات
                </TableCell>
              </TableRow>
            )}
            {data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-center">
                  {item.name}
                </TableCell>
                <TableCell className="font-medium text-center">
                  {item?._count?.products}
                </TableCell>

                <TableCell className="text-center flex gap-3 items-center justify-center">
                  <Link href={`/dashboard/categories/${item.id}`}>
                    <Button className="text-sm" variant="secondary">
                      تعديل
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      setSelectedCategory(item.id);
                      setIsOpen(true);
                    }}
                    className="text-sm"
                    variant="destructive"
                  >
                    <Trash2 size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
