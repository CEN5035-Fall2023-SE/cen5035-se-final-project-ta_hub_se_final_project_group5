import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, message, Modal } from 'antd';
import { Document, Page } from 'react-pdf';

const SelectTAApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Fetch TA applicants from the server and update the state
    axios.get('http://localhost:3005/ta-applicants')
      .then((response) => {
        const taApplicantsData = response.data;
        setApplicants(taApplicantsData);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching TA applicants:', error);
      });
  }, []);

  const handleViewResume = (resume) => {
    setSelectedResume(resume);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
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
      title: 'Action',
      key: 'action',
      render: (record) => (
        <div>
          <Button
            type="primary"
            style={{ background: 'green', borderColor: 'green' }}
            onClick={() => handleRecommendApplicant(record)}
            disabled={record.applicationStatus === 'recommended' || record.applicationStatus === 'rejected'}
          >
            Recommend
          </Button>
        </div>
      ),
    },
  ];

  const handleRecommendApplicant = (applicant) => {
    axios.post('http://localhost:3005/update-applicant-status', {
      email: applicant.email,
      status: 'recommended',
    })
      .then((response) => {
        if (response.data.success) {
          message.success('Applicant recommended successfully');
          setApplicants((prevApplicants) =>
            prevApplicants.map((prevApplicant) =>
              prevApplicant.email === applicant.email
                ? { ...prevApplicant, applicationStatus: 'recommended' }
                : prevApplicant
            )
          );
        } else {
          message.error('Failed to recommend applicant');
        }
      })
      .catch((error) => {
        console.error('Error recommending applicant:', error);
        message.error('An error occurred while recommending applicant');
      });
  };

  return (
    <div>
      <h1>Recommend TA Applicants</h1>
      <Table dataSource={applicants} columns={columns} rowKey="email" />

      <Modal
        title="Resume"
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
        width={800}
      >
        {selectedResume && (
          <Document
            file={`data:application/pdf;base64,${selectedResume.data.join('')}`}
          >
            <Page pageNumber={1} />
          </Document>
        )}
      </Modal>
    </div>
  );
};

export default SelectTAApplicants;
