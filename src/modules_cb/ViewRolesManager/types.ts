export interface ActionEntity {
  id: string,
  title: string,
  key: string
}

export interface PermissionsEntity {
  id: string,
  title: string,
  icon: string,
  path: string,
  index: number,
  actions: ActionEntity[]
}

export interface ViewRolesEntity {
  id: string,
  name: string,
  description: string,
  permissions:PermissionsEntity[]
}

export interface PermissionsRequest {
  permission_id: string,
  actions: string[]
}

export interface CreateViewRolesRequest {
  description: string,
  name: string,
  permissions: PermissionsRequest[]
}

export interface UpdateViewRolesRequest {
  description: string,
  id: string,
  name: string,
  permissions: PermissionsRequest[]
}

export interface DeleteViewRolesRequest {
  id: string,
}

