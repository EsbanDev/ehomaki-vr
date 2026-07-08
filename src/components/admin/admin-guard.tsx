import { useEffect, useState } from "react";
import {
  getSession,
  onAuthStateChange,
  signOut,
} from "@/services/auth-service";
import LoginForm from "./login-form";
import { PedidosApp } from "@/components/pages/PedidosApp";
import { LogOut, ArrowLeft } from "lucide-react";

export default function AdminGuard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    getSession()
      .then(({ session }) => setIsAuthenticated(session !== null))
      .finally(() => setIsCheckingSession(false));

    const unsubscribe = onAuthStateChange(({ session }) => {
      setIsAuthenticated(session !== null);
    });

    return unsubscribe;
  }, []);

  async function handleSignOut() {
    await signOut();
  }

  if (isCheckingSession) {
    return (
      <div className="flex min-h-[70dvh] items-center justify-center">
        <p className="text-sm text-white/40">Verificando sesión...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
        <a
          href="/"
          className="group flex items-center gap-2 rounded-full border border-(--gold) bg-white/10 px-3 py-1 transition-all duration-300 hover:bg-(--gold)/15 hover:shadow-lg"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300" />
          <span>Volver al inicio</span>
        </a>
        <button
          type="button"
          onClick={handleSignOut}
          className="
            rounded-full border border-red-400/20 px-4 py-2
            text-sm font-medium text-red-400/70 transition-colors
            hover:border-(--gold)/40 hover:text-white flex items-center
          "
        >
          <LogOut className="inline-block mr-2 h-4 w-4" />
          Cerrar sesión
        </button>
      </div>

      <PedidosApp />
    </div>
  );
}
