import {CreateBookingRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";


export interface CreateBookingAction {
  type:string,
  request?:CreateBookingRequest,
  response?: ResponseBase2,
  error?: AppError
}
export const CREATE_BOOKING = "CREATE_BOOKING";
export const CREATE_BOOKING_SUCCESS = "CREATE_BOOKING_SUCCESS";
export const CREATE_BOOKING_ERROR = "CREATE_BOOKING_ERROR";

export const createBooking = (request: CreateBookingRequest): CreateBookingAction => ({
  type: CREATE_BOOKING,
  request
});

export const createBookingSuccess = (response: ResponseBase2): CreateBookingAction => ({
  type: CREATE_BOOKING_SUCCESS,
  response
});

export const createBookingError = (error: AppError): CreateBookingAction => ({
  type: CREATE_BOOKING_ERROR,
  error
});
