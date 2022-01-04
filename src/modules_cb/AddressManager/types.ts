export interface AddressEntity {
  id: string,
  officeName: string,
  name: string
}

export interface CreateAddressRequest {
  name: string,
  officeName: string
}

export interface UpdateAddressRequest {
  id: string,
  name: string,
  officeName: string
}

export interface DeleteAddressRequest {
  id: string,
}

