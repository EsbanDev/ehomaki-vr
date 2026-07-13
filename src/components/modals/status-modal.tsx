import {
  Clock,
  CheckCircle2,
  ChefHat,
  Sparkles,
  PackageCheck,
  HelpCircle,
} from "lucide-react";
import type { OrderStatus } from "@/types/order.types";

interface StatusConfig {
  icon: React.ElementType;
  title: string;
  message: string;
  accentClass: string;
}

const STATUS_CONFIG: Record<keyof OrderStatus, StatusConfig> = {
  pending: {
    icon: Clock,
    title: "¡Pedido en la barra!",
    message:
      "Tu pedido acaba de llegar a la cocina. Estamos afilando los cuchillos 🔪",
    accentClass: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  },
  confirmed: {
    icon: CheckCircle2,
    title: "¡Confirmado, itadakimasu pronto!",
    message: "Tu pedido fue aceptado. El itamae ya lo tiene en la mira.",
    accentClass: "text-[--gold] bg-[--gold]/10 border-[--gold]/30",
  },
  preparing: {
    icon: ChefHat,
    title: "Rodando makis con amor",
    message:
      "Arroz, nori y relleno bailando entre manos expertas. Casi listo 🍣",
    accentClass: "text-orange-400 bg-orange-400/10 border-orange-400/30",
  },
  ready: {
    icon: Sparkles,
    title: "¡Frescura al 100%!",
    message:
      "Tu pedido está listo y esperando salir. La salsa teriyaki ya está impaciente.",
    accentClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  },
  delivered: {
    icon: PackageCheck,
    title: "¡Buen provecho!",
    message: "Tu pedido llegó a su destino. Que disfrutes cada bocado 🥢",
    accentClass: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  },
};

export function StatusModal({
  status,
  onClose,
}: {
  status: keyof OrderStatus;
  onClose: () => void;
}) {
  const config = STATUS_CONFIG[status];

  if (!config) {
    return (
      <div className="flex flex-col items-center gap-3 p-6 text-center">
        <HelpCircle className="h-10 w-10 text-red-400" />
        <p className="text-sm text-gray-400">Estado no encontrado</p>
      </div>
    );
  }

  const Icon = config.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0805]/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-[#111009] rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden border border-[#2a2520]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-4 p-8 text-center animate-in fade-in zoom-in-95 duration-300">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full border ${config.accentClass}`}
          >
            <Icon className="h-8 w-8" strokeWidth={1.75} />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-white">{config.title}</h3>
            <p className="text-sm text-gray-400 max-w-xs">{config.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
