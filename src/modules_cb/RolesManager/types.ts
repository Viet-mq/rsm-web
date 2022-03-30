export interface RolesRequest {
  id: string,
  name: string,
  description: string,
}

export interface RolesEntity {
  id: string,
  name: string,
  description: string,
  view_roles: RolesRequest[],
  api_roles: RolesRequest[],
}

export interface CreateRolesRequest {
  api_roles: string[],
  description: string,
  name: string,
  view_roles: string[]
}

export interface UpdateRolesRequest {
  api_roles: string[],
  description: string,
  id: string,
  name: string,
  view_roles: string[]
}

export interface DeleteRolesRequest {
  id: string,
}

