import {AddressEntity} from "../../types";

export interface AddressFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  data_update?: AddressEntity
}

export const ADDRESS_SHOW_FORM_CREATE = "ADDRESS_SHOW_FORM_CREATE";
export const ADDRESS_SHOW_FORM_UPDATE = "ADDRESS_SHOW_FORM_UPDATE";

export const  showFormCreate = (show: boolean): AddressFormAction => ({
  type: ADDRESS_SHOW_FORM_CREATE,
  show_create: show
});

export const showFormUpdate = (show: boolean, dataUpdate?: AddressEntity): AddressFormAction => ({
  type: ADDRESS_SHOW_FORM_UPDATE,
  show_update: show,
  data_update: dataUpdate
});

