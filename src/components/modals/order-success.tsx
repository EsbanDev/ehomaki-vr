import { useEffect, useState } from "react";
import { CheckCircle2, ClipboardList, UtensilsCrossed, X } from "lucide-react";

// Nombre del evento centralizado — úsalo también al dispararlo
export const ORDER_SUCCESS_EVENT = "success_order";

export function dispatchOrderSuccess() {
  window.dispatchEvent(new CustomEvent(ORDER_SUCCESS_EVENT));
}

export function OrderSuccessModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    function handleSuccess() {
      setIsAnimatingOut(false);
      setIsVisible(true);
    }

    window.addEventListener(ORDER_SUCCESS_EVENT, handleSuccess);
    return () => window.removeEventListener(ORDER_SUCCESS_EVENT, handleSuccess);
  }, []);

  function handleClose() {
    setIsAnimatingOut(true);
    // Espera a que termine la transición antes de desmontar
    setTimeout(() => {
      setIsVisible(false);
      setIsAnimatingOut(false);
    }, 200);
  }

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 transition-opacity duration-200 ${
        isAnimatingOut ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-md rounded-2xl border border-(--gold)/30 bg-card shadow-2xl overflow-hidden transition-all duration-200 ${
          isAnimatingOut
            ? "opacity-0 translate-y-3 scale-95"
            : "opacity-100 translate-y-0 scale-100 animate-[fadeInUp_0.25s_ease-out]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-(--gold)/60 hover:text-(--gold) transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center px-8 pt-10 pb-8 gap-4">
          {/* Icono principal */}
          <div className="w-16 h-16 rounded-full bg-(--gold)/10 flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9 text-(--gold)" strokeWidth={1.5} />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-(--gold)">
              ¡Pedido registrado con éxito!
            </h2>
            <p className="text-sm text-(--faf7f2,#faf7f2)/70 leading-relaxed">
              Tu itamae ya está afilando el cuchillo. En unos minutos tu pedido
              estará en camino.
            </p>
          </div>

          {/* Acciones */}
          <div className="w-full flex flex-col gap-3 mt-4">
            <a
              href="/pedidos"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-(--gold) text-(--black) font-medium py-3 text-sm hover:brightness-110 transition-all"
            >
              <ClipboardList className="w-4 h-4" />
              Ver el estado de mi pedido
            </a>

            <a
              href="/carta"
              className="flex items-center justify-center gap-2 w-full rounded-xl border border-(--gold)/40 text-(--gold) font-medium py-3 text-sm hover:bg-(--gold)/10 transition-all"
            >
              <UtensilsCrossed className="w-4 h-4" />
              ¿Se te antoja otro maki? Ver la carta
            </a>
          </div>

          <p className="text-xs text-(--gold)/50 mt-1">
            Gracias por elegirnos 🍣 — cada roll cuenta una historia Nikkei.
          </p>
        </div>
      </div>
    </div>
  );
}
