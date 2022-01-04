import {all, takeLatest} from 'redux-saga/effects';
import {createSkillAsync} from "./create";
import {deleteSkillAsync} from "./deleteSkill";
import {getListSkillAsync} from "./list";
import {updateSkillAsync} from "./update";
import { CREATE_SKILL, DELETE_SKILL, GET_LIST_SKILL, UPDATE_SKILL} from "../actions";

export default function* root() {
  return all([
    yield takeLatest(CREATE_SKILL, createSkillAsync),
    yield takeLatest(DELETE_SKILL, deleteSkillAsync),
    yield takeLatest(GET_LIST_SKILL, getListSkillAsync),
    yield takeLatest(UPDATE_SKILL, updateSkillAsync),
  ]);
}
