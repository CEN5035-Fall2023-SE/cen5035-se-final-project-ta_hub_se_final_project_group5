import React from 'react';
import { Form, Input, Button,message } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import axios from 'axios';
const DropCoursesPage = () => {
  const [form] = Form.useForm();
  const [courseCode, setCourseCode] = useState('');

  const handleDropCourse = async () => {
    try {
      await axios.post('http://localhost:3005/drop-course', { courseCode });
      form.resetFields();
      setCourseCode('');
      message.success('Course dropped successfully');
    } catch (error) {
      console.error('Error dropping course:', error);

      // Show an error message
      message.error('Error dropping course. Please try again.');
    }
  };
  return (
    <div>
    <b><h1 style={{ color: 'black', fontSize: '24px' }}>Drop Courses Page</h1></b> <br></br>
      <Form form={form} onFinish={handleDropCourse}>
        <Form.Item label="Course Code" name="courseCode">
          <Input
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Drop Course
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DropCoursesPage;
