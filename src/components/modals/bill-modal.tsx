import type { Order } from "@/types/order.types";
import { STATUS_LABELS } from "@/const/columns-orders";
import { X } from "lucide-react";
import { ItemRow } from "../ui/item-row";

interface OrderModalProps {
  order: Order | null;
  isVisible: boolean;
  onClose: () => void;
}



const STATUS_COLORS: Record<string, string> = {
  pending: "bg-[#e8b84b]/20 text-[#e8b84b]",
  confirmed: "bg-[#4a90e2]/20 text-[#4a90e2]",
  preparing: "bg-[#f5a623]/20 text-[#f5a623]",
  ready: "bg-[#27ae60]/20 text-[#27ae60]",
  delivered: "bg-[#b4a58c]/20 text-[#b4a58c]",
};

export function BillModal({ order, isVisible, onClose }: OrderModalProps) {
  if (!isVisible || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0805]/60 backdrop-blur-sm px-4">
      <div
        className="bg-[#111009] rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden border border-[#2a2520]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-[#2a2520]">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-[#faf7f2]">
              {order.customer_name}
            </h2>
            <p className="text-xs text-[#b4a58c]">
              {new Date(order.created_at).toLocaleDateString('es-PE', { weekday: 'short', day: 'numeric', month: 'short' })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                STATUS_COLORS[order.status] ?? "bg-[#2a2520] text-[#b4a58c]"
              }`}
            >
              {STATUS_LABELS[order.status] ?? order.status}
            </span>
            <button
              onClick={onClose}
              className="text-[#b4a58c] hover:text-[#faf7f2] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6 max-h-120">
          {/* Info general */}
          <section className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[#b4a58c]">
              Información
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-[#b4a58c]">Teléfono</span>
              <span className="text-[#faf7f2]">{order.phone}</span>

              <span className="text-[#b4a58c]">Pago</span>
              <span className="text-[#faf7f2] capitalize">
                {order.payment_method}
              </span>

              <span className="text-[#b4a58c]">Entrega</span>
              <span className="text-[#faf7f2] capitalize">
                {order.delivery_type === "pickup"
                  ? "Retiro en tienda"
                  : "Entrega a domicilio"}
              </span>
            </div>
          </section>

          {/* Items */}
          <section className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[#b4a58c]">
              Items ({order.items.length})
            </h3>
            <div className="flex flex-col gap-2">
              {order.items.map((item) => (
                <ItemRow key={item.id} item={item} />
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#2a2520] flex flex-col gap-2">
          {order.delivery_type === "delivery" && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#b4a58c]">Delivery</span>
              <span className="text-lg font-bold text-(--gold)">+ S/.5</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#b4a58c]">Total</span>
            <span className="text-lg font-bold text-(--gold)">
              S/ {order.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
