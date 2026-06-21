import { useEffect, useState } from "react";
import { formatCurrency } from "@/hooks/useCart";
import type { CartItem } from "@/hooks/useCart";
import { User, CreditCard } from 'lucide-react'

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  total: number;
  orden: CartItem[];
}

const PAYMENT_METHODS = [
  { id: "tarjeta", label: "Tarjeta" },
  { id: "yape", label: "Yape" },
  { id: "plin", label: "Plin" },
];

export default function OrderModal({ open, onClose, total, orden }: OrderModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [customerName, setCustomerName] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const payloadOrden = orden.map(item => ({
    id: item.id,
    quantity: item.qty,
    items: item.items
  }));

  const ordenInfo = {
    cliente: customerName,
    metodoPago: selectedPayment,
    total: total,
    items: payloadOrden
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const isNameValid = customerName.trim().length > 0;
  const canConfirm = selectedPayment !== null;

  const handleClose = () => {
    setStep(1);
    setCustomerName("");
    setSelectedPayment(null);
    onClose();
  };

  const enviarPedido = () => {
    console.warn('Enviando pedido');
    console.log('Total:', total);
    console.log('Método de pago:', selectedPayment);
    console.log('Nombre del cliente:', customerName);
    console.log('Items:', ordenInfo);

    handleClose()
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={handleClose}
    >
      <div
        className="flex w-full max-w-md max-h-[85dvh] flex-col overflow-hidden rounded-3xl border border-(--gold)/10 bg-[#111] shadow-[0_20px_60px_rgba(0,0,0,.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Stepper */}
        <div className="flex shrink-0 items-center justify-center gap-3 border-b border-white/5 px-7 pt-7 pb-5">
          <div className="flex items-center gap-2">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                step === 1
                  ? "border-(--gold) text-(--gold)"
                  : "border-white/10 text-white/30"
              }`}
            >
              <User className="size-4" />
            </span>
            <span
              className={`text-xs font-medium ${step === 1 ? "text-white" : "text-white/30"}`}
            >
              Datos
            </span>
          </div>

          <div className="h-px w-8 bg-white/10" />

          <div className="flex items-center gap-2">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                step === 2
                  ? "border-(--gold) text-(--gold)"
                  : "border-white/10 text-white/30"
              }`}
            >
              <CreditCard className="size-4" />
            </span>
            <span
              className={`text-xs font-medium ${step === 2 ? "text-white" : "text-white/30"}`}
            >
              Pago
            </span>
          </div>
        </div>

        {/* Contenido */}
        <div
          className="
            flex-1 overflow-y-auto overscroll-contain px-7 py-6
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-(--gold)/20
            hover:[&::-webkit-scrollbar-thumb]:bg-(--gold)/40
          "
        >
          {step === 1 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold text-white">
                ¿A nombre de quién va el pedido?
              </h2>
              <p className="text-sm text-white/50">
                Lo usaremos para identificarlo al recogerlo o entregarlo.
              </p>

              <label htmlFor="customerName" className="sr-only">
                Nombre del pedido
              </label>
              <input
                id="customerName"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ej. María Torres"
                className="
                  mt-2 rounded-xl border border-white/10 bg-white/3
                  px-4 py-3 text-white placeholder:text-white/30
                  outline-none transition-colors
                  focus:border-(--gold)/40
                "
              />
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-sm text-white/50">Total a pagar</p>
                <p className="text-3xl font-bold text-(--gold)">
                  {formatCurrency(total)}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-sm text-white/70">Elige un método de pago</p>

                <div className="grid grid-cols-3 gap-3">
                  {PAYMENT_METHODS.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedPayment(method.id)}
                      className={`
                        flex flex-col items-center gap-2 rounded-xl border px-3 py-4
                        transition-colors
                        ${
                          selectedPayment === method.id
                            ? "border-(--gold)/40 bg-(--gold)/10"
                            : "border-white/10 bg-white/3 hover:border-white/20"
                        }
                      `}
                    >
                      {/* Icono genérico — reemplazar por el logo de cada método */}
                      <svg
                        className="h-5 w-5 text-(--gold)"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {method.id === "tarjeta" ? (
                          <>
                            <rect x="2" y="5" width="20" height="14" rx="2" />
                            <path d="M2 10h20" />
                          </>
                        ) : (
                          <>
                            <rect x="6" y="2" width="12" height="20" rx="2" />
                            <path d="M11 18h2" />
                          </>
                        )}
                      </svg>
                      <span className="text-xs font-medium text-white/80">
                        {method.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer: navegación entre pasos */}
        <div className="shrink-0 border-t border-(--gold)/10 px-7 pt-5 pb-7">
          <div className="flex items-center gap-3">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="
                  flex-1 rounded-full border border-(--gold)/20 py-3
                  text-sm font-medium text-white/70 transition-colors
                  hover:border-(--gold)/40 hover:text-white
                "
              >
                Atrás
              </button>
            )}

            <button
              type="button"
              disabled={step === 1 ? !isNameValid : !canConfirm}
              onClick={() => (step === 1 ? setStep(2) : enviarPedido())}
              className="
                flex-1 rounded-full bg-(--gold) py-3
                text-sm font-medium text-black
                transition-opacity
                disabled:cursor-not-allowed disabled:opacity-30
              "
            >
              {step === 1 ? "Siguiente" : "Confirmar pedido"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
