"use client";

import { useAdminUsers } from "@/hooks/useAdminUsers";
import { ROLES } from "@/constants/roles";
export const AdminUsersTable = () => {
  const {
    users,
    loading,
    deleteUser,
    banUser,
    unbanUser,
    changeRole,
    changeStatus,
  } = useAdminUsers();

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Usuarios</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-zinc-800 text-left">
            <th className="p-2">Nombre</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Rol</th>
            <th>Ban</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2">
                {u.name} {u.apellidos}
              </td>

              <td>{u.email}</td>

              <td>
                <select
                  value={u.status}
                  onChange={(e) => changeStatus(u.id, e.target.value)}
                >
                  <option value="active">Activo</option>
                  <option value="pending">Pendiente</option>
                  <option value="suspended">Suspendido</option>
                </select>
              </td>

              <td>
                <select
                  value={u.roles?.[0]?.name || ""}
                  onChange={(e) => changeRole(u.id, e.target.value)}
                  className="bg-zinc-900 border px-2 py-1 rounded"
                >
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </td>

              <td>
                {u.is_banned ? (
                  <button
                    onClick={() => unbanUser(u.id)}
                    className="text-green-500"
                  >
                    Desbanear
                  </button>
                ) : (
                  <button
                    onClick={() => banUser(u.id)}
                    className="text-red-500"
                  >
                    Banear
                  </button>
                )}
              </td>

              <td>
                <button
                  onClick={() => deleteUser(u.id)}
                  className="text-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
