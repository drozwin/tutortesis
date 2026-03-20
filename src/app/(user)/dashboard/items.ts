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
  ShoppingBag,
  GraduationCap,
  Layers,
  Bell,
} from "lucide-react";

export const sidebarConfig = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    permission: null,
  },

  // 📚 Cursos
  {
    label: "Cursos",
    href: "/dashboard/cursos",
    icon: BookOpen,
    permission: "ver_cursos",
  },

  {
    label: "Categorías",
    href: "/dashboard/categorias",
    icon: Layers,
    permission: "ver_categorias",
  },

  // 👨‍🎓 Estudiantes
  {
    label: "Estudiantes",
    href: "/dashboard/estudiantes",
    icon: GraduationCap,
    permission: "ver_estudiantes",
  },

  // 👥 Usuarios
  {
    label: "Usuarios",
    href: "/dashboard/usuarios",
    icon: Users,
    permission: "ver_usuarios",
  },

  // 💳 Pagos
  {
    label: "Pagos",
    href: "/dashboard/pagos",
    icon: CreditCard,
    permission: "ver_transacciones",
  },

  // 🛒 Compras
  {
    label: "Compras",
    href: "/dashboard/compras",
    icon: ShoppingBag,
    permission: "ver_compras",
  },

  // 📊 Reportes
  {
    label: "Reportes",
    href: "/dashboard/reportes",
    icon: FileBarChart,
    permission: "ver_reportes",
  },

  // 🏢 Sucursales
  {
    label: "Sucursales",
    href: "/dashboard/sucursales",
    icon: Building2,
    permission: "ver_sucursales",
  },

  // 🛡️ Roles
  {
    label: "Roles",
    href: "/dashboard/roles",
    icon: Shield,
    permission: "ver_roles",
  },

  // 🔐 Permisos (IMPORTANTE - te faltaba)
  {
    label: "Permisos",
    href: "/dashboard/permisos",
    icon: Shield,
    permission: "ver_permisos",
  },

  // 💬 Mensajes
  {
    label: "Mensajes",
    href: "/dashboard/mensajes",
    icon: MessageCircle,
    permission: "ver_mensajes",
  },

  // 🔔 Notificaciones (te faltaba)
  {
    label: "Notificaciones",
    href: "/dashboard/notificaciones",
    icon: Bell,
    permission: "gestionar_alertas",
  },

  // ⚙️ Configuración
  {
    label: "Configuración",
    href: "/dashboard/configuracion",
    icon: Settings,
    permission: "gestionar_ajustes_sistema",
  },
];