export interface Role {
  name: string
  permissions: string[]
  
}

export interface RolesPermissionsResponse {
  id: number
  roles: Role[]
  permissions: string[]
  mutate: string
}