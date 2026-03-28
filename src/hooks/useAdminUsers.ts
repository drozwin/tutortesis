import { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  banUser,
  unbanUser,
  changeRole,
  changeStatus,
  User,
} from "@/services/adminUsers";

export function useAdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    refresh: fetchUsers,

    deleteUser: async (id: number) => {
      await deleteUser(id);
      fetchUsers();
    },

    banUser: async (id: number) => {
      await banUser(id);
      fetchUsers();
    },

    unbanUser: async (id: number) => {
      await unbanUser(id);
      fetchUsers();
    },

    changeRole: async (id: number, role: string) => {
      await changeRole(id, role);
      fetchUsers();
    },

    changeStatus: async (id: number, status: string) => {
      await changeStatus(id, status);
      fetchUsers();
    },
  };
}