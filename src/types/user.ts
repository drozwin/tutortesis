// types/user.ts
export type CreateUserPayload = {
    username: string;
    name: string;
    apellidos: string;
    email: string;
    role: string;
    phone?: string;
    city?: string;
    specialty?: string;
    experience?: string;
    additional_info?: string;
  };
  
  export type CreateUserResponse = {
    message: string;
  };