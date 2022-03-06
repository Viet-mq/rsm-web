export interface DepartmentReportEntity {
  recruitmentName: string,
  sources: any
}

export interface Source{
  sourceCVName: string,
  count: number
}

export interface RecruitmentActivitiesReportEntity {
  fullName: string,
  createBy: string,
  recruitmentTotal: number,
  noteTotal: number,
  status: StatusCV[]
}

export interface StatusCV{
  statusCVName: string,
  count: number
}

export interface RecruitmentEfficiencyReportEntity {
  recruitmentName: string,
  createBy: string,
  status: StatusCV[]
}

export interface RecruitmentResultReportEntity {
  recruitmentName: string,
  needToRecruit: number,
  recruited: number,
  percent: string
}


export interface RejectReportEntity {
  sheet: string,
  reasons: Reason[],
  total: number
}

export interface Reason{
  reason: string,
  count: number,
  percent: string
}



