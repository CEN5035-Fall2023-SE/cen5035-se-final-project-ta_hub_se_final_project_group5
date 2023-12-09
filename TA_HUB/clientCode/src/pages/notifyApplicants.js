import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, message, Button } from 'antd';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const NotifyApplicant = () => {
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    // Fetch TA applicants from the server and update the state
    axios.get('http://localhost:3005/ta-applicants')
      .then((response) => {
        const taApplicantsData = response.data;
        const selectedApplicantsData = taApplicantsData.filter(applicant => applicant.applicationStatus === 'selected');
        setSelectedApplicants(selectedApplicantsData);
      })
      .catch((error) => {
        console.error('Error fetching TA applicants:', error);
      });
  }, []);

  const handleNotifyApplicant = (applicant) => {
    // Make a request to your server to update the administratorNotify value in the database
    axios.post('http://localhost:3005/update-administrator-notify', {
      email: applicant.email,
    })
      .then((response) => {
        if (response.data.success) {
          // Update the state to reflect the change in administratorNotify value
          setSelectedApplicants((prevSelected) =>
            prevSelected.map((prevApplicant) =>
              prevApplicant.email === applicant.email
                ? { ...prevApplicant, administratorNotify: 1 }
                : prevApplicant
            )
          );

          message.success(`Applicant ${applicant.name} notified successfully`);
        } else {
          message.error('Failed to update administratorNotify value');
        }
      })
      .catch((error) => {
        console.error('Error updating administratorNotify value:', error);
        message.error('An error occurred while updating administratorNotify value');
      });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Previous TA Experience',
      dataIndex: 'previousTA',
      key: 'previousTA',
      render: (text) => (text ? 'Yes' : 'No'),
    },
    {
      title: 'Previous TA Details',
      dataIndex: 'previousTADetails',
      key: 'previousTADetails',
    },
    {
      title: 'Courses',
      dataIndex: 'courses',
      key: 'courses',
      render: (courses) => courses.join(', '),
    },
    {
      title: 'Application Status',
      dataIndex: 'applicationStatus',
      key: 'applicationStatus',
    },
    {
      title: 'Administrator Notify',
      dataIndex: 'administratorNotify',
      key: 'administratorNotify',
      render: (text) => (text === 1 ? 'Notified' : 'Not Notified'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleNotifyApplicant(record)}
            disabled={record.administratorNotify === 1}
          >
            Notify
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Selected TA Applicants</h1>
      <Table dataSource={selectedApplicants} columns={columns} rowKey="email" />
      <h2>Selected Applicants</h2>
      <ul>
        {selectedApplicants.map((applicant) => (
          <li key={applicant.email}>{`${applicant.name} - Selected`}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotifyApplicant;
