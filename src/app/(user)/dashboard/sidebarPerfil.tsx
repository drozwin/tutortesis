"use client";
import { useEffect, useState, useRef } from "react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { type MenuItem, menuData } from "./menuItemsPerfilSidebar";
import { useDashboard } from "@/hooks/useDashboard";
import { useLogout } from "./components/logout";
import { ConfirmDialog } from "./components/ConfirmDialog";

export const SidebarPerfil = ({
  onSelectSection,
}: {
  onSelectSection: (section: string) => void;
}) => {
  const { handleLogout } = useLogout();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    const saved = localStorage.getItem("sidebar-expanded");
    return saved ? saved === "true" : false; // si existe, lo usa; si no, arranca en false
  });
  const [MainMeniMovil, SetMainMeniMovil] = useState<boolean>(() => {
    const saved = localStorage.getItem("mainmenu-movil");
    return saved ? saved === "true" : false;
  });
  const menuRef = useRef<HTMLDivElement | null>(null);
  //dashboard
  const { data, isLoading } = useDashboard();
  const userPermissions = data?.permissions ?? [];

  // Filtrado de menú según permisos
  const [filteredMenu, setFilteredMenu] = useState<MenuItem[] | null>(null);

  useEffect(() => {
    if (!data) return;

    const filtered = menuData
      .map((item) => {
        if (
          item.permissions &&
          !item.permissions.some((p) => userPermissions.includes(p))
        )
          return null;

        if (item.submenu) {
          const filteredSub = item.submenu.filter(
            (sub) =>
              !sub.permissions ||
              sub.permissions.some((p) => userPermissions.includes(p)),
          );
          if (filteredSub.length === 0) return null;
          return { ...item, submenu: filteredSub };
        }

        return item;
      })
      .filter(Boolean) as MenuItem[];

    setFilteredMenu(filtered);
  }, [data]);
  //

  useEffect(() => {
    setMenuItems(menuData);

    const savedActiveMenu = localStorage.getItem("sidebar-activeMenu");
    const savedActiveSection = localStorage.getItem("sidebar-activeSection");

    if (savedActiveMenu) setActiveMenu(savedActiveMenu);
    if (savedActiveSection) setActiveSection(savedActiveSection);
  }, []);

  useEffect(() => {
    localStorage.setItem("mainmenu-movil", String(MainMeniMovil));
  }, [MainMeniMovil]);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", String(isExpanded));
  }, [isExpanded]);

  useEffect(() => {
    if (activeMenu) {
      localStorage.setItem("sidebar-activeMenu", activeMenu);
    } else {
      localStorage.removeItem("sidebar-activeMenu");
    }
  }, [activeMenu]);

  useEffect(() => {
    if (activeSection) {
      localStorage.setItem("sidebar-activeSection", activeSection);
    }
  }, [activeSection]);

  // cerrar submenu al click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // renderizar íconos
  const renderIcon = (iconName?: string, isActive?: boolean) => {
    const IconComponent = iconName
      ? (Icons[iconName as keyof typeof Icons] as LucideIcon)
      : null;

    return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
  };
  if (isLoading || !data) {
    return null; // o un skeleton/placeholder si quieres
  }
  return (
    <>
      <aside
        ref={menuRef}
        className={`fixed py-16 mt-8   h-full  z-50  
      `}
      >
        {/* Menu principal */}
        <div className=" justify-center ">
          <button
            onClick={() => {
              SetMainMeniMovil(!MainMeniMovil);
              setIsExpanded(false);
            }}
            className={`absolute top-24 w-10 h-12 ${MainMeniMovil ? "left-16" : "left-0"} bg-white   dark:bg-zinc-950 shadow shadow-black/50  rounded-e-lg flex items-center justify-center ${isExpanded ? "left-62 ml-2" : "left-0"}`}
          >
            {MainMeniMovil ? (
              <Icons.SquareChevronLeft className="w-8 h-8 text-zinc-700 dark:text-zinc-300" />
            ) : (
              <Icons.SquareChevronRight className="w-8 h-8 text-zinc-700 dark:text-zinc-300" />
            )}
          </button>
        </div>
        <div
          className={`flex flex-col  justify-between shadow-lg  shadow-black bg-white dark:bg-zinc-950 backdrop-blur-lg rounded-[32px] h-full z-40 ${isExpanded ? "w-64" : "w-16"} ${!MainMeniMovil ? "hidden" : "block"} `}
        >
          {/* Header */}
          <div
            className={
              !isExpanded
                ? "h-16 flex items-center justify-center px-3 "
                : "h-16 justify-between flex items-center px-3"
            }
          >
            {isExpanded && (
              <h1 className="text-lg ml-3 font-bold text-zinc-900 dark:text-red-600">
                Perfil
              </h1>
            )}
            <button onClick={() => setIsExpanded(!isExpanded)}>
              <Icons.Menu className="w-7 h-7 text-zinc-700  dark:text-zinc-300" />
            </button>
          </div>
          {/* menu */}
          <div className="padre h-full ">
            <div className=" overflow-auto">
              <div className="absolute">
                <div
                  className={`flex flex-col  ${isExpanded ? "w-64" : "w-64"} transition-all duration-200  gap-2 `}
                >
                  {filteredMenu?.map((item) => {
                    const isMenuActive = activeMenu === item.label;
                    const isSectionActive = activeSection === item.href;

                    return (
                      <div
                        key={item.label}
                        className={
                          isExpanded ? "relative  px-2" : "relative w-12 px-2"
                        }
                      >
                        <button
                          onClick={() => {
                            if (item.submenu) {
                              //SI EL MENI TIENE su menus abrir o exapandir
                              setIsExpanded(true);
                              // setActiveSection(item.href);
                              // onSelectSection(item.href);
                              setActiveMenu(item.label);
                              // toggle submenu solo si está expandido
                              if (isExpanded) {
                                setActiveMenu(isMenuActive ? null : item.label);
                              }
                            } else {
                              setActiveSection(item.href);
                              onSelectSection(item.href);
                              setActiveMenu(null);
                            }
                          }}
                          className={`duration-700 items-center flex gap-2 transition-colors  ${
                            isSectionActive
                              ? "bg-zinc-200 shadow-inner text-red-600 shadow-black dark:bg-zinc-800"
                              : "hover:bg-zinc-100  dark:hover:bg-zinc-800"
                          }
                    ${
                      isExpanded
                        ? "rounded-full h-12 w-full px-3"
                        : " w-12 h-12 rounded-full text-center flex justify-center "
                    }
                    
                    `}
                        >
                          {renderIcon(item.icon, isSectionActive)}
                          {isExpanded && (
                            <span className="text-sm font-medium">
                              {item.label}
                            </span>
                          )}
                          {item.submenu && isExpanded && (
                            <Icons.ChevronDown
                              className={`ml-auto w-5 h-5 transition-transform ${
                                isMenuActive ? "rotate-180" : ""
                              }`}
                            />
                          )}
                        </button>

                        {/* Submenu (solo visible si sidebar expandido) */}
                        {item.submenu && isExpanded && (
                          <div
                            className={`overflow-hidden transition-all duration-300 ${
                              isMenuActive
                                ? "max-h-96 opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="ml-9 mt-1 flex flex-col gap-1">
                              {item.submenu.map((sub) => {
                                const isSubActive = activeSection === sub.href;
                                return (
                                  <button
                                    key={sub.label}
                                    onClick={() => {
                                      setActiveSection(sub.href);
                                      onSelectSection(sub.href);
                                    }}
                                    className={`flex items-center gap-2 px-2 py-1 text-sm rounded-full transition-colors ${
                                      isSubActive
                                        ? "bg-zinc-200 shadow-inner text-red-600 shadow-black dark:bg-zinc-800"
                                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                                    }`}
                                  >
                                    {renderIcon(sub.icon, isSubActive)}
                                    {sub.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Contenido user */}
          <div className="flex p-2">
            <ConfirmDialog
              trigger={
                <button
                  type="button"
                  className="h-12 px-3 cursor-pointer text-red-800 flex items-center w-full rounded-full hover:text-red-600 hover:bg-black/40 transition-all font-medium text-sm"
                >
                  <span>{renderIcon("CirclePower")}</span>
                  <span className={`ml-4 ${isExpanded ? "block" : "hidden"}`}>
                    CERRAR SESSIÓN
                  </span>
                </button>
              }
              onConfirm={handleLogout}
              title="¿Cerrar sesión?"
              description="Se cerrará tu sesión en este dispositivo."
            />
          </div>
        </div>
      </aside>
    </>
  );
};
