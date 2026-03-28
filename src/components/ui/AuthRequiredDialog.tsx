"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useRouter, usePathname } from "next/navigation";

export function AuthRequiredDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />

        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-xl">
          
          <Dialog.Title className="text-lg font-semibold">
            Necesitas una cuenta
          </Dialog.Title>

          <p className="text-sm text-zinc-500 mt-2">
            Para continuar con la compra, elige una opción:
          </p>

          <div className="flex flex-col gap-3 mt-6">
            
            {/* REGISTRARSE */}
            <button
              onClick={() =>
                router.push(`/register?redirect=${pathname}`)
              }
              className="w-full py-3 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700"
            >
              Crear cuenta
            </button>

            {/* LOGIN */}
            <button
              onClick={() =>
                router.push(`/login?redirect=${pathname}`)
              }
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700"
            >
              Iniciar sesión
            </button>

            {/* CANCELAR */}
            <Dialog.Close className="w-full py-3 rounded-lg bg-zinc-200 dark:bg-zinc-700 font-bold">
              Cancelar
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}