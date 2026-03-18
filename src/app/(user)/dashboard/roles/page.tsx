"use client";

import React, { useState } from "react";
import { useRolesPermissions } from "@/hooks/useRoles";
import { addPermissionToRole, removePermissionFromRole } from "@/services/adminService";
import { ChevronDown, Shield, Activity, Cpu } from "lucide-react";

export default function RolesManager() {
  const { data, isLoading, refetch } = useRolesPermissions();
  const [expandedRole, setExpandedRole] = useState<string | null>(null);
  const [syncing, setSyncing] = useState<string | null>(null);

  if (isLoading) return <LoadingScreen />;

  const roles = data?.roles ?? [];
  const allAvailablePermissions = data?.permissions ?? [];

  async function handleToggle(roleName: string, permName: string, currentlyEnabled: boolean) {
    const actionId = `${roleName}-${permName}`;
    setSyncing(actionId);

    try {
      if (currentlyEnabled) {
        await removePermissionFromRole({ role: roleName, permission: permName });
      } else {
        await addPermissionToRole({ role: roleName, permission: permName });
      }
      await refetch();
    } catch (err) {
      console.error("Critical System Error", err);
    } finally {
      setSyncing(null);
    }
  }

  return (
    <div className="min-h-screen bg-black/10 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-l-4 border-red-500 pl-4 bg-red-600/10 py-2">
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">Roles_y_sus_permisos</h1>
            <p className="text-[12px] text-red-600 font-mono uppercase">activo según los roles</p>
          </div>
          <Cpu className="text-red-600 animate-pulse mr-3" />
        </div>

        <div className="grid gap-3">
          {roles.map((role: any) => {
            const isOpen = expandedRole === role.name;
            
            return (
              <div key={role.id} className={`border ${isOpen ? 'border-red-700/40' : 'border-white/5 bg-[#0d0d0f]/10'} rounded-sm transition-all overflow-hidden`}>
                <button 
                  onClick={() => setExpandedRole(isOpen ? null : role.name)}
                  className="w-full flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-4">
                    <Shield className={isOpen ? "text-red-600" : "text-slate-600"} size={20} />
                    <div className="text-left">
                      <span className="font-bold tracking-widest text-md uppercase block">{role.name}</span>
                      <span className="text-[12px] font-mono text-slate-500 uppercase italic">
                        {role.permissions?.length || 0} Persmisos activos en total
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-red-600" : ""}`} size={16} />
                </button>

                {isOpen && (
                  <div className="p-4  border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-1">
                    {allAvailablePermissions.map((perm:any) => {
                      // LÓGICA PARA ESTRUCTURA DE OBJETOS:
                      // Buscamos si el ID o el NAME del permiso actual existe dentro del array de objetos del rol
                      const isEnabled = role.permissions?.some((p:any) => p.name === perm.name);
                      const isSyncing = syncing === `${role.name}-${perm.name}`;

                      return (
                        <div key={perm.id} className={`flex items-center justify-between p-3 border transition-colors ${isEnabled ? 'bg-green-500/5 border-green-500/20' : 'bg-white/2 border-white/5'}`}>
                          <div className="flex flex-col">
                            <span className={`text-[10px] font-mono ${isEnabled ? 'text-green-500' : 'text-slate-500'}`}>
                              {perm.name.toUpperCase()}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => handleToggle(role.name, perm.name, isEnabled)}
                            disabled={isSyncing}
                            className={`relative inline-flex h-5 w-10 items-center rounded-full transition-all ${
                              isEnabled ? "bg-green-600 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : "bg-slate-800"
                            } ${isSyncing ? "opacity-30 cursor-wait" : "cursor-pointer"}`}
                          >
                            <span
                              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${
                                isEnabled ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <Activity className="text-green-500 animate-bounce" />
      <span className="text-green-500 font-mono text-[10px] tracking-[0.5em]">SYNCHRONIZING_DATA...</span>
    </div>
  );
}