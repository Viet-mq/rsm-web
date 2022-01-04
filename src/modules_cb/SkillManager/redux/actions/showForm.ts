import {SkillEntity} from "../../types";

export interface SkillFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  data_update?: SkillEntity
}

export const SKILL_SHOW_FORM_CREATE = "SKILL_SHOW_FORM_CREATE";
export const SKILL_SHOW_FORM_UPDATE = "SKILL_SHOW_FORM_UPDATE";

export const  showFormCreate = (show: boolean): SkillFormAction => ({
  type: SKILL_SHOW_FORM_CREATE,
  show_create: show
});

export const showFormUpdate = (show: boolean, dataUpdate?: SkillEntity): SkillFormAction => ({
  type: SKILL_SHOW_FORM_UPDATE,
  show_update: show,
  data_update: dataUpdate
});

