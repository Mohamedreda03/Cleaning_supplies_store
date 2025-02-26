"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserForm } from "@/types/schema";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { User } from "@prisma/client";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { LoaderCircle } from "lucide-react";

const FormData = ({ data }: { data: User }) => {
  const [isMounted, setIsMounted] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<UserForm>({
    defaultValues: {
      name: data?.name || "",
      email: data?.email || "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (newData: any) => {
      await axios.patch(`/api/users/${data.id}`, newData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast.success("تم تحديث المستخدم بنجاح");
    },
  });

  const onSubmit = (formData: any) => {
    mutate(formData);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex gap-6 flex-col md:flex-row">
      <div className="max-w-[900px] w-full px-5 py-10 md:px-20">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="flex flex-col gap-3 w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>اسم المستخدم</FormLabel>
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
                      <Input placeholder="e.g example@gmail.com" {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              variant="main"
              disabled={isLoading}
              type="submit"
              className="w-full sm:w-[150px]"
            >
              {isLoading ? (
                <LoaderCircle className="w-6 h-6 animate-spin" />
              ) : (
                "حفظ التعديلات"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FormData;
