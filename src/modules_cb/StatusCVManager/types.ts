export interface StatusCVEntity {
  id:string,
  name:string,
  page:number,
  size:number,
}

export interface CreateStatusCVRequest {
  name: string,
}

export interface UpdateStatusCVRequest {
  id: string,
  name: string,
}

export interface DeleteStatusCVRequest {
  id: string,
}

