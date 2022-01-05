export interface RecruitmentEntity {
  id: string,
  title: string,
  jobId: string,
  jobName: string,
  address: string,
  typeOfJob: string,
  quantity: number,
  jobDescription: string,
  requirementOfJob: string,
  deadLine: number,
  talentPoolId: string,
  talentPoolName: string,
  interviewer: [],
  interviewProcess: InterviewProcess[],
  interest: string,
  createAt: string,
  createBy: string,
  detailOfSalary: string,
  from: number,
  to: number,
  status: string,
}

export interface InterviewProcess {
  id: string,
  name: string,
  total?: string,
}
export interface InterviewProcessResponse {
  code: 0,
  id: string,
  isDragDisabled: boolean,
  message: string,
  name: string
}

export interface CreateRecruitmentRequest {
  address?: string,
  deadLine?: number,
  interviewProcess?: InterviewProcess[],
  interviewer?: [],
  job?: string,
  quantity?: number,
  talentPool?: string,
  title?: string,
  typeOfJob?: string
  detailOfSalary?: string,
  from?: number,
  to?: number,
  requirementOfJob?: string,
  jobDescription?: string,
  interest?: string,

}

export interface UpdateRecruitmentRequest {
  address: string,
  deadLine: number,
  id: string,
  interest: string,
  interviewProcess: InterviewProcess[],
  interviewer: null,
  job: string,
  jobDescription: string,
  quantity: number,
  requirementOfJob: string,
  salary: string,
  talentPool: string,
  title: string,
  typeOfJob: string
}


export interface DeleteRecruitmentRequest {
  id: string,
}

