import {DeleteCompanyRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteCompanyAction {
  type: string,
  request?: DeleteCompanyRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_COMPANY = "DELETE_COMPANY";
export const DELETE_COMPANY_SUCCESS = "DELETE_COMPANY_SUCCESS";
export const DELETE_COMPANY_ERROR = "DELETE_COMPANY_ERROR";

export const deleteCompany = (request: DeleteCompanyRequest): DeleteCompanyAction => ({
  type: DELETE_COMPANY,
  request
});

export const deleteCompanySuccess = (response: ResponseBase2): DeleteCompanyAction => ({
  type: DELETE_COMPANY_SUCCESS,
  response
});

export const deleteCompanyError = (error: AppError): DeleteCompanyAction => ({
  type: DELETE_COMPANY_ERROR,
  error
});
