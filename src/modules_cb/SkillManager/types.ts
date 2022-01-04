export interface SkillEntity {
  id: string,
  name: string,
}

export interface CreateSkillRequest {
  name: string
}

export interface UpdateSkillRequest {
  id: string,
  name: string,
}

export interface DeleteSkillRequest {
  id: string,
}

