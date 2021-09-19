export interface SchoolEntity {
  id:string,
  name:string,
  page:number,
  size:number,
}

export interface CreateSchoolRequest {
  name: string,
}

export interface UpdateSchoolRequest {
  id: string,
  name: string,
}

export interface DeleteSchoolRequest {
  id: string,
}

