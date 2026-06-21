import type { CartItem } from "@/hooks/useCart";
import { formatCurrency } from "@/hooks/useCart";

interface CartItemModalProps {
  item: CartItem;
  onClose: () => void;
}

export function CartItemModal({ item, onClose }: CartItemModalProps) {
  return (
    <div
      className="
                fixed inset-0 z-100
                flex items-center justify-center
                bg-black/70
                backdrop-blur-sm
                p-4
              "
      onClick={onClose}
    >
      <div
        className="
                  flex w-full max-w-md
                  max-h-[85dvh]
                  flex-col
                  overflow-hidden
                  rounded-3xl
                  border border-(--gold)/10
                  bg-[#111]
                  shadow-[0_20px_60px_rgba(0,0,0,.5)]
                "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header fijo */}
        <div className="flex shrink-0 items-center gap-4 border-b border-white/5 px-7 pt-7 pb-5">
          <img
            src={item.img}
            alt={item.name}
            className="h-18 w-18 shrink-0 rounded-xl object-cover"
          />

          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold text-white">
              {item.name}
            </h2>
            <p className="text-sm text-white/50">{item.qty} unidades</p>
          </div>
        </div>

        {/* Lista con scroll */}
        <div
          className="flex-1 space-y-3 overflow-y-auto px-7 py-5
                    [&::-webkit-scrollbar]:w-1.5
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-(--gold)/20
                    hover:[&::-webkit-scrollbar-thumb]:bg-(--gold)/40
                  "
        >
          {item.items?.map((detail, index) => (
            <div
              key={index}
              className="flex justify-between rounded-xl border border-white/5 bg-white/3 px-4 py-3
                      "
            >
              <span className="text-white/80">{detail.name}</span>
              <span className="text-(--gold)">x{detail.quantity}</span>
            </div>
          ))}
        </div>

        {/* Footer fijo */}
        <div className="shrink-0 border-t border-(--gold)/10 px-7 pt-5 pb-7">
          <div className="flex justify-between">
            <span className="text-white/70">Total</span>
            <span className="text-2xl font-bold text-(--gold)">
              {formatCurrency(item.price * item.qty)}
            </span>
          </div>

          <button
            className="mt-5 w-full rounded-full border border-(--gold)/20 py-3 text-sm font-medium text-white/70
                      transition-colors
                      hover:border-(--gold)/40
                      hover:text-white
                    "
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
