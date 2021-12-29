import {STEP_NAV_INFORMATION, STEP_NAV_INTERVIEWERS, STEP_NAV_PROCESS, StepNavAction, StepNavInfo} from "../../types";
import {CHANGE_INFO_CHECK, CHANGE_PROCESS_CHECK, CHANGE_STATE_NAV_STEP} from "../actions";

export interface NavSteps {
  navs: StepNavInfo[]
  info_check: boolean
  process_check: boolean
}

const initState: NavSteps = {
  info_check: true,
  process_check: false,
  navs: [
    {
      key: STEP_NAV_INFORMATION,
      style: {display: 'flex', alignItems: 'center'},
      link: '/recruitment-manager/create/information',
      icon: 'form',
      styleText: {},
      text: 'Thông tin ứng tuyển'
    },
    {
      key: STEP_NAV_PROCESS,
      style: {display: 'flex', alignItems: 'center', pointerEvents: 'none'},
      link: '/recruitment-manager/create/process',
      icon: 'team',
      styleText: {color: 'red'},
      text: 'Quy trình tuyển dụng'
    },
    {
      key: STEP_NAV_INTERVIEWERS,
      style: {display: 'flex', alignItems: 'center', pointerEvents: 'none'},
      link: '/recruitment-manager/create/interviewers',
      icon: 'solution',
      styleText: {color: 'red'},
      text: 'Hội đông tuyển dụng'
    }
  ]
}


export default (state = initState, action: StepNavAction): NavSteps => {
  switch (action.type) {
    case CHANGE_STATE_NAV_STEP:
      let st = [...state.navs];
      for (let i = 0; i < st.length; i++) {
        if (st[i].key === action.id) {
          let style;
          let styleText;
          if (action.disable) {
            style = {display: 'flex', alignItems: 'center', pointerEvents: 'none'};
            styleText = {color: 'red'}
          } else {
            style = {display: 'flex', alignItems: 'center'};
            styleText = {}
          }
          st[i].style = style;
          st[i].styleText = styleText;
          break;
        }
      }
      return {...state, navs: st}
    case CHANGE_INFO_CHECK: {
      let st = [...state.navs];
      for (let i = 0; i < st.length; i++) {
        if (st[i].key === STEP_NAV_PROCESS || st[i].key === STEP_NAV_INTERVIEWERS) {
          let style;
          let styleText;
          if (!action.info_check) {
            style = {display: 'flex', alignItems: 'center', pointerEvents: 'none'};
            styleText = {color: 'red'}
          } else {
            style = {display: 'flex', alignItems: 'center'};
            styleText = {}
          }
          st[i].style = style;
          st[i].styleText = styleText;
          break;
        }
      }
      return {...state, navs: st}
    }
    case CHANGE_PROCESS_CHECK: {
      let st = [...state.navs];
      for (let i = 0; i < st.length; i++) {
        if (st[i].key === STEP_NAV_INTERVIEWERS) {
          let style;
          let styleText;
          if (!action.info_check) {
            style = {display: 'flex', alignItems: 'center', pointerEvents: 'none'};
            styleText = {color: 'red'}
          } else {
            style = {display: 'flex', alignItems: 'center'};
            styleText = {}
          }
          st[i].style = style;
          st[i].styleText = styleText;
          break;
        }
      }
      return {...state, navs: st}
    }
  }
  return state;
}
