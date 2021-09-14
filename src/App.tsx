import React from 'react';
import {Router} from 'react-router-dom';
import DefaultLayout from './components/layouts/DefaultLayout';
import AuthLayout from './components/layouts/AuthLayout';
import Routes from './routes';
import Login from './modules/Auth/pages/login';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from './redux/reducers';
import history from './history';

const mapState = (state: RootState) => {
  return {
    isLogin: !!state.auth.auth.data?.access_token,
  };
};

const connector = connect(mapState, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux) {

  history.listen(() => {
  });

  return (
    <div className="App">
      <Router history={history}>
        {props.isLogin ? (
          <DefaultLayout>
            <Routes/>
          </DefaultLayout>
        ) : (
          <AuthLayout>
            <Login/>
          </AuthLayout>
        )}
      </Router>
    </div>
  );

}

export default connector(App);
