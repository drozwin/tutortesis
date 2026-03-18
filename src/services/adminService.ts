import { apiClient } from "@/lib/fetch"
import { RolesPermissionsResponse } from "@/types/admin"

export function getRolesPermissions() {
  return apiClient<RolesPermissionsResponse>("/admin/roles-permissions", {
    method: "GET",
  })
}
export function addPermissionToRole(data:any) {
  return apiClient("/admin/add-permission", {
    method: "POST",
    body: JSON.stringify(data)
  })
}

export function removePermissionFromRole(data:any) {
  return apiClient("/admin/remove-permission", {
    method: "POST",
    body: JSON.stringify(data)
  })
}

export function changeUserRole(data:any) {
  return apiClient("/admin/user/change-role", {
    method: "POST",
    body: JSON.stringify(data)
  })
}

export function createUser(data:any) {
  return apiClient("/admin/user/create", {
    method: "POST",
    body: JSON.stringify(data)
  })
}