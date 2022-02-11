import {AppError} from "../../../../../models/baseResponse";
import {ProfileEntity} from "../../../../ProfileManager/types";


export interface SearchCandidatesAction {
  type: string,
  params?: any,
  rows?: ProfileEntity[],
  total?: number,
  error?: AppError
}

export const SEARCH_CANDIDATES = "SEARCH_CANDIDATES";
export const SEARCH_CANDIDATES_SUCCESS = "SEARCH_CANDIDATES_SUCCESS";
export const SEARCH_CANDIDATES_ERROR = "SEARCH_CANDIDATES_ERROR";

export const searchCandidates = (params?:any) : SearchCandidatesAction =>({
  type:SEARCH_CANDIDATES,
  params,
})

export const searchCandidatesSuccess = (total: number, rows: ProfileEntity[]) =>({
  type:SEARCH_CANDIDATES_SUCCESS,
  total,
  rows
})

export const searchCandidatesError =( error:AppError): SearchCandidatesAction=>({
  type:SEARCH_CANDIDATES_ERROR,
  error
})
