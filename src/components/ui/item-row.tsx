import { useState } from "react";
import type { Order } from "@/types/order.types";

export function ItemRow({ item }: { item: Order["items"][number] }) {
  const [open, setOpen] = useState(false);
  const hasDetails = item.details.length > 0;

  return (
    <div className="border border-[#2a2520] rounded-lg overflow-hidden">
      <button
        onClick={() => hasDetails && setOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between px-4 py-3 bg-[#161410] text-left transition-colors ${
          hasDetails ? "hover:bg-[#2a2520]/50 cursor-pointer" : "cursor-default"
        }`}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-[#faf7f2]">
            {item.name}
          </span>
          <span className="text-xs text-[#b4a58c]">
            {item.quantity}× · S/ {item.unit_price.toFixed(2)} c/u
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[#c9973a]">
            S/ {(item.unit_price * item.quantity).toFixed(2)}
          </span>
          {hasDetails && (
            <svg
              className={`w-4 h-4 text-[#b4a58c] transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>
      </button>

      {open && hasDetails && (
        <ul className="bg-[#2a2520]/30 border-t border-[#2a2520] px-4 py-2 flex flex-col gap-1.5 list-disc list-inside">
          {item.details.map((detail, i) => (
            <li key={i} className="text-xs text-[#b4a58c] marker:text-[#c9973a]">
              <span className="mr-2">{detail.name}</span>
              <span className="text-[#faf7f2]/60">×{detail.quantity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
