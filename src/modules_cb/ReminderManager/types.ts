
export interface ReminderEntity {
  title:string
  start:number
  end:number
  desc:string
  id: string,
}

export interface ReminderConvertEntity {
  title:string
  start:Date
  end:Date
  desc:string
  id: string,
}

export interface CreateReminderRequest {
  title:string
  start:number
  end:number
  desc:string
}

export interface UpdateReminderRequest {
  title:string
  start:number
  end:number
  desc:string
  id?: string,
}

export interface DeleteReminderRequest {
  id?: string,
}

export interface TimeReminder{
  start:number,
  end:number,
}

