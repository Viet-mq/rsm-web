import {AppError} from "../../../../../models/baseResponse";
import {ProfileEntity} from "../../../../ProfileManager/types";


export interface GetCandidatesAction {
  type: string,
  params?: any,
  rows?: ProfileEntity[],
  total?: number,
  error?: AppError
}

export const GET_CANDIDATES = "GET_CANDIDATES";
export const RESET_CANDIDATES = "RESET_CANDIDATES";
export const GET_CANDIDATES_SUCCESS = "GET_CANDIDATES_SUCCESS";
export const GET_CANDIDATES_ERROR = "GET_CANDIDATES_ERROR";

export const getCandidates = (params?:any) : GetCandidatesAction =>({
  type:GET_CANDIDATES,
  params,
})

export const resetCandidates = () : GetCandidatesAction =>({
  type:RESET_CANDIDATES,
})

export const getCandidatesSuccess = (total: number, rows: ProfileEntity[]) =>({
  type:GET_CANDIDATES_SUCCESS,
  total,
  rows
})

export const getCandidatesError =( error:AppError): GetCandidatesAction=>({
  type:GET_CANDIDATES_ERROR,
  error
})
