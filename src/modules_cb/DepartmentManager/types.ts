export interface DepartmentEntity {
  id:string,
  name:string,
  page:number,
  size:number,
}

export interface CreateDepartmentRequest {
  name: string,
}

export interface UpdateDepartmentRequest {
  id: string,
  name: string,
}

export interface DeleteDepartmentRequest {
  id: string,
}

