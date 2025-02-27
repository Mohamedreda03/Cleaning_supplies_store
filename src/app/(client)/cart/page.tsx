"use client";

import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import useCart from "@/store/cartStore";
import axios from "axios";
import { BadgeDollarSign, CheckCircle, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  user_name: z.string().min(1, "الاسم مطلوب"),
  user_id: z.string().min(1, "كود الشريك مطلوب"),
  gift_code: z.string().min(1, "كود الجيفت مطلوب"),
  address: z.string().min(3, "العنوان مطلوب"),
  phone: z.string().min(11, "يجب ان يكون الهاتف 11 رقم"),
});

export default function CartPage() {
  const router = useRouter();
  const cart = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const total = cart.items.reduce((acc, item) => acc + item.total, 0);
  const totalPoints = cart.items.reduce(
    (acc, item) => acc + item.points * item.quantity,
    0
  );

  const handleCheckout = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    try {
      await axios.post("/api/orders", {
        ...data,
        total,
        gift_code: data.gift_code,
        orderItems: cart.items.map((item) => ({
          quantity: item.quantity,
          total: item.total,
          productId: item.productId,
        })),
      });

      toast.success("تم ارسال الطلب بنجاح");
      router.push("/cart/success");
      cart.clearCart();
    } catch (error) {
      console.log("ORDER CREATE ERROR:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-8 px-5 md:px-7 max-w-screen-xl mx-auto flex flex-col gap-6 min-h-[600px]">
      <div className="flex items-center justify-center">
        <h1 className="text-center text-5xl font-medium text-primary border-b-2 border-color-1 w-fit">
          سلة المشتريات
        </h1>
      </div>

      {/* if is cart empty */}
      {cart.items.length < 1 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-[0.6]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleCheckout)}
                className="w-full"
              >
                <div className="border bg-white p-5 flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <p>المجموع الكلي</p>
                    <p className="text-2xl text-primary">{total} جنية</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>مجموع النقاط</p>
                    <p className="text-2xl text-primary flex items-center gap-2">
                      <span>{totalPoints}</span>
                      <BadgeDollarSign size={24} className="text-blue-600" />
                    </p>
                  </div>
                  <div className="h-[1px] w-full bg-slate-200" />
                  {/* form */}
                  <FormField
                    control={form.control}
                    name="user_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="اسم المستخدم"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="user_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="كود الشريك"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gift_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="كود الجيفت"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="رقم الهاتف"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="العنوان كامل"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="mt-5 w-full rounded-none bg-blue-500 hover:bg-blue-500/90 text-base h-11"
                >
                  تأكيد الطلب
                </Button>
              </form>
            </Form>
          </div>

          <div className="flex-[1.4]">
            <div className="flex flex-col gap-5">
              {cart.items.map((item) => (
                <CartItem item={item} key={item.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const EmptyCart = () => (
  <div className="flex items-center justify-center h-[450px] w-full">
    <h1 className="text-3xl text-slate-700">لا يوجد منتجات في السلة</h1>
  </div>
);
