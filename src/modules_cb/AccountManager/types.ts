export interface UserAccount {
  username: string,
  fullName: string,
  dateOfBirth: string,
  role: number,
  status: number,
  createAt: number,
  updateAt: number,
  lastChangePasswordAt: number,
  createBy: string,
  updateBy: string,
}

export interface CreateAccountRequest {
  username: string,
  password: string,
  fullName: string,
  role: number,
  dateOfBirth: string,
}

export interface UpdateAccountRequest {
  username: string,
  fullName: string,
  dateOfBirth: string,
}

export interface DeleteAccountRequest {
  username: string,
}

export interface ChangePasswordAccRequest {
  username: string,
  newPassword: string,
  oldPassword: string,
}
