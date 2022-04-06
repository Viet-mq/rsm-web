export interface UserAccount {
  username: string,
  fullName: string,
  dateOfBirth: string,
  role: number,
  roles: string[],
  status: number,
  createAt: number,
  updateAt: number,
  lastChangePasswordAt: number,
  createBy: string,
  updateBy: string,
  email:string,
}

export interface CreateAccountRequest {
  username: string,
  password: string,
  fullName: string,
  roles: string[],
  email:string,
  dateOfBirth: string,
  organizations: string[],

}

export interface UpdateAccountRequest {
  dateOfBirth: string,
  email: string,
  fullName: string,
  organizations: string[],
  roles: string[],
  username: string

}

export interface DeleteAccountRequest {
  username: string,
}

export interface ChangePasswordAccRequest {
  username: string,
  newPassword: string,
  oldPassword: string,
}
