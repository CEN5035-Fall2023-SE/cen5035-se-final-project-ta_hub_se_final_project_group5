import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, message } from 'antd';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const ManageTACandidates = () => {
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    // Fetch TA applicants from the server and update the state
    axios.get('http://localhost:3005/ta-applicants')
      .then((response) => {
        const taApplicantsData = response.data;
        setApplicants(taApplicantsData);
      })
      .catch((error) => {
        console.error('Error fetching TA applicants:', error);
      });
  }, []);

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
      title: 'Action',
      key: 'action',
      render: (record) => (
        <div>
          <Button
            type="primary"
            style={{ background: 'green', borderColor: 'green', marginRight: '8px' }}
            onClick={() => handleSelectApplicant(record)}
            disabled={record.action === 'selected' || record.action === 'rejected'}
          >
            Select
          </Button>
          <Button
            type="danger"
            onClick={() => handleRejectApplicant(record)}
            disabled={record.action === 'selected' || record.action === 'rejected'}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  const handleSelectApplicant = (applicant) => {
    handleAction(applicant, 'selected', 'Applicant selected successfully');
  };

  const handleRejectApplicant = (applicant) => {
    handleAction(applicant, 'rejected', 'Applicant rejected successfully');
  };

  const handleAction = (applicant, action, successMessage) => {
    axios.post('http://localhost:3005/update-applicant-status', {
      email: applicant.email,
      status: action,
    })
      .then((response) => {
        if (response.data.success) {
          // Update the selectedApplicants state
          setSelectedApplicants((prevSelected) => [...prevSelected, { ...applicant, action }]);
          message.success(successMessage);

          // Update the applicants state to reflect the change in application status
          setApplicants((prevApplicants) =>
            prevApplicants.map((prevApplicant) =>
              prevApplicant.email === applicant.email
                ? { ...prevApplicant, applicationStatus: action }
                : prevApplicant
            )
          );
        } else {
          message.error(`Failed to ${action.toLowerCase()} applicant`);
        }
      })
      .catch((error) => {
        console.error(`Error ${action.toLowerCase()}ing applicant:`, error);
        message.error(`An error occurred while ${action.toLowerCase()}ing applicant`);
      });
  };

  return (
    <div>
    <h1 style={{ color: 'black' }}><b>Manage TA Candidates</b></h1>
      <Table dataSource={applicants} columns={columns} rowKey="email" />
      <h2>Selected Applicants</h2>
      <ul>
        {selectedApplicants.map((applicant) => (
          <li key={applicant.email}>{`${applicant.name} - ${applicant.action === 'selected' ? 'Selected' : 'Rejected'}`}</li>
        ))}
      </ul>
  
    </div>
  );
};

export default ManageTACandidates;
