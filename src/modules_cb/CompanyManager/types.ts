export interface DepartmentRequest {
  id: string
  name: string
}

export interface CompanyEntity {
  description: string,
  id: string,
  name: string,
  organizations: DepartmentRequest[]
}

export interface CreateCompanyRequest {
  description: string,
  name: string,
  organizations: string[]
}

export interface UpdateCompanyRequest {
  description: string,
  id: string,
  name: string,
  organizations: string[]
}

export interface DeleteCompanyRequest {
  id: string,
}

