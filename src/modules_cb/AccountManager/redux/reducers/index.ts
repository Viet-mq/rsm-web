import {combineReducers} from "redux";
import list, {AccountListState} from "./list";
import deleteAccount, {DeleteAccountState} from "./deleteAccount";
import create, {CreateAccountState} from "./create";
import showForm, {AccountFormState} from "./showForm";
import update, {UpdateAccountState} from "./update";
import changePassword, {ChangePasswordState} from "./changePassword";

export interface AccountManagerModuleState {
  list: AccountListState,
  deleteAccount: DeleteAccountState,
  create: CreateAccountState,
  showForm: AccountFormState,
  update: UpdateAccountState,
  changePassword: ChangePasswordState
}

export default combineReducers<AccountManagerModuleState>({
  list,
  deleteAccount,
  create,
  showForm,
  update,
  changePassword
});
