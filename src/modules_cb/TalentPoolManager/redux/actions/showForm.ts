import {TalentPoolEntity} from "../../types";

export interface TalentPoolFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  data_update?: TalentPoolEntity
}

export const TALENT_POOL_SHOW_FORM_CREATE = "TALENT_POOL_SHOW_FORM_CREATE";
export const TALENT_POOL_SHOW_FORM_UPDATE = "TALENT_POOL_SHOW_FORM_UPDATE";

export const  showFormCreate = (show: boolean): TalentPoolFormAction => ({
  type: TALENT_POOL_SHOW_FORM_CREATE,
  show_create: show
});

export const showFormUpdate = (show: boolean, dataUpdate?: TalentPoolEntity): TalentPoolFormAction => ({
  type: TALENT_POOL_SHOW_FORM_UPDATE,
  show_update: show,
  data_update: dataUpdate
});

