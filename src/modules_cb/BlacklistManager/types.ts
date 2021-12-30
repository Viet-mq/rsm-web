export interface BlacklistEntity {
  id:string,
  email: string,
  name: string,
  phoneNumber: string,
  reason: string,
  ssn: string
}

export interface CreateBlacklistRequest {
  email: string,
  name: string,
  phoneNumber: string,
  reason: string,
}

export interface UpdateBlacklistRequest {
  email: string,
  id: string,
  name: string,
  phoneNumber: string,
  reason: string,
  ssn: string
}

export interface DeleteBlacklistRequest {
  id: string,
}

