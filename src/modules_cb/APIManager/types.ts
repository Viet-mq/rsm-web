export interface ApiRoleEntity {
  id: string,
  path: string,
  method: string,
  name: string,
}

export interface UpdateApiRoleRequest {
  id: string,
  name: string
}

export interface CreateApiRoleRequest {
  path: string,
  method: string,
  name: string,
}

export interface DeleteApiRoleRequest {
  id: string
}
