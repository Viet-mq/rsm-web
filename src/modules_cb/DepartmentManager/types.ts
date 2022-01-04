export interface DepartmentEntity {
  id:string,
  name:string,
  idCompany:string,
  children:ChildrenDepartment[]|any,

}
export interface ChildrenDepartment{
  id:string,
  name:string,
  children:ChildrenDepartment[]
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

