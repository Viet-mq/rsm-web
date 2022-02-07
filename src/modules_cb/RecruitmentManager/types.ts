 export interface RecruitmentEntity {
  id: string,
  title: string,
  jobId: string,
  jobName: string,
  addressId: string,
  addressName: string,
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
  salaryDescription:string,
  status: string,

}

export interface InterviewProcess {
  id: string,
  name: string,
  total?: string,
  isDragDisabled?:boolean,
  isNew:boolean,
}
export interface InterviewProcessResponse {
  code: number,
  id: string,
  isDragDisabled: boolean,
  message: string,
  name: string,
  isNew:boolean,

}

export interface CreateRecruitmentRequest {
  address: string,
  deadLine: number,
  interviewProcess: InterviewProcess[],
  interviewer: [],
  job: string,
  quantity: number,
  talentPool: string,
  title: string,
  typeOfJob: string
  detailOfSalary: string,
  from: number,
  salaryDescription:string,
  to: number,
  requirementOfJob: string,
  jobDescription: string,
  interest: string,

}

export interface UpdateRecruitmentRequest {
  id?: string,
  address?: string,
  deadLine?: number,
  interviewProcess?: InterviewProcess[],
  interviewer?: []|any,
  job?: string,
  quantity?: number,
  talentPool?: string,
  title?: string,
  typeOfJob?: string
  detailOfSalary?: string,
  from?: number,
  to?: number,
  salaryDescription?:string
  requirementOfJob?: string,
  jobDescription?: string,
  interest?: string,


}


export interface DeleteRecruitmentRequest {
  id: string,
}

export interface DeleteProcessRequest {
  recruitmentId?: string,
  statusCVId: string
}

