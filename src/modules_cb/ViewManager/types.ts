export interface ActionView {
  id: string
  key: string,
  permission_id: string,
  title: string
}

export interface ViewEntity {
  id: string,
  title: string;
  path: string;
  icon: string;
  key: string;
  index: number;
  actions: ActionView[]
}

export interface CreateViewRequest {
  icon: string,
  index: number,
  path: string,
  title: string
}

export interface UpdateViewRequest {
  icon: string,
  index: number,
  path: string,
  title: string
  id?: string,

}

export interface AddActionToViewRequest {
  key: string,
  permission_id?: string,
  title: string
}


export interface DeleteActionToViewRequest {
  id: string,
  permission_id?: string
}

export interface UpdateActionToViewRequest {
  id?: string,
  key: string,
  permission_id?: string,
  title: string
}
