export interface MenuItem {
  label: string;
  href: string;
  icon: string;
  submenu?: MenuItem[];
}
export const menuData = [
  {
    label: "Cursos",
    href: "/cursos",
    icon: "BookOpen",
    section: "cursos",
  },
  {
    label: "Servicios",
    href: "/servicios",
    icon: "HandCoins",
    section: "servicios",
  },
  {
    label: "Extras",
    href: "/extras",
    icon: "Sparkles",
    section: "extras",
  },
  /* {
    label: "Sobre Nosotros",
    href: "/about",
    icon: "Users",
    section: "company",
  }, */
  {
    label: "Contacto",
    href: "/contact",
    icon: "Mail",
    section: "company",
  },
];
/* export const menuData: MenuItem[] = [
  {
    label: "Inicio",
    href: "/",
    icon: "House",
  },
  // {
  //   label: "Proposito",
  //   href: "pedidos",
  //   icon: "ShoppingCart",
  //   submenu: [
  //     { label: "Pedidos recientes", href: "recientes", icon: "ListOrdered" },
  //     { label: "Pedidos pendientes", href: "pendientes", icon: "Clock" },
  //     { label: "Pedidos completados", href: "completados", icon: "CheckCircle2" }
  //   ]
  // },
  /* {
    label: "Contactos",
    href: "contactos",
    icon: "Phone",
  },
  {
    label: "Nosotros",
    href: "nosotros",
    icon: "Info",
*/
