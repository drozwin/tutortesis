"use client";

import { useState } from "react";
import { useAdminPayments, usePaymentShow } from "@/hooks/useAdminPayments";
import {VoucherModal} from './VoucherModal'

export const AdminPaymentsTable = () => {
  const { payments, loading, approve } = useAdminPayments();

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const {
    data: payment,
    isLoading,
  } = usePaymentShow(selectedId!);

  if (loading) return <p>Cargando pagos...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Pagos</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-zinc-800">
            <th className="p-2">Usuario</th>
            <th>Email</th>
            <th>Monto</th>
            <th>Estado</th>
            <th>Voucher</th>
            <th>Acción</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.order?.user?.name}</td>
              <td>{p.order?.user?.email}</td>

              <td>${p.amount}</td>

              <td>
                {p.status === "pending" ? (
                  <span className="text-yellow-500">Pendiente</span>
                ) : (
                  <span className="text-green-500">Aprobado</span>
                )}
              </td>

              <td>
                <button
                  onClick={() => setSelectedId(p.id)}
                  className="text-blue-400 underline"
                >
                  Ver
                </button>
              </td>

              <td>
                {p.status === "pending" && (
                  <button
                    onClick={() => approve(p.id)}
                    className="bg-green-600 px-3 py-1 rounded"
                  >
                    Aprobar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔥 MODAL */}
      {selectedId && (
        <VoucherModal
          payment={payment}
          isLoading={isLoading}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
};