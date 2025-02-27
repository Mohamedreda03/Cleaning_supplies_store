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
import { Order } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export default function DataTable({
  orders,
  isLoading: isOrdersLoading,
}: {
  orders: Order[];
  isLoading: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/orders/${selectedUser}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
      toast.success("تم حذف الطلب بنجاح");
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
        title={"حذف الطلب"}
        description={"هل انت متاكد من حذف الطلب"}
      />
      <div className="px-5 py-10">
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-lg">
                اسم المستخدم
              </TableHead>

              <TableHead className="text-center text-lg">رقم الهاتف</TableHead>

              <TableHead className="text-center text-lg">
                اجمالي المبلغ
              </TableHead>

              <TableHead className="text-center text-lg">حالة الطلب</TableHead>
              <TableHead className="text-center text-lg">تاريخ الطلب</TableHead>

              <TableHead className="text-center text-lg"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isOrdersLoading && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-lg text-muted-foreground h-20"
                >
                  <LoaderCircle className="animate-spin mx-auto" size={32} />
                </TableCell>
              </TableRow>
            )}
            {orders?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-lg text-muted-foreground"
                >
                  لا يوجد طلبات
                </TableCell>
              </TableRow>
            )}
            {orders?.map((order) => {
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-center">
                    {order.user_name}
                  </TableCell>

                  <TableCell className="text-center">{order.phone}</TableCell>

                  <TableCell className="text-center">
                    {order.total} <span className="mr-1">جنية</span>
                  </TableCell>

                  <TableCell className="text-center">
                    {order.status === "PENDING" && "قيد الانتظار"}
                    {order.status === "PROCESSING" && "جاري التجهيز"}
                    {order.status === "SHIPPED" && "تم الشحن"}
                    {order.status === "DELIVERED" && "تم التوصيل"}
                  </TableCell>
                  <TableCell className="text-center">
                    {format(
                      new Date(order.createdAt),
                      "hh:mm a, dd MMMM yyyy",
                      {
                        locale: ar,
                      }
                    )}
                  </TableCell>

                  <TableCell className="text-center flex gap-3 items-center justify-center">
                    <Link href={`/dashboard/orders/${order.id}`}>
                      <Button className="text-sm" variant="secondary">
                        التفاصيل
                      </Button>
                    </Link>

                    <Button
                      onClick={() => {
                        setSelectedUser(order.id);
                        setIsOpen(true);
                      }}
                      className="text-sm"
                      variant="destructive"
                    >
                      حذف
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
