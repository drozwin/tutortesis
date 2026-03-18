import {
  LayoutDashboard,
  BookOpen,
  Users,
  CreditCard,
  FileBarChart,
  Building2,
  Shield,
  MessageCircle,
  Settings,
} from "lucide-react";

export const sidebarConfig = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    permission: null, // todos pueden verlo
  },

  {
    label: "Cursos",
    href: "/dashboard/cursos",
    icon: BookOpen,
    permission: "ver_cursos",
  },

  {
    label: "Usuarios",
    href: "/dashboard/usuarios",
    icon: Users,
    permission: "ver_usuarios",
  },

  {
    label: "Pagos",
    href: "/dashboard/pagos",
    icon: CreditCard,
    permission: "ver_transacciones",
  },

  {
    label: "Reportes",
    href: "/dashboard/reportes",
    icon: FileBarChart,
    permission: "ver_reportes",
  },

  {
    label: "Sucursales",
    href: "/dashboard/branches",
    icon: Building2,
    permission: "ver_sucursales",
  },

  {
    label: "Roles",
    href: "/dashboard/roles",
    icon: Shield,
    permission: "ver_roles",
  },

  {
    label: "Mensajes",
    href: "/dashboard/messages",
    icon: MessageCircle,
    permission: "ver_mensajes",
  },

  {
    label: "Configuración",
    href: "/dashboard/settings",
    icon: Settings,
    permission: "gestionar_ajustes_sistema",
  },
];