export interface JobLevelEntity {
  id:string,
  name:string,
  page:number,
  size:number,
}

export interface CreateJobLevelRequest {
  name: string,
}

export interface UpdateJobLevelRequest {
  id: string,
  name: string,
}

export interface DeleteJobLevelRequest {
  id: string,
}

