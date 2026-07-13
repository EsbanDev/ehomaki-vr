import { useState, useEffect } from "react";
import type { Order, OrderStatus } from "@/types/order.types";
import { useAddressLink } from "@/hooks/useAddress";
import { updateOrderStatus } from "@/services/order-service";
import { X } from "lucide-react";
import { ItemRow } from "../ui/item-row";

interface OrderModalProps {
  order: Order | null;
  isVisible: boolean;
  onClose: () => void;
}

export function BillAdminModal({ order, isVisible, onClose }: OrderModalProps) {
  const addressLink = useAddressLink(order ?? ({} as Order));
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<keyof OrderStatus>(
    order?.status ?? "pending",
  );

  // Sincronizar el estado local cuando cambie el pedido
  useEffect(() => {
    if (order?.status) {
      setSelectedStatus(order.status);
    }
  }, [order?.status]);

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (!order) return;

    const previousStatus = selectedStatus;
    const newStatus = e.target.value as keyof OrderStatus;

    setSelectedStatus(newStatus);
    setIsUpdatingStatus(true);

    try {
      await updateOrderStatus(order.id, newStatus);
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      setSelectedStatus(previousStatus);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  if (!isVisible || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0805]/60 backdrop-blur-sm px-4">
      <div
        className="bg-[#111009] rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden border border-[#2a2520]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-[#2a2520]">
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 items-center">
              <h2 className="text-lg font-semibold text-[#faf7f2]">
                {order.customer_name}
              </h2>
              <select
                value={selectedStatus}
                onChange={handleStatusChange}
                disabled={isUpdatingStatus}
                className="
                  w-fit px-3 py-1.5 rounded-lg border border-[#2a2520] bg-[#161410]
                  text-[#faf7f2] text-sm transition-colors
                  focus:outline-none focus:border-(--gold)
                  disabled:cursor-not-allowed disabled:opacity-50
                  cursor-pointer
                "
              >
                <option value="pending">Pendiente</option>
                <option value="confirmed">Confirmado</option>
                <option value="preparing">Preparando</option>
                <option value="ready">Listo</option>
                <option value="delivered">Entregado</option>
              </select>
            </div>
            <p className="text-xs text-[#b4a58c]">
              {new Date(order.created_at).toLocaleDateString("es-PE", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
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
              <a
                href={`https://wa.me/51${order.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--gold) hover:text-(--gold-light) transition-colors underline underline-offset-2 decoration-[#c9973a]/30 hover:decoration-[#e8b84b]/50 w-fit"
              >
                {order.phone}
              </a>

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

              {(order.address || addressLink) && (
                <>
                  <span className="text-[#b4a58c]">Dirección</span>
                  {addressLink ? (
                    <a
                      href={addressLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-(--gold) hover:text-(--gold-light) transition-colors underline underline-offset-2 decoration-[#c9973a]/30 hover:decoration-[#e8b84b]/50"
                    >
                      {order.address ?? "Ver en mapa"}
                    </a>
                  ) : (
                    <span className="text-[#faf7f2]">{order.address}</span>
                  )}
                </>
              )}
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
