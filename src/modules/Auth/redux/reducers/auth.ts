import * as actions from '../actions';
import {LoginAction, LoginErrorAction, LoginSuccessAction} from '../actions';
import {LoginResponse2} from '../../types';
import {AppError} from '../../../../models/common';

export interface LoginState {
  loading: boolean;
  data?: LoginResponse2;
  error?: AppError;
}

const initialState = {
  loading: false,
};

export default (state = initialState, action: LoginAction | LoginSuccessAction | LoginErrorAction): LoginState => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        loading: true,
      };

    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload as LoginResponse2,
      };

    case actions.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        data: action.payload as LoginResponse2,
      };

    case actions.LOGOUT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case actions.LOGOUT: {
      return {
        ...state,
        loading: false,
        data: undefined,
      };
    }

    default:
      return state;
  }

};
