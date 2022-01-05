import {CreateRecruitmentRequest} from "../../types";
import * as Actions from "../actions";
import {CreateStepsAction} from "../actions";


export interface CreateStepsState {
  request?: CreateRecruitmentRequest|any,
  isValidate?: boolean,
  idRecruitmentEdit?:string

}

const initState: CreateStepsState = {
  isValidate: false,
  request: undefined,
}

export default (state = initState, {type, request, isValidate,idRecruitmentEdit}: CreateStepsAction): CreateStepsState => {
  switch (type) {
    case Actions.CREATE_STEPS:
      return {
        ...state,
        request,
        idRecruitmentEdit
      }

    case Actions.RESET_CREATE_STEPS:
      return {
        ...initState
      }

    case Actions.CHECK_INFORMATION_VALIDATE:
      return {
        ...state,
        isValidate,
      }

    default:
      return state;
  }
}
