export interface ProfileEntity {
  id:string,
  cv: string,
  cvType: string,
  dateOfApply: string,
  dateOfBirth: string,
  email: string,
  fullName: string,
  hometown: string,
  hrRef: string,
  job: string,
  levelJob: string,
  phonenumber: string,
  school: string,
  sourceCV: string,

}

export interface CreateProfileRequest {
  cv: string,
  cvType: string,
  dateOfApply: string,
  dateOfBirth: string,
  email: string,
  fullName: string,
  hometown: string,
  hrRef: string,
  job: string,
  levelJob: string,
  phonenumber: string,
  school: string,
  sourceCV: string,
}

export interface UpdateProfileRequest {
  id:string,
  cv: string,
  cvType: string,
  dateOfApply: string,
  dateOfBirth: string,
  email: string,
  fullName: string,
  hometown: string,
  hrRef: string,
  job: string,
  levelJob: string,
  phonenumber: string,
  school: string,
  sourceCV: string,
}

export interface DeleteProfileRequest {
  id:string,
}
