import React from 'react'
import { Provider } from 'react-redux';
import store from '../store/store'; 
import ProfileSectionCommitteeMember from '../components/ProfileTACommitteeMember';
export default function ProfileTACommitteeMemberPage() {
  return (
    <Provider store={store}>
    <ProfileSectionCommitteeMember/>
</Provider>
  )
}
