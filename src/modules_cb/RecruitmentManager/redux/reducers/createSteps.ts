import {CreateRecruitmentRequest} from "../../types";
import * as Actions from "../actions";
import {CreateStepsAction} from "../actions";


export interface CreateStepsState {
  request?: CreateRecruitmentRequest,
  isValidate?: boolean,
}

const initState: CreateStepsState = {
  isValidate: false,
}

export default (state = initState, {type, request, isValidate}: CreateStepsAction): CreateStepsState => {
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

    default:
      return state;
  }
}
