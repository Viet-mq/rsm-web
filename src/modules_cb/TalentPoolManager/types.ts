export interface TalentPoolEntity{
  id: string,
  name: string,
  description: string,
  numberOfProfile: number,
  managers: string[],
  total:number
}

export interface CreateTalentPoolRequest{
  description:string,
  managers: string[],
  name: string
}

export interface UpdateTalentPoolRequest{
  description: string,
  id: string,
  managers: string[],
  name: string,
  numberOfProfile: number
}

export interface DeleteTalentPoolRequest{
  id: string,
}

