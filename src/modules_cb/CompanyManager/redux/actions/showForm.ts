import {CompanyEntity} from "../../types";

export interface ShowCompanyFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  data_update?: CompanyEntity
}

export const SHOW_FORM_COMPANY_CREATE = "SHOW_FORM_COMPANY_CREATE";
export const SHOW_FORM_COMPANY_UPDATE = "SHOW_FORM_COMPANY_UPDATE";

export const  showFormCreate = (show: boolean): ShowCompanyFormAction => ({
  type: SHOW_FORM_COMPANY_CREATE,
  show_create: show
});

export const showFormUpdate = (show: boolean, dataUpdate?: CompanyEntity): ShowCompanyFormAction => ({
  type: SHOW_FORM_COMPANY_UPDATE,
  show_update: show,
  data_update: dataUpdate
});

