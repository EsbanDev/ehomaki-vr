import { getAllOrders } from "@/services/order-service";
import { useEffect, useMemo, useState } from "react";
import type { Order } from "@/types/order.types";
import { COLUMNS } from "@/const/columns-orders";
import { KanbanColumn } from "@/components/cards/kanban-column";
import { BillAdminModal } from "@/components/modals/bill-admin-modal";

type DateFilter = "today" | "week" | "all";

const DATE_FILTERS: { key: DateFilter; label: string }[] = [
  { key: "today", label: "Hoy" },
  { key: "week", label: "Esta semana" },
  { key: "all", label: "Todos" },
];

function isSameDay(date: Date, reference: Date): boolean {
  return (
    date.getFullYear() === reference.getFullYear() &&
    date.getMonth() === reference.getMonth() &&
    date.getDate() === reference.getDate()
  );
}

function isWithinLastWeek(date: Date, reference: Date): boolean {
  const sevenDaysAgo = new Date(reference);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  return date >= sevenDaysAgo;
}

function filterOrdersByDate(orders: Order[], filter: DateFilter): Order[] {
  if (filter === "all") return orders;

  const now = new Date();

  return orders.filter((order) => {
    const createdAt = new Date(order.created_at);
    return filter === "today"
      ? isSameDay(createdAt, now)
      : isWithinLastWeek(createdAt, now);
  });
}

export function PedidosApp() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dateFilter, setDateFilter] = useState<DateFilter>("today");

  useEffect(() => {
    getAllOrders()
      .then(setOrders)
      .catch(() => setError("No se pudieron cargar los pedidos."))
      .finally(() => setLoading(false));
  }, []);

  const filteredOrders = useMemo(
    () => filterOrdersByDate(orders, dateFilter),
    [orders, dateFilter],
  );

  if (loading) {
    return (
      <div className="grid place-content-center min-h-screen">
        <div className="flex flex-col items-center gap-3 text-[#b4a58c]">
          <span className="w-8 h-8 border-2 border-[#2a2520] border-t-[#c9973a] rounded-full animate-spin" />
          <p className="text-sm">Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-50">
        <p className="text-sm text-[#d63031]">{error}</p>
      </div>
    );
  }

  const grouped = COLUMNS.reduce<Record<Order["status"], Order[]>>(
    (acc, col) => {
      acc[col.key] = filteredOrders.filter((o) => o.status === col.key);
      return acc;
    },
    {} as Record<Order["status"], Order[]>,
  );

  return (
    <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8 text-white">
      <header className="pb-6">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-(--gold)">
          Pedidos
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Historial de Pedidos
        </h1>

        <div className="mt-4 h-1 w-20 rounded-full bg-(--gold)" />

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
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.key}
            column={col}
            orders={grouped[col.key]}
            onOrderClick={setSelectedOrder}
          />
        ))}
      </div>
      {selectedOrder && (
        <BillAdminModal
          isVisible={!!selectedOrder}
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
