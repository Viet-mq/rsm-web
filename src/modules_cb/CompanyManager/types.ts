export interface CompanyEntity {
  id: string,
  name: string,
  children: CompanyEntity[] | any,
}

export interface CreateCompanyRequest {
  name: string,
  idParent?: string,
}

export interface UpdateCompanyRequest {
  id: string,
  name: string
}

export interface DeleteCompanyRequest {
  id: string,
}

