import { handleAddToCart } from "@/lib/events";
import { type ComboSelect } from "@/types/types";

export function AddButton({
  disabled = false,
  isSticky = false,
  combo,
  comboId,
  comboPrice,
  comboImg,
}: {
  disabled?: boolean;
  isSticky?: boolean;
  combo: ComboSelect;
  comboId?: string;
  comboPrice?: number;
  comboImg?: string;
}) {
  return (
    <button
      className={`mt-8 h-16 w-full rounded-2xl bg-(--gold) text-sm font-bold uppercase tracking-[0.16em] text-black 
        ${isSticky ? "sticky bottom-4 mt-6" : ""}
      transition hover:bg-[#d8aa4f] 
      disabled:cursor-not-allowed disabled:bg-[#1b1812] disabled:text-zinc-500`}
      onClick={() => handleAddToCart(comboId || combo.name, combo.name, comboPrice || 0, comboImg || "")}
      disabled={disabled}
    >
      Añadir al carrito
    </button>
  );
}
