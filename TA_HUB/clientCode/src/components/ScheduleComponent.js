import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const ScheduleComponent = () => {
  const email = useSelector((state) => state.email.email);
  const [task, setTask] = useState(null);

  useEffect(() => {
    // Fetch the task for the current user's email
    axios
      .get('http://localhost:3005/get-task', {
        params: { email: email },
      })
      .then((response) => {
        const { task } = response.data;
        setTask(task);
      })
      .catch((error) => {
        console.error('Error fetching task:', error);
      });
  }, [email]);

  return (
    <div style={styles.container}>
      <Title level={2} style={styles.title}>
        Schedule Dashboard
      </Title>
      {task === 'NA' ? (
        <Paragraph type="danger" style={styles.errorText}>
          No schedule created
        </Paragraph>
      ) : (
        <Paragraph style={styles.scheduleText}>Schedule: {task}</Paragraph>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    border: '1px solid #d9d9d9',
    borderRadius: '5px',
    marginBottom: '20px',
    backgroundColor: '#f5f5f5',
  },
  title: {
    color: '#1890ff',
  },
  errorText: {
    color: '#ff4d4f',
  },
  scheduleText: {
    color: '#52c41a',
  },
};

export default ScheduleComponent;
