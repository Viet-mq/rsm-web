import {CreateRecruitmentRequest} from "../../types";

export interface CreateStepsAction {
  type: string,
  request?: CreateRecruitmentRequest,
  isValidate?:boolean,

}

export const CREATE_STEPS = "CREATE_STEPS";
export const CHECK_INFORMATION_VALIDATE = "CHECK_INFORMATION_VALIDATE";
export const TRIGGER_CHECK_INFORMATION = "TRIGGER_CHECK_INFORMATION";


export const createSteps = (request: CreateRecruitmentRequest): CreateStepsAction => ({
  type: CREATE_STEPS,
  request,
});

export const checkInformationValidate = (isValidate?:boolean): CreateStepsAction => ({
  type: CHECK_INFORMATION_VALIDATE,
  isValidate
});

export const triggerCheckInformation = (): CreateStepsAction => ({
  type: TRIGGER_CHECK_INFORMATION,
});
