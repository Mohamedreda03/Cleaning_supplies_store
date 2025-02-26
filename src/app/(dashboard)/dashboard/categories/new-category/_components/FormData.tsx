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
import { Input } from "@/components/ui/input";
import { CategoryFormTypes, CategorySchema } from "@/types/schema";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const FormData = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<CategoryFormTypes>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: CategoryFormTypes) => {
      await axios.post("/api/categories", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      toast.success("تم انشاء التصنيف بنجاح");
      router.push("/dashboard/categories");
    },
    onError: () => {
      toast.error("جميع الحقول مطلوبة");
    },
  });

  const onSubmit = async (formData: any) => {
    mutate(formData);
  };

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
                    <FormLabel>الاسم</FormLabel>
                    <FormControl>
                      <Input
                        className="focus:"
                        disabled={isLoading}
                        {...field}
                      />
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
              className="w-full sm:w-[150px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <LoaderCircle className="h-6 w-6 animate-spin" />
              ) : (
                "أنشاء فئة"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FormData;
