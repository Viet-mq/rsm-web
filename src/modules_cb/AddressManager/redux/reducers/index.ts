import {combineReducers} from "redux";
import list, {AddressListState} from "./list";
import deleteAddress, {DeleteAddressState} from "./deleteAddress";
import create, {CreateAddressState} from "./create";
import showForm, {AddressFormState} from "./showForm";
import update, {UpdateAddressState} from "./update";
import search, {SearchListAddressState} from "./search";

export interface AddressManagerModuleState {
  list: AddressListState,
  search: SearchListAddressState,
  deleteAddress: DeleteAddressState,
  create: CreateAddressState,
  showForm: AddressFormState,
  update: UpdateAddressState,
}

export default combineReducers<AddressManagerModuleState>({
  list,
  search,
  deleteAddress,
  create,
  showForm,
  update,
});
