import {combineReducers} from "redux";
import list, {AddressListState} from "./list";
import deleteAddress, {DeleteAddressState} from "./deleteAddress";
import create, {CreateAddressState} from "./create";
import showForm, {AddressFormState} from "./showForm";
import update, {UpdateAddressState} from "./update";

export interface AddressManagerModuleState {
  list: AddressListState,
  deleteAddress: DeleteAddressState,
  create: CreateAddressState,
  showForm: AddressFormState,
  update: UpdateAddressState,
}

export default combineReducers<AddressManagerModuleState>({
  list,
  deleteAddress,
  create,
  showForm,
  update,
});
