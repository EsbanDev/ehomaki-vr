import { formatCurrency } from "@/hooks/useCart";

interface ShippingModalProps {
  onClose: () => void;
  onConfirm: (option: "delivery" | "pickup") => void;
}

const deliveryCost = 5;

export function ShippingModal({ onClose, onConfirm }: ShippingModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border border-(--gold)/20 bg-[#111]/95 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-2 text-2xl font-bold text-white">
          Selecciona tipo de envío
        </h3>
        <p className="mb-6 text-sm text-white/50">
          Elige cómo quieres recibir tu pedido
        </p>

        <div className="space-y-3">
          <button
            onClick={() => {
              onConfirm("delivery");
            }}
            className="group w-full rounded-2xl border border-(--gold)/10 bg-white/5 p-5 text-left transition-all hover:border-(--gold)/30 hover:bg-white/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">Delivery</div>
                <div className="mt-1 text-sm text-white/50">
                  Recibe tu pedido en casa
                </div>
              </div>
              <div className="text-(--gold) font-bold">
                + {formatCurrency(deliveryCost)}
              </div>
            </div>
          </button>

          <button
            onClick={() => {
              onConfirm("pickup");
            }}
            className="group w-full rounded-2xl border border-(--gold)/10 bg-white/5 p-5 text-left transition-all hover:border-(--gold)/30 hover:bg-white/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">Recojo en tienda</div>
                <div className="mt-1 text-sm text-white/50">
                  Pasa por tu pedido cuando quieras
                </div>
              </div>
              <div className="text-(--gold) font-bold">Gratis</div>
            </div>
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-full border border-white/10 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
