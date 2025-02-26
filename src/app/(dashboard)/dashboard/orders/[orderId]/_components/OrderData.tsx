"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";

import { Order, OrderItem, Product } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import Image from "next/image";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

interface IOrder extends Order {
  orderItems: IOrderItem[];
}

interface IOrderItem extends OrderItem {
  item: Product;
}

export function OrderData({ order }: { order: IOrder }) {
  const queryClient = useQueryClient();
  const [orderStatus, setOrderStatus] = useState(order.status);

  const { mutate } = useMutation({
    mutationFn: async (
      status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED"
    ) => {
      await axios.patch(`/api/orders/${order.id}`, {
        status,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
    },
  });

  const handleUpdateOrder = async (
    status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED"
  ) => {
    mutate(status);
    setOrderStatus(status);
  };

  return (
    <div className="pb-16">
      <div className="mb-5">
        <div className="flex items-center gap-6">
          <p>تعيل حالة الطلب</p>
          <div></div>
          <select
            className="border rounded-lg px-4"
            value={orderStatus}
            onChange={(e) => handleUpdateOrder(e.target.value as any)}
          >
            <option value="PENDING">قيد الانتظار</option>
            <option value="PROCESSING">قيد التحضير</option>
            <option value="SHIPPED">في الطريق</option>
            <option value="DELIVERED">تم التوصيل</option>
          </select>
        </div>
      </div>

      <Table className="max-w-screen-xl border">
        <TableBody>
          <TableRow>
            <TableCell className="font-medium w-[200px]">
              اسم المستخدم
            </TableCell>
            <TableCell colSpan={4} className="font-medium">
              {order.user_name}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium w-[200px]">حالة الطلب</TableCell>
            <TableCell colSpan={4} className="font-medium">
              {orderStatus === "PENDING" && "قيد الانتظار"}
              {orderStatus === "PROCESSING" && "قيد التحضير"}
              {orderStatus === "SHIPPED" && "في الطريق"}
              {orderStatus === "DELIVERED" && "تم التوصيل"}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium w-[200px]">
              العنوان الكامل
            </TableCell>
            <TableCell colSpan={4} className="font-medium">
              {order.address}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium w-[200px]">رقم الهاتف</TableCell>
            <TableCell colSpan={4} className="font-medium">
              {order.phone}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium w-[200px]">تاريخ الطلب</TableCell>
            <TableCell colSpan={4} className="font-medium">
              {format(new Date(order.createdAt), "hh:mm a, dd MMMM yyyy", {
                locale: ar,
              })}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium w-[200px]">
              تاريخ استلام الطلب
            </TableCell>
            <TableCell colSpan={4} className="font-medium">
              {order.order_receipt_date
                ? format(
                    new Date(order.order_receipt_date),
                    "hh:mm a, dd MMMM yyyy",
                    {
                      locale: ar,
                    }
                  )
                : "لم يتم تسليم الطلب بعد"}
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>السعر</TableCell>
            <TableCell colSpan={4}>
              {order.total} <span className="mr-1">جنية</span>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="mt-10 max-w-screen-xl">
        <h3 className="text-2xl mx-auto w-fit border-b-2 border-color-1 mb-3">
          الطلب
        </h3>
        <Table className="max-w-screen-xl border">
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-center">
                صورة المنتج
              </TableCell>
              <TableCell className="font-medium text-center">
                اسم المنتج
              </TableCell>

              <TableCell className="font-medium text-center">الكمية</TableCell>

              <TableCell className="font-medium text-center">
                سعر المنتج
              </TableCell>
            </TableRow>
            {order.orderItems?.map((orderItem) => (
              <TableRow key={orderItem.id}>
                <TableCell className="text-center">
                  <Image
                    src={orderItem.item.image}
                    alt="orderItem image"
                    width={60}
                    height={40}
                    className="mx-auto object-cover"
                  />
                </TableCell>
                <TableCell className="text-center">
                  {orderItem.item.name}
                </TableCell>
                <TableCell className="text-center">
                  {orderItem.quantity}
                </TableCell>

                <TableCell className="text-center">
                  {orderItem.total} <span className="mr-1">جنية</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
