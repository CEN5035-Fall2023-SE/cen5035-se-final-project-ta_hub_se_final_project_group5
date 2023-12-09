import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store'; 
import ScheduleComponent from '../components/ScheduleComponent';
export default function ApplicationScheduleDisplay() {
  return (
    <Provider store={store}>
   <ScheduleComponent/>
</Provider>
  )
}
