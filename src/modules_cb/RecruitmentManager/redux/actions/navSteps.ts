import {StepNavAction} from "../../types";

export const CHANGE_STATE_NAV_STEP = "GET_LIST_RECRUITMENT";
export const CHANGE_INFO_CHECK = "CHANGE_INFO_CHECK";
export const CHANGE_PROCESS_CHECK = "GET_LIST_RECRUITMENT";

export const setEnableNavStep = (key: string, disable: boolean): StepNavAction => ({
  type: CHANGE_STATE_NAV_STEP,
  id: key,
  disable: disable
});

export const setInfoCheck = (value: boolean): StepNavAction => ({
  type: CHANGE_INFO_CHECK,
  id: '',
  disable: false,
  info_check: value
});

export const setProcessCheck = (value: boolean): StepNavAction => ({
  type: CHANGE_PROCESS_CHECK,
  id: 'key',
  disable: false,
  process_check: value
});

