import {BookingEntity} from "../../../types";
import {AppError} from "../../../../../models/baseResponse";


export interface GetBookingAction {
  type:string,
  params?:any,
  result?:BookingEntity
  error?:AppError
}

export const GET_BOOKING = "GET_BOOKING";
export const GET_BOOKING_SUCCESS = "GET_BOOKING_SUCCESS";
export const GET_BOOKING_ERROR = "GET_BOOKING_ERROR";

export const getBooking = (params:any) : GetBookingAction =>({
  type:GET_BOOKING,
  params,
})

export const getBookingSuccess = (result?:BookingEntity) =>({
  type:GET_BOOKING_SUCCESS,
  result
})

export const getBookingError =( error:AppError): GetBookingAction=>({
  type:GET_BOOKING_ERROR,
  error
})
