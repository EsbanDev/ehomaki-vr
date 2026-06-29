import { getAllOrders } from "@/services/order-service";
import { useEffect, useState } from "react";
import type { Order } from "@/types/order.types";
import { COLUMNS } from "@/const/columns-orders";
import { KanbanColumn } from "@/components/cards/kanban-column";
import { BillModal } from "@/components/modals/bill-modal";

export function PedidosApp() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    getAllOrders()
      .then(setOrders)
      .catch(() => setError("No se pudieron cargar los pedidos."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-50">
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
      acc[col.key] = orders.filter((o) => o.status === col.key);
      return acc;
    },
    {} as Record<Order["status"], Order[]>,
  );

  return (
    <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8 text-white">
      <header className="pb-6 pt-20">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-(--gold)">
          Pedidos
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Historial de Pedidos
        </h1>

        <div className="mt-4 h-1 w-20 rounded-full bg-(--gold)" />
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
        <BillModal 
          isVisible={!!selectedOrder} 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
}
