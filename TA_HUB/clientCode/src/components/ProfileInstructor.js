import React from 'react';
import { Form, Input, Card } from 'antd';
import { useSelector } from 'react-redux';
const ProfileSection = () => {
  const email = useSelector((state) => state.email.email);
  const usertype=useSelector((state) => state.email.userType);
  const name= useSelector((state) => state.email.name);
  return (
    <Card
      title="Profile"
      style={{ width: 300, textAlign: 'center' }}
      cover={
        <img
        style={{ height: '199px', objectFit: 'cover' }}
          alt="Profile"
          src="https://static.thenounproject.com/png/64958-200.png"></img>
      }   
    >
      <Form name="profileForm">
        <Form.Item label="Name" >
          <Input value={name} style={{ border: 'none', background: 'transparent'}} readOnly />
        </Form.Item>
        <Form.Item label="Email">
          <Input value={email} style={{ border: 'none', background: 'transparent'}} readOnly />
        </Form.Item>
        <Form.Item label="Usertype">
          <Input value={usertype} style={{ border: 'none', background: 'transparent'}} readOnly />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProfileSection;
