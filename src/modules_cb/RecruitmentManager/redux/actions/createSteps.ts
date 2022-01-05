import {CreateRecruitmentRequest} from "../../types";

export interface CreateStepsAction {
  type: string,
  request?: CreateRecruitmentRequest,
  isValidate?:boolean,
  idRecruitmentEdit?:string

}

export const CREATE_STEPS = "CREATE_STEPS";
export const RESET_CREATE_STEPS = "RESET_CREATE_STEPS";
export const CHECK_INFORMATION_VALIDATE = "CHECK_INFORMATION_VALIDATE";


export const createSteps = (request: CreateRecruitmentRequest,idRecruitmentEdit?:string): CreateStepsAction => ({
  type: CREATE_STEPS,
  request,
  idRecruitmentEdit
});

export const resetCreateSteps = (): CreateStepsAction => ({
  type: RESET_CREATE_STEPS,

});

export const checkInformationValidate = (isValidate?:boolean): CreateStepsAction => ({
  type: CHECK_INFORMATION_VALIDATE,
  isValidate
});

