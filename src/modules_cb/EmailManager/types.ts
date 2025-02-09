export interface DeleteEmailRequest {
  id: string,
}

export interface EmailEntity {
  id: string,
  name: string,
  subject:string,
  attachment:string ,
  content: string,
  type: string,
  create_at: number,
  create_by: string
}

export interface CreateEmailRequest {
  attachment?: string,
  content: string,
  name: string,
  subject: string,
  type: string
}

export interface UpdateEmailRequest {
  attachment?: string,
  content: string,
  id?: string,
  name: string,
  subject: string,
  type: string
}

export interface KeyPointEntity {
  id: string,
  description: string
}





