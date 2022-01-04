import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteGroupAPIAction {
  type: string,
  id?: string,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_GROUP_API = "DELETE_GROUP_API";
export const DELETE_GROUP_API_SUCCESS = "DELETE_GROUP_API_SUCCESS";
export const DELETE_GROUP_API_ERROR = "DELETE_GROUP_API_ERROR";

export const deleteGroupAPI = (id: string): DeleteGroupAPIAction => ({
  type: DELETE_GROUP_API,
  id
});

export const deleteViewSuccess = (response?: ResponseBase2): DeleteGroupAPIAction => ({
  type: DELETE_GROUP_API_SUCCESS,
  response
});

export const deleteViewError = (error?: AppError): DeleteGroupAPIAction => ({
  type: DELETE_GROUP_API_ERROR,
  error
});
