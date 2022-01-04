export interface ReasonRejectEntity {
  id:string,
  reason:string,

}

export interface CreateReasonRejectRequest {
  reason: string,
}

export interface UpdateReasonRejectRequest {
  id: string,
  reason: string,
}

export interface DeleteReasonRejectRequest {
  id: string,
}

