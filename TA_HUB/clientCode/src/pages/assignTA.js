import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, message, Modal, Input } from 'antd';

const AssignTA = () => {
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskValue, setTaskValue] = useState('');

  useEffect(() => {
    // Fetch TA applicants from the server and update the state
    axios
      .get('http://localhost:3005/ta-applicants')
      .then((response) => {
        const taApplicantsData = response.data;
        setApplicants(taApplicantsData.filter(applicant => applicant.applicationStatus === 'accepted'));
      })
      .catch((error) => {
        console.error('Error fetching TA applicants:', error);
      });
  }, []);

  const showAssignModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Update the 'task' column in your data with the entered schedule (taskValue)
    const updatedApplicants = applicants.map((app) =>
      app.email === selectedApplicant.email ? { ...app, task: taskValue } : app
    );
    setApplicants(updatedApplicants);

    // Make an API call to update the 'task' column in the database
    axios
      .post('http://localhost:3005/update-task', {
        email: selectedApplicant.email,
        task: taskValue,
      })
      .then((response) => {
        if (response.data.success) {
          message.success('Task assigned successfully');
        } else {
          message.error('Failed to assign task');
        }
      })
      .catch((error) => {
        console.error('Error updating task:', error);
        message.error('An error occurred while updating task');
      });

    setIsModalVisible(false);
    setTaskValue(''); // Clear the task value when the modal is closed
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setTaskValue(''); // Clear the task value when the modal is closed
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
      title: 'Task',
      dataIndex: 'task',
      key: 'task',
      render: (text, record) => text || 'NA',
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
        <Button
          type="primary"
          style={{ background: 'green', borderColor: 'green' }}
          onClick={() => handleAssignApplicant(record)}
          disabled={record.action === 'selected' || record.action === 'rejected'}
        >
          Assign
        </Button>
      ),
    },
  ];

  const handleAssignApplicant = (applicant) => {
    setSelectedApplicant(applicant);
    showAssignModal();
  };

  return (
    <div>
      <h1 style={{ color: 'black' }}><b>Assign TA Candidates</b></h1>
      <Table dataSource={applicants} columns={columns} rowKey="email" />
      <h2>Selected Applicants</h2>
      <ul>
        {selectedApplicants.map((applicant) => (
          <li key={applicant.email}>{`${applicant.name} - ${
            applicant.action === 'selected' ? 'Assigned' : 'Rejected'
          }`}</li>
        ))}
      </ul>
      <Modal
        title="Assign Task"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Enter schedule/task"
          value={taskValue}
          onChange={(e) => setTaskValue(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default AssignTA;
