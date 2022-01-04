import {UpdateRecruitmentRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {UpdateRecruitmentAction} from "../actions";

export interface UpdateRecruitmentState {
  loading: boolean,
  request?: UpdateRecruitmentRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateRecruitmentState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateRecruitmentAction): UpdateRecruitmentState => {
  switch (type) {
    case Actions.UPDATE_RECRUITMENT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_RECRUITMENT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_RECRUITMENT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
