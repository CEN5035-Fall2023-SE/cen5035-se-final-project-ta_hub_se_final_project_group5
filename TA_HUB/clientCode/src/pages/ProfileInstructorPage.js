import React from 'react'
import { Provider } from 'react-redux';
import store from '../store/store'; 
import ProfileSection from '../components/ProfileInstructor';
export default function ProfileInstructorPage() {
  return (
    <Provider store={store}>
    <ProfileSection/>
</Provider>
  )
}
