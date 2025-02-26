"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Header from "@/components/auth/Header";

import { Separator } from "@/components/ui/separator";
import { SignUpFormTypes, SignUpSchema } from "@/types/schema";
import { useState, useTransition } from "react";
import signup from "@/actions/signup";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export default function AddUserForm({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();

  const form = useForm<SignUpFormTypes>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SignUpFormTypes) => {
      const res = await axios.post("/api/users", data);
      if (res.data.success === false) {
        toast.error(res.data.error);
      } else {
        toast.success("تم اضافة المستخدم بنجاح");
        queryClient.invalidateQueries("users");
        form.reset();
        onClose();
      }
    },
  });

  const onSubmit = async (data: SignUpFormTypes) => {
    await mutateAsync(data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>أسم المستخدم</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الايمال</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>كلمة المرور</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            variant="custom"
            disabled={isLoading}
            type="submit"
            className="w-full"
          >
            {isLoading ? (
              <LoaderCircle className="h-6 w-6 animate-spin" />
            ) : (
              <span>اضافة المستخدم</span>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
