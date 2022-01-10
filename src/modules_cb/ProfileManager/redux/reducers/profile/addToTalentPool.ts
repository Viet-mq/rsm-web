import {AddToTalentPoolRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {AddToTalentPoolAction} from "../../actions";

export interface AddToTalentPoolState {
  loading: boolean,
  request?: AddToTalentPoolRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: AddToTalentPoolState = {
  loading: false
}

export default (state = initState, {
  type,
  request,
  response,
  error
}: AddToTalentPoolAction): AddToTalentPoolState => {
  switch (type) {
    case Actions.ADD_TO_TALENT_POOL:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.ADD_TO_TALENT_POOL_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.ADD_TO_TALENT_POOL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
