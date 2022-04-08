import {UpdateCompanyRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateCompanyAction {
  type: string,
  request?: UpdateCompanyRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_COMPANY = "UPDATE_COMPANY";
export const UPDATE_COMPANY_SUCCESS = "UPDATE_COMPANY_SUCCESS";
export const UPDATE_COMPANY_ERROR = "UPDATE_COMPANY_ERROR";

export const updateCompany = (request: UpdateCompanyRequest): UpdateCompanyAction => ({
  type: UPDATE_COMPANY,
  request
});

export const updateCompanySuccess = (response: ResponseBase2): UpdateCompanyAction => ({
  type: UPDATE_COMPANY_SUCCESS,
  response
});

export const updateCompanyError = (error: AppError): UpdateCompanyAction => ({
  type: UPDATE_COMPANY_ERROR,
  error
});
