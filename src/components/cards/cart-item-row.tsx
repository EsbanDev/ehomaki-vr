import type { CartItem } from "@/hooks/useCart";
import { formatCurrency } from "@/hooks/useCart";
import { useEffect, useState } from "react";
import { CartItemModal } from "@/components/modals/cart-item-modal";

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => {
    if (showDetails) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showDetails]);

  const hasDetails = item.items && item.items.length > 0;

  const comboDescription = item.items
    ?.map((detail) => `${detail.quantity}x ${detail.name}`)
    .join(", ");

  return (
    <>
      <li className="group relative grid grid-cols-[76px_minmax(0,1fr)_auto] gap-4 rounded-2xl border border-(--gold)/10 bg-[#111]/90 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-(--gold)/30 hover:shadow-[0_8px_30px_rgba(200,155,60,0.12)]">
        <div className="overflow-hidden rounded-xl">
          <img
            src={item.img}
            alt={item.name}
            loading="lazy"
            className="h-19 w-19 object-cover saturate-[0.9] brightness-[0.95] transition-all duration-500 group-hover:scale-105 group-hover:saturate-100"
          />
        </div>

        <div className="flex min-w-0 flex-col justify-center gap-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-[0.95rem] font-semibold text-white">
              {item.name}
            </h3>
          </div>

          {comboDescription && (
            <p className="line-clamp-1 text-[0.75rem] text-white/50">
              {comboDescription}
            </p>
          )}

          <p className="text-[0.75rem] text-white/60">
            {formatCurrency(item.price)} c/u
          </p>
        </div>

        <div className="flex flex-col items-end justify-center">
          <p className="text-lg font-bold tracking-tight text-(--gold)">
            {formatCurrency(item.price * item.qty)}
          </p>

          {item.qty > 1 && (
            <p className="text-[0.7rem] text-white/40">{item.qty} unidades</p>
          )}

          {hasDetails && (
            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="
      group
      w-fit
      text-sm cursor-pointer py-0.5 px-2 rounded-2xl bg-(--gold)/10 mt-1
      font-medium
      text-(--gold)
      transition-all duration-300
      hover:gap-2
    "
            >
              Detalles
            </button>
          )}
        </div>
      </li>
      {showDetails && (
        <CartItemModal item={item} onClose={() => setShowDetails(false)} />
      )}
    </>
  );
}
