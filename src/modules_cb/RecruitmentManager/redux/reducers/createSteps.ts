import {CreateRecruitmentRequest} from "../../types";
import * as Actions from "../actions";
import {CHECK_INFORMATION_VALIDATE, CreateStepsAction, TRIGGER_CHECK_INFORMATION} from "../actions";


export interface CreateStepsState {
  request?: CreateRecruitmentRequest,
  isValidate?:boolean,
  trigger:boolean
}

const initState: CreateStepsState = {
  isValidate:false,
  trigger:false
}

export default (state = initState, {type, request,isValidate}: CreateStepsAction): CreateStepsState => {
  switch (type) {
    case Actions.CREATE_STEPS:
      return {
        ...state,
        request,
      }

    case Actions.CHECK_INFORMATION_VALIDATE:
      return {
        ...state,
        isValidate,
      }

  case Actions.TRIGGER_CHECK_INFORMATION:
    let trigger=!state.trigger
      return {
        ...state,
        trigger:trigger,
      }

    default:
      return state;
  }
}
