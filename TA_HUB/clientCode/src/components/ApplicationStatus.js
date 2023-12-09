import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from 'antd';

export default function ApplicationStatus() {
  const emailRedux = useSelector((state) => state.email.email);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [administratorNotify, setAdministratorNotify] = useState(null);

  useEffect(() => {
    checkApplicationStatus();
  }, []);

  const checkApplicationStatus = () => {
    axios
      .get('http://localhost:3005/check-application-status2', {
        params: { email: emailRedux },
      })
      .then((response) => {
        const { applicationStatus, administratorNotify } = response.data;
        console.log(applicationStatus, administratorNotify);
        setApplicationStatus(applicationStatus);
        setAdministratorNotify(administratorNotify);
      })
      .catch((error) => {
        console.error('Error checking application status:', error);
      });
  };

  const handleAccept = () => {
    updateApplicationStatus('accepted');
  };

  const handleDecline = () => {
    updateApplicationStatus('declined');
  };

  const updateApplicationStatus = (status) => {
    axios
      .post('http://localhost:3005/update-applicant-status', {
        email: emailRedux,
        status: status,
      })
      .then((response) => {
        if (response.data.success) {
          // Update the state to reflect the change in application status
          setApplicationStatus(status);
        } else {
          console.error('Failed to update application status');
        }
      })
      .catch((error) => {
        console.error('Error updating application status:', error);
      });
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
      }}
    >
      {applicationStatus === 'applied' ? (
        <div>
          <p style={{ color: 'green', alignItems: 'center' }}>
            <b>Application submitted.</b>
          </p>
        </div>
      ) : applicationStatus === 'selected' && administratorNotify === 0 ? (
        <div>
          <p style={{ color: 'blue', alignItems: 'center' }}>
            <b>Application under review.</b>
          </p>
        </div>
      ) : applicationStatus === 'selected' && administratorNotify === 1 ? (
        <div>
          <p style={{ color: 'blue', alignItems: 'center' }}>
            <b>You have been selected!</b>
          </p>
          {/* Add your accept/decline options here */}
          <Button type="primary" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleAccept}>
            Accept
          </Button>
          <Button danger style={{ marginLeft: '8px' }} onClick={handleDecline}>
            Decline
          </Button>
        </div>
      ) : applicationStatus === 'accepted' ? (
        <div>
          <p style={{ color: 'green', alignItems: 'center' }}>
            <b>Congratulations! Your application has been accepted.</b>
          </p>
        </div>
      ) : applicationStatus === 'declined' ? (
        <div>
          <p style={{ color: 'red', alignItems: 'center' }}>
            <b>We regret to inform you that your application has been declined.</b>
          </p>
        </div>
      ) :  applicationStatus === 'recommended' ? (
        <div>
          <p style={{ color: 'purple', alignItems: 'center' }}>
            <b>You are recommended by the administrator!</b>
          </p>
        </div>
      ) : (
        <div>
          <p style={{ color: 'red', alignItems: 'center' }}>
            <b>Application not submitted.</b>
          </p>
        </div>
      )}
    </div>
  );
}
