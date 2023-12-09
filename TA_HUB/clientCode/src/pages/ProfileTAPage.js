import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store'; 
import ProfileSection from '../components/ProfileTA';
export default function () {
  return (
    <Provider store={store}>
    <ProfileSection/>
</Provider>
  )
}
