import {UserAccount} from "../../types";

export interface AccountFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  show_change_password?: boolean,
  data_update?: UserAccount
}

export const ACCOUNT_SHOW_FORM_CREATE = "ACCOUNT_SHOW_FORM_CREATE";
export const ACCOUNT_SHOW_FORM_UPDATE = "ACCOUNT_SHOW_FORM_UPDATE";
export const ACCOUNT_SHOW_FORM_CHANGE_PASSWORD = "ACCOUNT_SHOW_FORM_CHANGE_PASSWORD";

export const showFormCreate = (show: boolean): AccountFormAction => ({
  type: ACCOUNT_SHOW_FORM_CREATE,
  show_create: show
});

export const showFormUpdate = (show: boolean, dataUpdate?: UserAccount): AccountFormAction => ({
  type: ACCOUNT_SHOW_FORM_UPDATE,
  show_update: show,
  data_update: dataUpdate
});

export const showFormChangePassword = (show: boolean, dataUpdate?: UserAccount): AccountFormAction => ({
  type: ACCOUNT_SHOW_FORM_CHANGE_PASSWORD,
  show_change_password: show,
  data_update: dataUpdate
});
