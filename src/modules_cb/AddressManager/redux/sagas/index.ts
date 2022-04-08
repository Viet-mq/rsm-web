import {all, takeLatest} from 'redux-saga/effects';
import {createAddressAsync} from "./create";
import {deleteAddressAsync} from "./deleteAddress";
import {getListAddressAsync} from "./list";
import {updateAddressAsync} from "./update";
import {CREATE_ADDRESS, DELETE_ADDRESS, GET_LIST_ADDRESS, SEARCH_LIST_ADDRESS, UPDATE_ADDRESS} from "../actions";
import {searchListAddressAsync} from "./search";

export default function* root() {
  return all([
    yield takeLatest(CREATE_ADDRESS, createAddressAsync),
    yield takeLatest(DELETE_ADDRESS, deleteAddressAsync),
    yield takeLatest(GET_LIST_ADDRESS, getListAddressAsync),
    yield takeLatest(SEARCH_LIST_ADDRESS, searchListAddressAsync),
    yield takeLatest(UPDATE_ADDRESS, updateAddressAsync),
  ]);
}
