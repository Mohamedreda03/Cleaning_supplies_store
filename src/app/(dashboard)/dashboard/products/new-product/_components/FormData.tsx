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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ProductFormTypes, ProductSchema } from "@/types/schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@prisma/client";
import { cn } from "@/lib/utils";
import ImageUpload from "@/components/ImageUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const FormData = ({ categories }: { categories: Category[] }) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const form = useForm<ProductFormTypes>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      images: [],
      best_seller: false,
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: any) => {
      await axios.post("/api/products", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      toast.success("تم انشاء المنتج بنجاح");
      router.push("/dashboard/products");
    },
    onError: () => {
      toast.error("جميع الحقول مطلوبة");
    },
  });

  const onSubmit = async (formData: ProductFormTypes) => {
    mutate(formData);
  };

  const handleCloase = () => {
    router.push("/dashboard/products");
  };

  return (
    <>
      <div className="flex gap-6 flex-col md:flex-row">
        <div className="max-w-[900px] w-full px-5 py-10 md:px-20">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-10 w-full"
            >
              <div className="flex flex-col gap-5 w-full">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>صور المنتج</FormLabel>
                      <FormControl>
                        <ImageUpload
                          label={"صور المنتج"}
                          value={field.value}
                          disabled={isLoading}
                          onChange={(url) => field.onChange(url)}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>اسم المنتج</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الوصف</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isLoading}
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>السعر</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="points"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>عدد النقاط</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>التصنيف</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="أختر التصنيف" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="submit"
                  variant="custom"
                  className="w-full sm:w-[150px]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LoaderCircle className="h-6 w-6 animate-spin" />
                  ) : (
                    "اضافة المنتج"
                  )}
                </Button>

                <Button
                  onClick={handleCloase}
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                >
                  الغاء
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default FormData;
