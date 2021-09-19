 export interface SourceCVEntity {
  id:string,
  name:string,
  page:number,
  size:number,
}

export interface CreateSourceCVRequest {
  name: string,
}

export interface UpdateSourceCVRequest {
  id: string,
  name: string,
}

export interface DeleteSourceCVRequest {
  id: string,
}

