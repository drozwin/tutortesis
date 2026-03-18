import { useQuery } from "@tanstack/react-query"
import { getRolesPermissions } from "@/services/adminService"
import { RolesPermissionsResponse } from "@/types/admin"

export function useRolesPermissions() {
  return useQuery<RolesPermissionsResponse>({
    queryKey: ["roles-permissions"],
    queryFn: getRolesPermissions,
    staleTime: 1000 * 60 * 30,
  })
}