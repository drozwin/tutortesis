"use client";

import { useState, useEffect } from "react";
import { useRolesPermissions } from "@/hooks/useRoles";
import { useCreateUser } from "@/hooks/useCreateUser";
import toast from "react-hot-toast";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Info, 
  ShieldCheck, 
  AlertCircle,
  Loader2,
  Send
} from "lucide-react";

// ✅ Componente Field fuera para evitar pérdida de foco
const Field = ({ label, name, value, onChange, fieldErrors, type = "text", placeholder, icon: Icon, isTextArea = false }: any) => {
  const hasError = fieldErrors[name];
  
  return (
    <div className="w-full group ">
      <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1.5 ml-1 block font-bold group-focus-within:text-red-500 transition-colors">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-3.5 text-slate-500 group-focus-within:text-red-500 transition-colors">
          {Icon && <Icon size={18} strokeWidth={1.5} />}
        </div>
        
        {isTextArea ? (
          <textarea
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className={`w-full bg-white/50 dark:bg-zinc-950/50 border ${hasError ? 'border-red-500' : 'border-zinc-800'} rounded-lg pl-10 pr-4 py-3 outline-none transition-all h-28 focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20`}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className={`w-full bg-white/50 dark:bg-zinc-950/50 border ${hasError ? 'border-red-500' : 'border-zinc-800'} rounded-lg pl-10 pr-4 py-3 outline-none transition-all focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20`}
          />
        )}
      </div>
      
      {hasError && (
        <div className="flex items-center gap-1 mt-1.5 ml-1 text-red-500">
          <AlertCircle size={12} />
          <span className="text-[9px] font-mono uppercase tracking-tighter">
            {fieldErrors[name]}
          </span>
        </div>
      )}
    </div>
  );
};

export const CreateUserForm = () => {
  const { data, isLoading } = useRolesPermissions();
  const { createUser, loading: isSubmitting, error, success, clearState } = useCreateUser();

  const [form, setForm] = useState({
    username: "", name: "", apellidos: "", email: "", role: "",
    phone: "", city: "", specialty: "", experience: "", additional_info: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (success) {
      toast.success(success);
      setForm({
        username: "", name: "", apellidos: "", email: "", role: "",
        phone: "", city: "", specialty: "", experience: "", additional_info: "",
      });
      setFieldErrors({});
    }
  }, [success]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const selectRole = (roleId: string) => {
    setForm(prev => ({ ...prev, role: roleId }));
    clearState();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    try {
      await createUser(form);
    } catch (err: any) {
      if (err.data?.errors) setFieldErrors(err.data.errors);
    }
  };

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center p-20 text-red-600 space-y-4">
      <Loader2 className="animate-spin" size={32} />
      <span className="font-mono text-xs tracking-[0.3em] uppercase">Sincronizando Base de Datos...</span>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-12">
      <header className="flex items-center justify-between mb-12 border-b border-zinc-900 pb-6">
        <div className="flex w-full justify-center">
          <h2 className="text-2xl font-light tracking-[0.2em]  uppercase">
            Panel de <span className="text-red-600 font-bold">Registro</span>
          </h2>
       
        </div>
        <ShieldCheck className="text-red-600/50" size={40} strokeWidth={1} />
      </header>

      {/* Selector de Rol Dinámico */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {["colaboradores", "estudiante", "docente"].map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => selectRole(id)}
            className={`px-8 py-2.5 rounded-lg border text-[10px] uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 ${
              form.role === id
                ? "bg-red-600 border-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)] scale-105"
                : "border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
            }`}
          >
            {id === "docente" && <Briefcase size={14} />}
            {id === "estudiante" && <GraduationCap size={14} />}
            {id === "colaboradores" && <User size={14} />}
            {id}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          {/* Bloque 01 */}
          <div className="space-y-5">
            <h3 className="text-[11px] font-mono text-red-500 tracking-widest flex items-center gap-2">
              <span className="w-8 h-px bg-red-500/30"></span> INFORMACIÓN GENERAL
            </h3>
            <Field label="Username" name="username" icon={User} value={form.username} onChange={handleChange} fieldErrors={fieldErrors} placeholder="usr_admin" />
            <div className="grid grid-cols-2 gap-4">
               <Field label="Nombre" name="name" value={form.name} onChange={handleChange} fieldErrors={fieldErrors} placeholder="Nombre" />
               <Field label="Apellidos" name="apellidos" value={form.apellidos} onChange={handleChange} fieldErrors={fieldErrors} placeholder="Apellidos" />
            </div>
            <Field label="Email" name="email" type="email" icon={Mail} value={form.email} onChange={handleChange} fieldErrors={fieldErrors} placeholder="admin@domain.com" />
          </div>

          {/* Bloque 02 */}
          <div className="space-y-5">
            <h3 className="text-[11px] font-mono text-red-500 tracking-widest flex items-center gap-2">
              <span className="w-8 h-px bg-red-500/30"></span> CONTACTOS
            </h3>
            <Field label="Teléfono" name="phone" icon={Phone} value={form.phone} onChange={handleChange} fieldErrors={fieldErrors} placeholder="+591 000..." />
            <Field label="Ciudad" name="city" icon={MapPin} value={form.city} onChange={handleChange} fieldErrors={fieldErrors} placeholder="Sede Central" />
            
            <div className="group">
              <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1.5 ml-1 block font-bold group-focus-within:text-red-500">
                Rol en Base de Datos
              </label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-3.5 text-slate-500" size={18} />
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className={`w-full dark:bg-zinc-950/70 bg-white/50  border ${fieldErrors.role ? 'border-red-500' : 'border-zinc-800'} rounded-lg pl-10 pr-4 py-3 outline-none appearance-none cursor-pointer focus:border-red-600/50`}
                >
                  <option value="">-- SELECCIONAR ACCESO --</option>
                  {data?.roles.slice(1).map((r: any) => (
                    <option key={r.id} value={r.name}>{r.name.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Campos Condicionales */}
        {form.role === "docente" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t  animate-in fade-in duration-500">
            <Field label="Especialidad" name="specialty" icon={Briefcase} value={form.specialty} onChange={handleChange} fieldErrors={fieldErrors} placeholder="Ingeniería / Medicina" />
            <Field label="Experiencia" name="experience" icon={Info} value={form.experience} onChange={handleChange} fieldErrors={fieldErrors} placeholder="Ej: 5 años" />
          </div>
        )}

        {(form.role === "docente" || form.role === "estudiante") && (
          <div className="pt-2 animate-in fade-in duration-500">
            <Field 
              label="Información Adicional" 
              name="additional_info" 
              icon={Info}
              value={form.additional_info} 
              onChange={handleChange} 
              fieldErrors={fieldErrors} 
              isTextArea 
              placeholder="Notas u observaciones del perfil..." 
            />
          </div>
        )}

        <div className="flex flex-col items-center gap-4 pt-10">
          <button
            disabled={isSubmitting || !form.role}
            className={`w-full border  dark:bg-zinc-900 max-w-md py-4 rounded-xl font-bold tracking-[0.4em] text-[11px] uppercase transition-all flex items-center justify-center gap-3 ${
              isSubmitting 
                ? "bg-zinc-900 text-zinc-600 cursor-not-allowed" 
                : " hover:bg-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] cursor-pointer active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Send size={16} />
            )}
            {isSubmitting ? "Sincronizando..." : "Ejecutar Registro"}
          </button>
          
          <p className="text-[10px] text-zinc-600 font-mono tracking-widest uppercase italic">
            * Se enviará una notificación con la contraseña generada al email.
          </p>
        </div>
      </form>
    </div>
  );
};