import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store'; 
import LoginFunction from '../components/loginPageComponent';
export default function LoginAct() {
  return (
    <Provider store={store}>
        <LoginFunction/>
    </Provider>
  )
}
