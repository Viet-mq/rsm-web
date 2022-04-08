import {CreateCompanyRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateCompanyAction {
  type: string,
  request?: CreateCompanyRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_COMPANY = "CREATE_COMPANY";
export const CREATE_COMPANY_SUCCESS = "CREATE_COMPANY_SUCCESS";
export const CREATE_COMPANY_ERROR = "CREATE_COMPANY_ERROR";

export const createCompany = (request: CreateCompanyRequest): CreateCompanyAction => ({
  type: CREATE_COMPANY,
  request
});

export const createCompanySuccess = (response: ResponseBase2): CreateCompanyAction => ({
  type: CREATE_COMPANY_SUCCESS,
  response
});

export const createCompanyError = (error: AppError): CreateCompanyAction => ({
  type: CREATE_COMPANY_ERROR,

  error
});
