import { useState, type FormEvent } from "react";
import { signIn } from "@/services/auth-service";

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = email.trim().length > 0 && password.length > 0;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    setError(null);
    setIsLoading(true);

    try {
      await signIn(email, password);
      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo iniciar sesión.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-(--gold)/10 bg-[#111] p-8 shadow-[0_20px_60px_rgba(0,0,0,.5)]"
      >
        <h1 className="text-xl font-bold text-white">Acceso administrador</h1>
        <p className="mt-1 text-sm text-white/50">
          Ingresa tus credenciales para ver los pedidos.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium text-white/60"
            >
              Correo
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@restaurante.com"
              className="
                rounded-xl border border-white/10 bg-white/3
                px-4 py-3 text-white placeholder:text-white/30
                outline-none transition-colors
                focus:border-(--gold)/40
              "
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-medium text-white/60"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="
                rounded-xl border border-white/10 bg-white/3
                px-4 py-3 text-white placeholder:text-white/30
                outline-none transition-colors
                focus:border-(--gold)/40
              "
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-900/40 bg-red-950/30 px-3 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="
              mt-2 w-full rounded-full bg-(--gold) py-3
              text-sm font-medium text-black
              transition-opacity
              disabled:cursor-not-allowed disabled:opacity-30
            "
          >
            {isLoading ? "Ingresando..." : "Ingresar"}
          </button>
        </div>
      </form>
    </div>
  );
}
