import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message, Row, Col, Typography } from 'antd';
import axios from 'axios';

const { Option } = Select;
const { Title } = Typography;

const PerformanceForm = () => {
  const [form] = Form.useForm();
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [teachingEffectiveness, setTeachingEffectiveness] = useState(0);
  const [studentInteraction, setStudentInteraction] = useState(0);
  const [gradingAndAssessment, setGradingAndAssessment] = useState(0);
  const [preparationAndOrganization, setPreparationAndOrganization] = useState(0);
  const [professionalismAndCollaboration, setProfessionalismAndCollaboration] = useState(0);
  const [adaptability, setAdaptability] = useState(0);
  const [knowledgeAndExpertise, setKnowledgeAndExpertise] = useState(0);

  useEffect(() => {
    // Fetch the list of accepted candidates from the server
    axios
      .get('http://localhost:3005/get-name')
      .then((response) => {
        const acceptedCandidates = response.data;
        setCandidates(acceptedCandidates);
      })
      .catch((error) => {
        console.error('Error fetching accepted candidates:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch performance data when a candidate is selected
    if (selectedCandidate) {
      axios
        .get(`http://localhost:3005/get-performance?name=${selectedCandidate}`)
        .then((response) => {
          const data = response.data;
          setTeachingEffectiveness(data.TeachingEffectiveness || 0);
          setStudentInteraction(data.StudentInteractionAndSupport || 0);
          setGradingAndAssessment(data.GradingAndAssessment || 0);
          setPreparationAndOrganization(data.PreparationAndOrganization || 0);
          setProfessionalismAndCollaboration(data.ProfessionalismAndCollaboration || 0);
          setAdaptability(data.Adaptability || 0);
          setKnowledgeAndExpertise(data.KnowledgeAndExpertise || 0);
        })
        .catch((error) => {
          console.error('Error fetching performance data:', error);
        });
    }
  }, [selectedCandidate]);

  const onFinish = async (values) => {
    // Handle form submission if needed
  };

  const handleCandidateSelect = (value) => {
    setSelectedCandidate(value);
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Candidate Name"
          rules={[{ required: true, message: 'Please select a candidate' }]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            onChange={handleCandidateSelect}
            filterOption={(input, option) =>
              option.children.indexOf(input) >= 0
            }
          >
            {candidates.map((candidate) => (
              <Option key={candidate} value={candidate}>
                {candidate}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
        
        </Form.Item>
      </Form>

      {selectedCandidate && (
        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={24}>
            <Title level={4}>{selectedCandidate}'s Performance:</Title>
          </Col>
          <Col span={4}>
            <Title level={5}>Teaching Effectiveness:</Title>
            <p>{teachingEffectiveness}</p>
          </Col>
          <Col span={4}>
            <Title level={5}>Student Interaction:</Title>
            <p>{studentInteraction}</p>
          </Col>
          <Col span={4}>
            <Title level={5}>Grading and Assessment:</Title>
            <p>{gradingAndAssessment}</p>
          </Col>
          <Col span={4}>
            <Title level={5}>Preparation and Organization:</Title>
            <p>{preparationAndOrganization}</p>
          </Col>
          <Col span={4}>
            <Title level={5}>Professionalism and Collaboration:</Title>
            <p>{professionalismAndCollaboration}</p>
          </Col>
          <Col span={4}>
            <Title level={5}>Adaptability:</Title>
            <p>{adaptability}</p>
          </Col>
          <Col span={4}>
            <Title level={5}>Knowledge and Expertise:</Title>
            <p>{knowledgeAndExpertise}</p>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default PerformanceForm;
