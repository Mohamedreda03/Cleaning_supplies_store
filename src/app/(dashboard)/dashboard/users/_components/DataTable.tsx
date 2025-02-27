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
import { User } from "@prisma/client";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export default function DataTable({
  users,
  isLoading: isDataLoading,
}: {
  users: User[];
  isLoading: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/users/${selectedUser}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast.success("تم حذف المستخدم بنجاح");
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
        title={"حذف المستخدم"}
        description={"هل انت متأكد من حذف المستخدم؟"}
      />
      <div className="px-5 pb-5">
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-lg">
                اسم المستخدم
              </TableHead>
              <TableHead className="text-center text-lg">الايمال</TableHead>

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

            {users?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-lg text-muted-foreground"
                >
                  لا يوجد طلبات
                </TableCell>
              </TableRow>
            )}

            {users?.map((user) => (
              <TableRow key={user.name}>
                <TableCell className="font-medium text-center">
                  {user.name}
                </TableCell>
                <TableCell className="text-center">{user.email}</TableCell>
                <TableCell className="text-center flex gap-3 items-center justify-center">
                  <Link href={`/dashboard/users/${user.id}`}></Link>
                  <Button
                    onClick={() => {
                      setSelectedUser(user.id);
                      setIsOpen(true);
                    }}
                    className="text-sm"
                    variant="destructive"
                  >
                    حذف
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
