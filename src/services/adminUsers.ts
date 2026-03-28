import { apiClient } from "@/lib/fetch";

export interface User {
  id: number;
  name: string;
  apellidos: string;
  email: string;
  username: string;
  status: "active" | "pending" | "suspended";
  is_banned: boolean;
  roles: { name: string }[];
  profile?: {
    phone?: string;
    city?: string;
  };
}

// ✅ LISTAR
export const getUsers = () => {
  return apiClient<{ data: User[] }>("/admin/users");
};

// ✅ VER UNO
export const getUser = (id: number) => {
  return apiClient<User>(`/admin/users/${id}`);
};

// ✅ ACTUALIZAR
export const updateUser = (id: number, data: Partial<User>) => {
  return apiClient(`/admin/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// ✅ ELIMINAR
export const deleteUser = (id: number) => {
  return apiClient(`/admin/users/${id}`, {
    method: "DELETE",
  });
};

// ✅ BAN
export const banUser = (id: number) => {
  return apiClient(`/admin/users/${id}/ban`, {
    method: "PATCH",
  });
};

// ✅ UNBAN
export const unbanUser = (id: number) => {
  return apiClient(`/admin/users/${id}/unban`, {
    method: "PATCH",
  });
};

// ✅ STATUS
export const changeStatus = (id: number, status: string) => {
  return apiClient(`/admin/users/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
};

// ✅ ROLE
export const changeRole = (id: number, role: string) => {
  return apiClient(`/admin/users/${id}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });
};