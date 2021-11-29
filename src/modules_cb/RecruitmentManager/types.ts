export interface RecruitmentEntity {
  id: string,
  title: string,
  jobId: string,
  jobName:string,
  address:string,
  typeOfJob:string,
  quantity: number,
  detailOfSalary:string,
  jobDescription: string,
  requirementOfJob:string,
  deadLine: number,
  talentPoolId:string,
  talentPoolName:string,
  interviewer: null,
  interviewProcess:InterviewProcess[]
}

export interface InterviewProcess {
  id: string,
  name: string
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

