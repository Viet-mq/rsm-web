export interface ActionView {
  viewId: string,
  actionId: string,
  actionName: string,
  desc: string,
}

export interface FrontendViewEntity {
  id: string,
  name: string,
  icon: string,
  show: boolean,
  actions: ActionView[]
}

export interface CreateFrontendViewRequest {
  id: string,
  name: string,
  icon?: string,
  show?: boolean,
}

export interface AddActionToViewRequest {
  viewId: string,
  actionId: string,
  actionName?: string,
  desc?: string,
}
