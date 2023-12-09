import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Checkbox, Button, Upload, message as antdMessage } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { Option } = Select;
const { TextArea } = Input;

const TAApplicantForm = () => {
  const emailRedux = useSelector((state) => state.email.email);
  const usertypeRedux = useSelector((state) => state.email.userType);
  const nameRedux = useSelector((state) => state.email.name);
  const [courseOptions, setCourseOptions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [previousTA, setPreviousTA] = useState('');
  const [previousTADetails, setPreviousTADetails] = useState('');
  const [resume, setResume] = useState([]);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [updateTimestamp, setUpdateTimestamp] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3005/courses')
      .then((response) => {
        const courseData = response.data;
        setCourseOptions(courseData);
        console.log(courseData);
      })
      .catch((error) => {
        console.error('Error fetching course data:', error);
      });
    checkApplicationStatus();
  }, []);

  const checkApplicationStatus = () => {
    axios.get('http://localhost:3005/check-application-status', {
      params: { email: emailRedux },
    })
      .then((response) => {
        const { applicationStatus } = response.data;
        console.log(applicationStatus);
        setApplicationStatus(applicationStatus);
        setUpdateTimestamp(Date.now());
      })
      .catch((error) => {
        console.error('Error checking application status:', error);
      });
  };
 
  const onFinish = (event) => {
    console.log('Received values of form: ', event);
    axios
      .post('http://localhost:3005/submit-application', {
        name,
        email,
        previousTA,
        previousTADetails,
        courses,
        resume,
      })
      .then((res) => {
        console.log(res);
        antdMessage.success('Application submitted successfully');
        // Clear form fields or perform any other necessary actions
        setName('');
        setEmail('');
        setPreviousTA(false);
        setPreviousTADetails('');
        setCourses([]);
        setResume([]);
        sendEmail();
      })
      .catch((err) => {
        console.log(err);
        antdMessage.error('An error occurred while submitting the application');
      });
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}>
      {applicationStatus === 'applied' || applicationStatus === 'recommended'||applicationStatus === 'selected' ? (
        <p style={{ color: 'green' }}><b>Your application has already been submitted.</b></p>
      ) : (
        <Form name="addApplicationForm" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input value={name} onChange={e => setName(e.target.value)} />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter the email' }]}
          >
            <Input value={email} onChange={e => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Have you served as a TA before?"
            name="previousTA"
          >
            <Checkbox checked={previousTA} onChange={e => setPreviousTA(e.target.checked)}>Yes</Checkbox>
          </Form.Item>

          <Form.Item
            name="previousTADetails"
            label="If yes, please specify the course(s) and dates"
            rules={[{ message: 'Please enter' }]}
          >
            <TextArea
              value={previousTADetails}
              onChange={(e) => setPreviousTADetails(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Select the course(s) you are qualified to assist with"
            name="courses"
            rules={[{ required: true, message: 'Please select at least one course' }]}
          >
            <Select mode="multiple" placeholder="Select courses" value={courses} onChange={value => setCourses(value)}>
              {courseOptions.map(courseName => (
                <Option key={courseName} value={courseName}>
                  {courseName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Upload Resume"
            name="resume"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: 'Please upload your resume' }]}
          >
            <Upload
              name="resume"
              listType="text"
              accept=".pdf, .doc, .docx"
              customRequest={dummyRequest}
              fileList={resume}
              onChange={fileList => setResume(fileList)}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
            <Button type="primary" htmlType="submit">
              Submit Application
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

// Dummy function for custom request (you can implement your own)
function dummyRequest(options) {
  setTimeout(() => {
    options.onSuccess();
  }, 0);
}

// Function to normalize file data
function normFile(e) {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
}

export default TAApplicantForm;
