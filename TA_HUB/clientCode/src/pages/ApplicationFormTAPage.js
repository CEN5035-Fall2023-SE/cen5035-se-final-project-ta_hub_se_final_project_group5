import React from 'react'
import { Provider } from 'react-redux';
import store from '../store/store'; 
import TAApplicantForm from '../components/ApplicationFormTA';
export default function ApplicationFormTAPage() {
  return (
    <Provider store={store}>
   <TAApplicantForm/>
</Provider>
  )
}
