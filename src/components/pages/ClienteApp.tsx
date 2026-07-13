import { useEffect, useState, useMemo } from "react";
import {
  getOrdersByGuestId,
  subscribeToGuestOrders,
} from "@/services/order-service";
import { getOrCreateGuestId } from "@/lib/utils";
import type { Order } from "@/types/order.types";
import { PackageOpen } from "lucide-react";
import { BillModal } from "@/components/modals/bill-modal";
import { STATUS_LABELS } from "@/const/columns-orders";
import { StatusModal } from "@/components/modals/status-modal";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-[#2a2520] text-[#e8b84b] border-[#e8b84b]/40 hover:bg-[#e8b84b]/10 hover:border-[#e8b84b]",
  confirmed: "bg-[#2a2520] text-[#4a90e2] border-[#4a90e2]/40 hover:bg-[#4a90e2]/10 hover:border-[#4a90e2]",
  preparing: "bg-[#2a2520] text-[#f5a623] border-[#f5a623]/40 hover:bg-[#f5a623]/10 hover:border-[#f5a623]",
  ready: "bg-[#2a2520] text-[#27ae60] border-[#27ae60]/40 hover:bg-[#27ae60]/10 hover:border-[#27ae60]",
  delivered: "bg-[#2a2520] text-[#b4a58c] border-[#b4a58c]/40 hover:bg-[#b4a58c]/10 hover:border-[#b4a58c]",
};

type DateFilter = "today" | "all";

const DATE_FILTERS: { key: DateFilter; label: string }[] = [
  { key: "today", label: "Hoy" },
  { key: "all", label: "Todos" },
];

export function ClienteApp() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBill, setShowBill] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [dateFilter, setDateFilter] = useState<DateFilter>("today");
  const guestId = getOrCreateGuestId();

  // useEffect(() => {
  //   getOrdersByGuestId(guestId)
  //     .then(setOrders)
  //     .catch(() => setError("No se pudieron cargar los pedidos."))
  //     .finally(() => setLoading(false));
  // }, [guestId]);

  useEffect(() => {
    getOrdersByGuestId(guestId)
      .then(setOrders)
      .catch(() => setError("No se pudieron cargar los pedidos."))
      .finally(() => setLoading(false));

    const unsubscribe = subscribeToGuestOrders(guestId, (updatedOrder) => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === updatedOrder.id
            ? { ...order, status: updatedOrder.status }
            : order,
        ),
      );
    });

    return unsubscribe;
  }, [guestId]);

  function isSameDay(date: Date, reference: Date): boolean {
    return (
      date.getFullYear() === reference.getFullYear() &&
      date.getMonth() === reference.getMonth() &&
      date.getDate() === reference.getDate()
    );
  }

  function filterOrdersByDate(orders: Order[], filter: DateFilter): Order[] {
    if (filter === "all") return orders;

    const now = new Date();

    return orders.filter((order) => {
      const createdAt = new Date(order.created_at);
      return filter === "today" && isSameDay(createdAt, now);
    });
  }

  const filteredOrders = useMemo(
    () => filterOrdersByDate(orders, dateFilter),
    [orders, dateFilter],
  );

  const handleShowBill = (order: Order) => {
    setSelectedOrder(order);
    setShowBill(true);
  };

  const handleShowStatus = (order: Order) => {
    setSelectedOrder(order);
    setShowStatus(true);
  };

  const handleCloseBill = () => {
    setShowBill(false);
    setSelectedOrder(null);
  };

  const handleCloseStatus = () => {
    setShowStatus(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3 text-[#b4a58c]">
          <span className="w-8 h-8 border-2 border-[#2a2520] border-t-[#c9973a] rounded-full animate-spin" />
          <p className="text-sm">Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-sm text-[#d63031]">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="flex flex-col items-center text-center gap-4 max-w-xs">
          <div className="w-20 h-20 rounded-full bg-(--gold)/10 flex items-center justify-center">
            <PackageOpen
              className="w-10 h-10 text-(--gold)/50"
              strokeWidth={1.5}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-(--faf7f2,#faf7f2)/80">
              Aún no tienes pedidos
            </p>
            <p className="text-xs text-(--gold-light)/80">
              Cuando hagas uno, aparecerá por acá.
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8 text-[#faf7f2] min-h-screen">
        <header className="pb-6 pt-20">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#c9973a]">
            Pedidos
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-[#faf7f2] sm:text-5xl">
            Tus Pedidos
          </h1>

          <div className="mt-4 h-1 w-20 rounded-full bg-[#c9973a]" />
          <div className="mt-6 flex gap-2">
            {DATE_FILTERS.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => setDateFilter(filter.key)}
                className={`
                rounded-full px-4 py-2 text-sm font-medium transition-colors
                ${
                  dateFilter === filter.key
                    ? "bg-(--gold) text-black"
                    : "border border-[#2a2520] bg-[#161410] text-[#b4a58c] hover:border-(--gold)/40"
                }
              `}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </header>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredOrders.map((order) => (
            <li
              key={order.id}
              className="rounded-xl border border-[#2a2520] bg-[#161410] p-4 shadow-sm hover:border-[#c9973a]/30 transition-colors h-50 flex flex-col cursor-pointer"
              onClick={() => handleShowBill(order)}
            >
              <header className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium text-[#faf7f2]">
                  {order.customer_name}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full capitalize font-medium cursor-pointer border transition-all duration-300 ${STATUS_STYLES[order.status] || STATUS_STYLES.pending} ${order.status !== "delivered" ? "glow-pulse" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShowStatus(order);
                  }}
                >
                  {STATUS_LABELS[order.status] || order.status}
                </span>
              </header>
              <ul className="flex flex-col gap-1.5 mb-3 max-h-40 overflow-y-auto">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between text-sm">
                    <span className="text-[#faf7f2]/80">
                      {item.quantity}× {item.name}
                    </span>
                    <span className="text-[#c9973a]">
                      S/ {item.unit_price.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <footer className="flex justify-between text-sm font-semibold border-t border-[#2a2520] pt-2 mt-auto">
                <span className="text-[#faf7f2]">Total</span>
                <span className="text-[#c9973a]">
                  S/ {order.total.toFixed(2)}
                </span>
              </footer>
            </li>
          ))}
        </ul>
      </div>
      <BillModal
        order={selectedOrder}
        isVisible={showBill}
        onClose={handleCloseBill}
      />
      {selectedOrder && showStatus && (
        <StatusModal
          status={selectedOrder.status}
          onClose={handleCloseStatus}
        />
      )}
    </>
  );
}
