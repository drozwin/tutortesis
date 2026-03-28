"use client";

import * as Dialog from "@radix-ui/react-dialog";

export function ConfirmDialog({
  trigger,
  onConfirm,
  title = "¿Estás seguro?",
  description = "Esta acción no se puede deshacer",
}: {
  trigger: React.ReactNode;
  onConfirm: () => void;
  title?: string;
  description?: string;
}) {
  return (
    <Dialog.Root>
      {/* 🔥 TU BOTÓN PERSONALIZADO */}
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />

        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-xl">
          
          <Dialog.Title className="text-lg font-semibold">
            {title}
          </Dialog.Title>

          <p className="text-sm text-zinc-500 mt-2">
            {description}
          </p>

          <div className="flex justify-end gap-3 mt-6">
            <Dialog.Close className="px-4 cursor-pointer py-2 rounded bg-zinc-200 dark:bg-zinc-700">
              Cancelar
            </Dialog.Close>

            <Dialog.Close asChild>
              <button
                onClick={onConfirm}
                className="px-4 py-2 cursor-pointer rounded bg-red-600 text-white"
              >
                Confirmar
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}