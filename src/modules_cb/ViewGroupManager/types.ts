export interface ActionView {
  actionId: string,
  actionName: string,
  desc: string,
  show: boolean,
}

export interface FrontendView {
  id: string,
  name: string,
  icon: string,
  actions: ActionView[]
}

export interface MenuFrontendEntity {
  id: string,
  name: string,
  desc:string,
  views: FrontendView[],
}

export interface CreateMenuFrontendRequest{
  name: string,
}

export interface UpdateMenuFrontendRequest{
  id: string,
  name: string,
  viewIds: [
    string
  ]
}

export interface DeleteMenuFrontendRequest{
  id: string,
  name: string,
  viewIds: [
    string
  ]
}

export interface ActionViewRequest{
  menuId: string,
  viewActionIds: [
    string
  ]
}
