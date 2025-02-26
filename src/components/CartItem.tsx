import Image from "next/image";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import useCart, { CartItemType } from "@/store/cartStore";
import { use, useState } from "react";

const CartItem = ({ item }: { item: CartItemType }) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const [currentPrice, setCurrentPrice] = useState<number>(item.total);
  const deleteItemData = () => {
    cart.removeItem(item.id);
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
    setCurrentPrice((prev) => prev + item.price);
    cart.updateItemQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      setCurrentPrice((prev) => prev - item.price);
      cart.updateItemQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="border bg-white border-gray-200 p-5 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Image
            src={item.image as string}
            alt="image"
            width={120}
            height={120}
            className="rounded-md w-[90px] h-[90px] sm:h-[120px] sm:w-[120px] object-cover"
          />
          <div className="flex flex-col gap-1">
            <div className="relative w-fit">
              <div className="z-10 text-lg md:text-2xl mb-2">{item.name}</div>
              <div className="absolute bottom-2 w-full h-4 bg-color-4/40 -z-10"></div>
            </div>
            <div className="flex flex-row items-start gap-6 mb-2 text-sm md:text-md">
              <p className="bg-slate-100 px-4 py-1 text-lg rounded-lg">
                {currentPrice} جنية
              </p>
            </div>
            {/* ////////////// */}
            <div className="flex justify-between items-center w-32 md:w-36">
              <Button
                onClick={handleDecrement}
                variant="secondary"
                className="text-lg h-10"
                disabled={quantity === 1}
              >
                -
              </Button>
              <p>{quantity}</p>
              <Button
                onClick={handleIncrement}
                variant="secondary"
                className="text-lg h-10"
              >
                +
              </Button>
            </div>
            {/* ////////////// */}
          </div>
        </div>
        <div>
          <Button
            onClick={deleteItemData}
            variant="outline"
            className="text-muted-foreground"
          >
            <Trash2 size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
