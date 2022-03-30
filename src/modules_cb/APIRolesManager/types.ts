export interface APIRolesEntity {
  apis: string[],
  description: string,
  name: string
  id: string,
}

export interface CreateAPIRolesRequest {
  apis: string[],
  description: string,
  name: string
}

export interface UpdateAPIRolesRequest {
  apis: string[],
  description: string,
  id: string,
  name: string
}

export interface DeleteAPIRolesRequest {
  id: string,
}

