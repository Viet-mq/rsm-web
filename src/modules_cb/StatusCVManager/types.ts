export interface StatusCVEntity {
  id: string,
  name: string,
  isDragDisabled: boolean
}

export interface CreateStatusCVRequest {
  name: string,
  statusCVS?: StatusCVEntity[]
}

export interface UpdateStatusCVRequest {
  id: string,
  name: string,
}

export interface DeleteStatusCVRequest {
  id: string,
}

