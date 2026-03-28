export interface MenuItem {
  label: string;
  href: string;
  icon: string;
  submenu?: MenuItem[];
  permissions?: string[]; 
}

export const menuData: MenuItem[] = [
  {
    label: "Inicio",
    href: "home",
    icon: "LayoutDashboard",

  },
  {
    label: "Usuarios",
    href: "users",
    icon: "Users",
    permissions: ["ver_usuarios"],
    submenu: [
      {
        label: "Ver usuarios",
        href: "users/show",
        icon: "UserRound",
        permissions: ["ver_usuarios"],
      },
      {
        label: "Crear usuario",
        href: "users/create",
        icon: "UserPlus",
        permissions: ["crear_usuario"],
      },
      {
        label: "Roles y permisos",
        href: "users/roles",
        icon: "Shield",
        permissions: ["ver_roles", "ver_permisos"],
      },
    ],
  },
  {
    label: "Cursos",
    href: "courses",
    icon: "Book",
    permissions: ["ver_cursos"],
    submenu: [
      {
        label: "Crear curso en vivo",
        href: "courses/live",
        icon: "Radio",
        permissions: ["crear_virtual_curso"],
      },
      {
        label: "Crear curso",
        href: "courses/create",
        icon: "Plus",
        permissions: ["crear_cursos"],
      },
      {
        label: "Aprobar cursos",
        href: "courses/approve",
        icon: "Check",
        permissions: ["aprobar_cursos"],
      },
      {
        label: "Categorías",
        href: "courses/categories",
        icon: "Layers",
        permissions: ["ver_categorias"],
      },
      {
        label: "Subir materiales",
        href: "courses/materials",
        icon: "Upload",
        permissions: ["subir_materiales"],
      },
    ],
  },
  {
    label: "Estudiantes",
    href: "students",
    icon: "UserCheck",
    permissions: ["ver_estudiantes"],
    submenu: [
      {
        label: "Asignar cursos",
        href: "students/assign",
        icon: "Plus",
        permissions: ["asignar_cursos"],
      },
      {
        label: "Aprobar inscripciones",
        href: "students/approve",
        icon: "Check",
        permissions: ["aprobar_inscripciones"],
      },
    ],
  },
  {
    label: "Pagos / Finanzas",
    href: "payments",
    icon: "CreditCard",
    permissions: ["ver_transacciones"],
    submenu: [
      {
        label: "Aprobar pagos",
        href: "payments/approve",
        icon: "Check",
        permissions: ["aprobar_pagos"],
      },
      {
        label: "Reembolsar pagos",
        href: "payments/refund",
        icon: "DollarSign",
        permissions: ["reembolsar_pagos"],
      },
      {
        label: "Estadísticas",
        href: "payments/stats",
        icon: "BarChart",
        permissions: ["generar_estadisticas_financieras"],
      },
    ],
  },
  {
    label: "Compras",
    href: "purchases",
    icon: "ShoppingCart",
    permissions: ["comprar"],
    submenu: [
      {
        label: "Ver compras",
        href: "purchases/view",
        icon: "Eye",
        permissions: ["ver_compras"],
      },
      {
        label: "Eliminar compra",
        href: "purchases/delete",
        icon: "Trash",
        permissions: ["eliminar_compra"],
      },
    ],
  },
  {
    label: "Reportes",
    href: "reports",
    icon: "FileText",
    permissions: ["ver_reportes"],
    submenu: [
      {
        label: "Descargar reportes",
        href: "reports/download",
        icon: "Download",
        permissions: ["descargar_reportes"],
      },
      {
        label: "Mensuales",
        href: "reports/monthly",
        icon: "Calendar",
        permissions: ["generar_informes_mensuales"],
      },
    ],
  },
  {
    label: "Sucursales",
    href: "branches",
    icon: "MapPin",
    permissions: ["ver_sucursales"],
    submenu: [
      {
        label: "Crear sucursal",
        href: "branches/create",
        icon: "Plus",
        permissions: ["crear_sucursal"],
      },
      {
        label: "Editar sucursal",
        href: "branches/edit",
        icon: "Edit",
        permissions: ["editar_sucursal"],
      },
      {
        label: "Asignar encargado",
        href: "branches/assign",
        icon: "UserCheck",
        permissions: ["asignar_encargado_sucursal"],
      },
    ],
  },
  {
    label: "Configuración",
    href: "settings",
    icon: "Settings",
    permissions: ["gestionar_ajustes_sistema"],
    submenu: [
      { label: "Theme", href: "settings/theme", icon: "User" },
      { label: "Seguridad", href: "settings/security", icon: "Shield" },
    ],
  },
  {
    label: "Soporte / Comunicación",
    href: "support",
    icon: "HelpCircle",
    permissions: ["ver_mensajes"],
    submenu: [
      {
        label: "Chat soporte",
        href: "support/chat",
        icon: "MessageCircle",
        permissions: ["ver_chat_soporte"],
      },
      {
        label: "Newsletter",
        href: "support/newsletter",
        icon: "Mail",
        permissions: ["enviar_newsletter"],
      },
      {
        label: "Ofertas",
        href: "support/offers",
        icon: "Gift",
        permissions: ["publicar_ofertas"],
      },
      {
        label: "Testimonios",
        href: "support/testimonials",
        icon: "Star",
        permissions: ["gestionar_testimonios"],
      },
    ],
  },
  {
    label: "Notificaciones",
    href: "notifications",
    icon: "Bell",
    permissions: [
      "ver_notificaciones_superadmin",
      "ver_notificaciones_admin",
      "ver_notificaciones_colaboradores",
      "ver_notificaciones_docente",
      "ver_notificaciones_estudiante",
      "ver_notificaciones_soporte",
    ],
  },
];
