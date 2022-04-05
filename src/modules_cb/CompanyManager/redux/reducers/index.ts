import {combineReducers} from "redux";
import list, {CompanyListState} from "./list";
import deleteCompany, {DeleteCompanyState} from "./deleteCompany";
import create, {CreateCompanyState} from "./create";
import showForm, {ShowCompanyFormState} from "./showForm";
import update, {UpdateCompanyState} from "./update";
import search, {SearchCompanyState} from "./search";

export interface CompanyManagerModuleState {
  list: CompanyListState,
  search: SearchCompanyState,
  deleteCompany: DeleteCompanyState,
  create: CreateCompanyState,
  showForm: ShowCompanyFormState,
  update: UpdateCompanyState,
}

export default combineReducers<CompanyManagerModuleState>({
  list,
  deleteCompany,
  create,
  showForm,
  update,
  search,
});
