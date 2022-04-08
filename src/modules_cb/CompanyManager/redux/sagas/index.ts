import {all, takeLatest} from 'redux-saga/effects';
import {createCompanyAsync} from "./create";
import {deleteCompanyAsync} from "./deleteCompany";
import {getListCompanyAsync} from "./list";
import {updateCompanyAsync} from "./update";
import {CREATE_COMPANY, DELETE_COMPANY, GET_LIST_COMPANY, GET_SEARCH_COMPANY, UPDATE_COMPANY} from "../actions";
import {getSearchCompanyAsync} from "./search";

export default function* root() {
  return all([
    yield takeLatest(CREATE_COMPANY, createCompanyAsync),
    yield takeLatest(DELETE_COMPANY, deleteCompanyAsync),
    yield takeLatest(GET_LIST_COMPANY, getListCompanyAsync),
    yield takeLatest(GET_SEARCH_COMPANY, getSearchCompanyAsync),
    yield takeLatest(UPDATE_COMPANY, updateCompanyAsync),
  ]);
}
