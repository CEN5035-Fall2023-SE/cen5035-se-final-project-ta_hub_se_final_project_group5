import React, { useState, useEffect } from 'react';
import { Form, Input, Rate, Button, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const PerformanceForm = () => {
  const [form] = Form.useForm();
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    // Fetch the list of accepted candidates from the server
    axios
      .get('http://localhost:3005/get-name')
      .then((response) => {
        const acceptedCandidates = response.data;
        console.log(acceptedCandidates)
        setCandidates(acceptedCandidates);
      })
      .catch((error) => {
        console.error('Error fetching accepted candidates:', error);
      });
  }, []);

  const onFinish = async (values) => {
    try {
      // Add the selected candidate's name to the form values
      const performanceData = { ...values, name: selectedCandidate };
  
      // Send the form data to the server
      const response = await axios.post('http://localhost:3005/submit-performance', performanceData);
  
      if (response.data.message === 'Data inserted successfully') {
        message.success('Performance submitted successfully!');
        form.resetFields();
        setSelectedCandidate(null);
      } else {
        message.error('Failed to submit performance.');
      }
    } catch (error) {
      console.error('Error submitting performance:', error);
      message.error('An error occurred while submitting performance.');
    }
  };
  

  const handleCandidateSelect = (value) => {
    setSelectedCandidate(value);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="name" label="Candidate Name" rules={[{ required: true, message: 'Please select a candidate' }]}>
        <Select showSearch optionFilterProp="children" onChange={handleCandidateSelect} filterOption={(input, option) =>
          option.children.indexOf(input) >= 0
        }>
          {candidates.map((candidate) => (
            <Option key={candidate} value={candidate}>
              {candidate}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="teachingEffectiveness" label="Teaching Effectiveness">
        <Rate allowHalf />
      </Form.Item>
      <Form.Item name="studentInteraction" label="Student Interaction and Support">
        <Rate allowHalf />
      </Form.Item>
      <Form.Item name="gradingAndAssessment" label="Grading and Assessment">
        <Rate allowHalf />
      </Form.Item>
      <Form.Item name="preparationAndOrganization" label="Preparation and Organization">
        <Rate allowHalf />
      </Form.Item>
      <Form.Item name="professionalismAndCollaboration" label="Professionalism and Collaboration">
        <Rate allowHalf />
      </Form.Item>
      <Form.Item name="adaptability" label="Adaptability">
        <Rate allowHalf />
      </Form.Item>
      <Form.Item name="knowledgeAndExpertise" label="Knowledge and Expertise">
        <Rate allowHalf />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PerformanceForm;
