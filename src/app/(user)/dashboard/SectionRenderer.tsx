"use client";

import { Home } from "./Home";
import { Chat } from "./components/comunicacion/Chat";
import { Email } from "./components/comunicacion/Email";
import { RolesManager } from "./components/roles/Roles";
import { AdminUsersTable } from "./components/users/showUsers";
import { CreateUserForm } from "./components/users/createUser";
import { CursosLive } from "./components/cursos/CursosLive";
import { ProductForm } from "./components/cursos/cursos";
import { MyCourses } from "./components/Mycourses/MyCourses";
import { Categorias } from "./components/categorias/Categorias";
import { AdminPaymentsTable } from "./components/pagos/AdminPaymentsTable";

type Props = {
  section: string;
};
// {
//   label: "Aprobar pagos",
//   href: "payments/approve",
//   icon: "Check",
//   permissions: ["aprobar_pagos"],
// },
export function SectionRenderer({ section }: Props) {
  switch (section) {
    case "home":
      return <Home />;
    case "users/show":
      return <AdminUsersTable />;
    case "users/create":
      return <CreateUserForm />;
    case "support":
      return <Chat />;
    case "email":
      return <Email />;
    case "users/roles":
      return <RolesManager />;
    case "courses/live":
      return <CursosLive />;
    case "payments/approve":
      return <AdminPaymentsTable />;
    case "courses/create":
      return <ProductForm />;
    case "purchases/view":
      return <MyCourses />;
    case "courses/categories":
      return <Categorias />;
    default:
      return <Home />;
  }
}
