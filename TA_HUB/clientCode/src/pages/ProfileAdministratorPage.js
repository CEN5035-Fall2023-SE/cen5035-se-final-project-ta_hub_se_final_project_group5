import React from 'react'
import { Provider } from 'react-redux';
import store from '../store/store'; 
import ProfileSection from '../components/ProfileAdministrator';
export default function ProfileAdministratorPage() {
  return (
    <Provider store={store}>
    <ProfileSection/>
</Provider>
  )
}
