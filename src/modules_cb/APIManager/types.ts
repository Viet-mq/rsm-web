export interface ApiEntity {
  id: string,
  path: string,
  method: string,
  name: string,
}

export interface UpdateApiRequest {
  id?: string,
  name: string
  method: string,
  path: string
}

export interface CreateApiRequest {
  path: string,
  method: string,
  name: string,
}

export interface DeleteApiRequest {
  id: string
}
