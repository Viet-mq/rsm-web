import {UpdateBookingRequest} from "../../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateBookingAction {
  type: string,
  request?: UpdateBookingRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_BOOKING = "UPDATE_BOOKING";
export const UPDATE_BOOKING_SUCCESS = "UPDATE_BOOKING_SUCCESS";
export const UPDATE_BOOKING_ERROR = "UPDATE_BOOKING_ERROR";

export const updateBooking = (request: UpdateBookingRequest): UpdateBookingAction => ({
  type: UPDATE_BOOKING,
  request
});

export const updateBookingSuccess = (response: ResponseBase2): UpdateBookingAction => ({
  type: UPDATE_BOOKING_SUCCESS,
  response
});

export const updateBookingError = (error: AppError): UpdateBookingAction => ({
  type: UPDATE_BOOKING_ERROR,
  error
});
