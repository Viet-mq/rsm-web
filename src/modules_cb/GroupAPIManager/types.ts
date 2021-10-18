export interface APIEntity {
  id: string,
  method: string,
  name: string,
  path: string
}

export interface GroupAPIEntity {
  createAt: number,
  id: string,
  name: string,
  roles:APIEntity[],
  updateAt: number
}

export interface APIRequest {
  groupId: string,
  roleIds: string[]
}

export interface CreateGroupAPIRequest {
  name: string,
  roleIds: string[]
}

export interface UpdateGroupAPIRequest {
  id: string,
  name: string,
  roles: string[]
}

export interface AssignUserRequest {
  groupApiId: string[],
  username: string
}

export interface RevokeUserRequest {
  groupApiId: string,
  username: string
}


