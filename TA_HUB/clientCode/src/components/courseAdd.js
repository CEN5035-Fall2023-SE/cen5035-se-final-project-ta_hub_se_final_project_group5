import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';
const { Option } = Select;
const { TextArea } = Input;
const AddCourseForm = () => {
  const [form] = Form.useForm();
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [Professor, setProfessor] = useState('');
  const [classMode, setClassMode] = useState('');
  const [prerequisites, setPrerequisites] = useState('');
  const onFinish = (event) => {
    console.log('Received values of form: ', event);
    axios
      .post('http://localhost:3005/create-course', {
        courseName,
        courseCode,
        Professor,
        classMode,
        prerequisites,
      })
      .then((res) => {
        console.log(res);
        // Display a success message with a callback to clear fields when the message closes
        setCourseCode('');
    setCourseName('');
    setProfessor('');
    setClassMode('');
    setPrerequisites('');
        message.success('Course added successfully', 2, clearFields);

      })
      .catch((err) => {
        console.log(err);
        // Display an error message if there's an issue
        message.error('Failed to add the course');
      });
  };

  const clearFields = () => {
    form.resetFields();
  };

  return (
    <Form form={form} name="addCourseForm" onFinish={onFinish}>
      <Form.Item
        name="courseCode"
        label="Course Code"
        rules={[{ required: true, message: 'Please enter the course code' }]}
      >
        <Input value={courseCode} onChange={e => setCourseCode(e.target.value)} />
      </Form.Item>

      <Form.Item
        name="courseName"
        label="Course Name"
        rules={[{ required: true, message: 'Please enter the course name' }]}
      >
        <Input value={courseName} onChange={e => setCourseName(e.target.value)} />
      </Form.Item>

      <Form.Item
        name="Professor"
        label="Professor"
        rules={[{ required: true, message: 'Please enter the professor' }]}
      >
        <Input value={Professor} onChange={e => setProfessor(e.target.value)} />
      </Form.Item>

      <Form.Item
        name="classMode"
        label="Class Mode"
        rules={[{ required: true, message: 'Please select online or offline' }]}
      >
        <Select value={classMode} onChange={e => setClassMode(e)}>
          <Option value="online">Online</Option>
          <Option value="offline">Offline</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="prerequisites"
        label="Prerequisites"
        rules={[{ required: true, message: 'Please enter the prerequisites' }]}
      >
        <TextArea value={prerequisites} onChange={(e) => setPrerequisites(e.target.value)} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Course
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCourseForm;
