import { useState } from "react";
import { useCart, formatCurrency } from "@/hooks/useCart";
import CartItemRow from "@/components/cards/cart-item-row";
import { ShippingModal } from "@/components/modals/shipping-modal";
import  OrderModal  from "@/components/modals/order-modal";

export default function CarritoApp() {
  const { items, isHydrated, subtotal, totalItems } = useCart();
  const [shippingOption, setShippingOption] = useState<
    "delivery" | "pickup" | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const [showShippingError, setShowShippingError] = useState(false);

  const handleContinue = () => {
    if (shippingOption === null) {
      setShowShippingError(true);
      return;
    }

    setShowShippingError(false);
    setOrderModalOpen(true);
  };

  const deliveryCost = 5;
  const shippingCost = shippingOption === "delivery" ? deliveryCost : 0;
  const total = subtotal + shippingCost;

  // Evita parpadeo mientras se lee localStorage en el cliente
  if (!isHydrated) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="font-serif text-3xl text-neutral-900">
          Tu carrito está vacío
        </h1>
        <p className="text-neutral-500">
          Explora la carta y agrega tus piezas favoritas.
        </p>
        <a
          href="/menu"
          className="mt-2 rounded-full bg-red-800 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-900 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-red-700"
        >
          Ver la carta
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 text-white">
      <header className="border-b border-(--gold)/10 pb-6 pt-20">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-(--gold)">
          Pedido
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Tu carrito
        </h1>

        <div className="mt-4 h-1 w-20 rounded-full bg-(--gold)" />

        <p className="mt-4 text-sm text-white/50">
          {totalItems} {totalItems === 1 ? "producto" : "productos"}
        </p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <ul className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </ul>

        <aside
          className="
  h-fit
  rounded-3xl
  border border-(--gold)/10
  bg-[#111]/90
  p-7
  backdrop-blur-md
  shadow-[0_10px_40px_rgba(0,0,0,0.35)]

  lg:sticky
  lg:top-24

  hover:border-(--gold)/20
  transition-colors
"
        >
          <h2 className="text-2xl font-bold text-white">Resumen del pedido</h2>

          <div className="mt-3 h-0.75 w-14 rounded-full bg-(--gold)" />

          <dl className="mt-8 space-y-4 text-sm">
            <div className="flex justify-between text-white/70">
              <dt>Subtotal</dt>
              <dd>{formatCurrency(subtotal)}</dd>
            </div>

            <div className="flex justify-between items-center text-white/70">
              <dt>Envío</dt>

              <dd>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="
        group
        inline-flex items-center gap-2

        rounded-full
        border border-(--gold)/20
        bg-(--gold)/10

        px-4 py-2

        text-sm font-medium

        transition-all duration-300 cursor-pointer

        hover:border-(--gold)/40
        hover:bg-(--gold)/15
        hover:-translate-y-0.5
      "
                >
                  {shippingOption === null ? (
                    <span className="text-white/50">Seleccionar</span>
                  ) : shippingOption === "delivery" ? (
                    <span className="font-semibold text-(--gold)">
                      {formatCurrency(deliveryCost)}
                    </span>
                  ) : (
                    <span className="font-semibold text-(--gold)">Gratis</span>
                  )}
                </button>
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex justify-between border-t border-(--gold)/10 pt-6">
            <span className="text-lg text-white/80">Total estimado</span>

            <span className="text-3xl font-bold text-(--gold)">
              {formatCurrency(total)}
            </span>
          </div>

          {/* Próximo paso: este botón abrirá la sección de tipo de entrega */}
          <div className="relative">
            <button
              type="button"
              onClick={handleContinue}
              className="
      mt-8 w-full rounded-full bg-(--gold)
      px-6 py-4

      text-sm font-bold uppercase tracking-[0.18em]
      text-black

      transition-all duration-300 cursor-pointer

      hover:-translate-y-1
      hover:bg-[#dfaa4c]
      hover:shadow-[0_10px_30px_rgba(200,155,60,0.3)]

      active:translate-y-0

      focus-visible:outline
      focus-visible:outline-offset-4
      focus-visible:outline-(--gold)
    "
            >
              Continuar con el pedido →
            </button>

            {showShippingError && (
              <p className="mt-3 text-center text-sm text-(--gold)">
                ✦ Selecciona primero el tipo de envío
              </p>
            )}
          </div>
        </aside>
      </div>

      {/* Modal de selección de envío */}
      {isModalOpen && (
        <ShippingModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={(option) => {
            setShippingOption(option);
            setIsModalOpen(false);
          }}
        />
      )}
      <OrderModal
        open={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        total={total}
        orden={items}
      />
    </div>
  );
}
