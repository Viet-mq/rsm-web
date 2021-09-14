import {IntentEntity} from "../../types";

export interface IntentManagerFormAction {
  type: string,
  showCreate?: boolean,
  showUpdate?: boolean,
  entity?: IntentEntity
}

export const INTENT_SHOW_FORM_CREATE = "INTENT_SHOW_FORM_CREATE";
export const INTENT_SHOW_FORM_UPDATE = "INTENT_SHOW_FORM_UPDATE";

export const showFormCreateIntent = (showCreate: boolean): IntentManagerFormAction => ({
  type: INTENT_SHOW_FORM_CREATE,
  showCreate,
  showUpdate: false
});

export const showFormUpdateIntent = (showUpdate: boolean, entity?: IntentEntity): IntentManagerFormAction => ({
  type: INTENT_SHOW_FORM_UPDATE,
  showCreate: false,
  showUpdate,
  entity
})
