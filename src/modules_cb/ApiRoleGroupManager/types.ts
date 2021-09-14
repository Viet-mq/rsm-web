import {ApiRoleEntity} from "../APIManager/types";

export interface ApiRoleGroupEntity {
  id: string,
  name: string,
  createAt: number,
  updateAt: number,
  roles: ApiRoleEntity[]
}

export interface CreateRoleGroupRequest {
  name: string,
  roles: ApiRoleEntity[]
}

export interface UpdateRoleGroupRequest {
  id: string,
  name: string,
  roles: ApiRoleEntity[]
}

export interface DeleteRoleGroupRequest {
  id: string,
}

export interface AssignApiRoleRequest {
  groupApiId: string,
  username: string,
}

export interface RevokeApiRoleRequest {
  groupApiId: string,
  username: string,
}
