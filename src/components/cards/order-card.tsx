import type { Order } from "@/types/order.types";

export function OrderCard({ order, onOrderClick }: { order: Order; onOrderClick: (order: Order) => void }) {
  return (
    <div className="rounded-xl border border-[#2a2520] bg-[#161410] p-4 shadow-sm hover:border-[#c9973a]/30 transition-colors cursor-pointer" onClick={() => onOrderClick(order)}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-[#faf7f2]">
          {order.customer_name}
        </span>
      </div>
      <p className="text-xs text-[#b4a58c] mb-3">
        {new Date(order.createdAt).toLocaleString("es-PE")}
      </p>
      <ul className="flex flex-col gap-1.5 mb-3">
        {order.items.map((item) => (
          <li key={item.id} className="flex justify-between text-xs">
            <span className="text-[#faf7f2]/80 truncate max-w-35">
              {item.quantity}× {item.name}
            </span>
            <span className="text-[#c9973a]">
              S/ {item.unit_price.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between text-sm font-semibold border-t border-[#2a2520] pt-2">
        <span className="text-[#faf7f2]">Total</span>
        <span className="text-[#c9973a]">S/ {order.total.toFixed(2)}</span>
      </div>
    </div>
  );
}
