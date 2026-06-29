import type { Order } from "@/types/order.types";
import { OrderCard } from "@/components/cards/order-card";
import { COLUMNS } from "@/const/columns-orders";

export function KanbanColumn({
  column,
  orders,
  onOrderClick,
}: {
  column: (typeof COLUMNS)[number];
  orders: Order[];
  onOrderClick: (order: Order) => void;
}) {
  return (
    <div
      className={`flex flex-col gap-3 max-h-210 overflow-y-auto min-w-72 w-72 rounded-xl border-t-4 bg-[#111009] p-4 ${column.color}`}
    >
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold text-[#faf7f2]">{column.label}</h2>
        <span className="text-xs bg-[#2a2520] text-[#c9973a] rounded-full px-2.5 py-0.5 font-medium">
          {orders.length}
        </span>
      </div>
      {orders.length === 0 ? (
        <p className="text-xs text-[#b4a58c] text-center py-6">Sin pedidos</p>
      ) : (
        orders.map((order) => <OrderCard key={order.id} order={order} onOrderClick={onOrderClick} />)
      )}
    </div>
  );
}
