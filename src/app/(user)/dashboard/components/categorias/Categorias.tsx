"use client";

import React, { useState } from "react";
import { useCategories, useCategoryMutations } from "@/hooks/useCategories";
import toast from "react-hot-toast";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Button } from "@/components/ui/button";

export const Categorias = () => {
  const { data, isLoading } = useCategories();
  const { create, update, remove } = useCategoryMutations();

  const [name, setName] = useState("");
  const [editing, setEditing] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🟢 CREAR
  const handleCreate = () => {
    if (!name.trim()) return toast.error("El nombre es obligatorio");
    create.mutate(
      { name, type: "digital" },
      {
        onSuccess: () => {
          toast.success("Categoría creada 🚀");
          setName("");
        },
        onError: () => toast.error("Error al crear"),
      }
    );
  };

  // 🟡 EDITAR (Abrir modal)
  const openEditModal = (cat: any) => {
    setEditing(cat);
    setName(cat.name); // Carga el nombre actual
    setIsModalOpen(true);
  };

  // 🔵 ACTUALIZAR
  const handleUpdate = () => {
    if (!name.trim()) return toast.error("Nombre vacío");
    update.mutate(
      { id: editing.id, data: { name } },
      {
        onSuccess: () => {
          toast.success("Actualizado correctamente ✅");
          closeModal();
        },
        onError: () => toast.error("Error al actualizar"),
      }
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
    setName("");
  };

  if (isLoading) return <p className="p-6 font-mono text-zinc-500">CARGANDO_SISTEMA...</p>;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* TÍTULO ESTILO MANAGER */}
      <header className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-light tracking-[0.3em]  uppercase">
          SISTEMA <span className="text-red-500 font-bold">CATEGORÍAS</span>
        </h1>
        <p className="text-[10px] text-zinc-600 font-mono tracking-widest mt-1">
          BASE / V.1
        </p>
      </header>

      {/* INPUT PRINCIPAL PARA CREAR */}
      <div className="flex gap-3 cardBG border border-zinc-500/15  shadow-md shadow-black/30 p-4 rounded-xl">
        <input
          placeholder="Nueva categoría..."
          className="flex-1 bg-transparent border-none outline-none text-zinc-200 placeholder:text-zinc-700 font-mono text-sm uppercase tracking-wider"
          value={!editing ? name : ""}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-500 text-[10px] tracking-widest uppercase px-6">
          Crear
        </Button>
      </div>

      {/* LISTA EN COLUMNAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((cat) => (
          <div
            key={cat.id}
            className="group flex flex-col justify-between p-4 rounded-xl cardBG border border-zinc-500/15  shadow-md shadow-black/30 hover:border-blue-500/30 transition-all duration-300 backdrop-blur-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-tighter">ID_{cat.id}</span>
              <div className="flex gap-1 transition-opacity">
                <Button
                  size="lg"
                  variant="ghost"
                  className="h-9 w-9 p-0 cursor-pointer hover:text-blue-500"
                  onClick={() => openEditModal(cat)}
                >
                  ✎
                </Button>
                <ConfirmDialog
                  title="Eliminar"
                  description="¿Confirmas eliminar esta categoría?"
                  onConfirm={() => remove.mutate(cat.id, { onSuccess: () => toast.success("Eliminado") })}
                  trigger={
                    <Button size="lg" variant="ghost" className="h-9 w-9 p-0 text-zinc-400 hover:text-red-500 cursor-pointer">
                      ✕
                    </Button>
                  }
                />
              </div>
            </div>
            <span className="text-sm font-bold tracking-widest text-zinc-400 uppercase">{cat.name}</span>
          </div>
        ))}
      </div>

      {/* MODAL DE EDICIÓN (HTML + Tailwind Puro) */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={closeModal} // Cerrar al hacer clic fuera
        >
          <div 
            className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} // Evita que el clic adentro cierre el modal
          >
            <h2 className="text-xl font-light tracking-[0.2em] text-white uppercase mb-6">
              Editar <span className="text-blue-500 font-bold">Categoría</span>
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest ml-1">Nuevo Identificador</label>
                <input
                  autoFocus
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white outline-none focus:border-blue-500/50 transition-colors uppercase font-mono"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 border-zinc-800 hover:bg-zinc-900 text-[10px] tracking-widest"
                  onClick={closeModal}
                >
                  CANCELAR
                </Button>
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-[10px] tracking-widest"
                  onClick={handleUpdate}
                >
                  GUARDAR
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};