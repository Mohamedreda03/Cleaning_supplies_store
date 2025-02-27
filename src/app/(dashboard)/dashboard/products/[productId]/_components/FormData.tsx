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
import { ProductFormTypes } from "@/types/schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Category, Product } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUpload from "@/components/ImageUpload";
import { cn } from "@/lib/utils";
import DeleteModel from "@/components/models/DeleteModel";
import Loading from "@/components/Loading";
import { LoaderCircle } from "lucide-react";

const FormData = ({
  data,
  categories,
}: {
  data: Product;
  categories: Category[];
}) => {
  const { productId } = useParams();

  const queryClient = useQueryClient();

  const form = useForm<ProductFormTypes>({
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      categoryId: data?.categoryId || "",
      best_seller: data?.best_seller || false,
      images: data?.images,
      price: data?.price,
      points: data?.points,
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: any) => {
      await axios.patch(`/api/products/${productId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      toast.success("تم تحديث المنتج بنجاح");
    },
  });

  const onSubmit = (formData: ProductFormTypes) => {
    mutate(formData);
  };

  return (
    <>
      <div className="flex gap-6 flex-col md:flex-row">
        <div className="max-w-[900px] w-full px-5 py-10">
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
                          value={field.value}
                          disabled={isLoading}
                          onChange={(urls) => field.onChange(urls)}
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
                        <Input
                          className="h-11 text-lg"
                          disabled={isLoading}
                          {...field}
                        />
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
                          className="text-lg resize-y"
                          disabled={isLoading}
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
                        <Input
                          className="h-11 text-lg"
                          disabled={isLoading}
                          {...field}
                        />
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
                        <Input
                          className="h-11 text-lg"
                          disabled={isLoading}
                          {...field}
                        />
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
                        dir="rtl"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="h-11 text-lg">
                          <SelectTrigger>
                            <SelectValue placeholder="اختر التصنيف" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((item: Category) => (
                            <SelectItem
                              className="h-10 text-base"
                              key={item.id}
                              value={item.id}
                            >
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="border border-gray-200 p-3 rounded-md">
                  <FormField
                    control={form.control}
                    name="best_seller"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox
                              disabled={isLoading}
                              checked={field.value as any}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-md">
                            من المنتجات الاكثر مبيعا.
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="custom"
                  disabled={isLoading}
                  type="submit"
                  className="w-full sm:w-[150px]"
                >
                  {isLoading ? (
                    <LoaderCircle className="h-6 w-6 animate-spin" />
                  ) : (
                    "حفظ التعديل"
                  )}
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
