import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store'; 
import ApplicationStatus from '../components/ApplicationStatus'
export default function ApplicationStatusPage() {
  return (
    <Provider store={store}>
    <ApplicationStatus/>
 </Provider>
  )
}
