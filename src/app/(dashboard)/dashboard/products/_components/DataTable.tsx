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
import { Product } from "@prisma/client";
import axios from "axios";
import { LoaderCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

interface Iprodcut extends Product {
  category: {
    name: string;
  };
}

export default function DataTable({
  data,
  isLoading: isDataLoading,
}: {
  data: Iprodcut[];
  isLoading: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/products/${selectedProduct}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      toast.success("تم حذف المنتج بنجاح");
      setIsOpen(false);
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
        title={"حذف المنتج"}
        description={"هل انت متاكد من حذف المنتج"}
      />
      <div className="px-5 pb-5">
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-lg">الصورة</TableHead>
              <TableHead className="text-center text-lg">الاسم</TableHead>
              <TableHead className="text-center text-lg">السعر</TableHead>
              <TableHead className="text-center text-lg">الفئة</TableHead>
              <TableHead className="text-center text-lg">النقاط</TableHead>

              <TableHead className="text-center text-lg"></TableHead>
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
                <TableCell>
                  <Image
                    src={item.images[0]}
                    width={50}
                    height={50}
                    alt="product image"
                    className="mx-auto w-[60px] h-[40px] object-cover"
                  />
                </TableCell>
                <TableCell className="text-center">{item.name}</TableCell>
                <TableCell className="text-center">{item.price}</TableCell>
                <TableCell className="text-center">
                  {item.category.name}
                </TableCell>
                <TableCell className="text-center">{item.points}</TableCell>

                <TableCell className="text-center flex gap-3 items-center justify-center">
                  <Link href={`/dashboard/products/${item.id}`}>
                    <Button className="text-sm" variant="secondary">
                      تعديل
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      setSelectedProduct(item.id);
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
