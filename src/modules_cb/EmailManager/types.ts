export interface JobEntity {
  id:string,
  name:string,
  page:number,
  size:number,
}

export interface CreateJobRequest {
  name: string,
}

export interface UpdateJobRequest {
  id: string,
  name: string,
}

export interface DeleteJobRequest {
  id: string,
}

