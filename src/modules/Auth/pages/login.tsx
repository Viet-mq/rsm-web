import React, {useEffect} from 'react';
import LoginForm from './components/login-form';
import * as actions from './../redux/actions';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import env from 'src/configs/env';
import Loading from 'src/components/Loading';

const mapPropsToState = ({auth: {auth}}: RootState) => ({auth});

const connector = connect(mapPropsToState, actions);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {
}

function LoginPage(props: IProps) {

  useEffect(() => {
    document.title = env.pageTitle + 'Đăng Nhập';
  }, []);

  const onLogin = (username: string, password: string) => {
    props.login({username, password});
  };

  return (
    <>
      <LoginForm onLogin={onLogin} loading={false}/>
      <div className="version">V 2.0</div>
      {props.auth.loading ? <Loading/> : null}
    </>
  )

}

export default connector(LoginPage);
