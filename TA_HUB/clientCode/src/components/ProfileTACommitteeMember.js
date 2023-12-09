import React from 'react';
import { Form, Input, Card } from 'antd';
import { useSelector } from 'react-redux';

const ProfileSectionCommitteeMember = () => {
  const email = useSelector((state) => state.email.email);
  const usertype = useSelector((state) => state.email.userType);
  const name = useSelector((state) => state.email.name);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card
        title="Profile"
        style={{ width: 300, textAlign: 'center', marginTop: 0 }}
        cover={
          <img
            style={{ height: '199px', objectFit: 'cover' }}
            alt="Profile"
            src="https://t4.ftcdn.net/jpg/05/39/21/63/360_F_539216383_fKYlM8nWdmdgscQ9qllXSfL4koTD75O7.jpg"
          />
        }
      >
        <Form name="profileForm">
          <Form.Item label="Name">
            <Input value={name} style={{ border: 'none', background: 'transparent' }} readOnly />
          </Form.Item>
          <Form.Item label="Email">
            <Input value={email} style={{ border: 'none', background: 'transparent' }} readOnly />
          </Form.Item>
          <Form.Item label="Usertype">
            <Input value={usertype} style={{ border: 'none', background: 'transparent' }} readOnly />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProfileSectionCommitteeMember;
