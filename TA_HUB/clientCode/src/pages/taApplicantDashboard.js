import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import ApplicationFormTAPage from './ApplicationFormTAPage';
import ProfileTAPage from './ProfileTAPage';
import { useRouter } from 'next/router';
import {
  UserOutlined,
  FileAddOutlined,
  CheckOutlined,
  ScheduleOutlined ,
  LogoutOutlined,
} from '@ant-design/icons';
import ApplicationStatusPage from './ApplicationStatusPage';
import loginAct from './loginPage';
import ApplicationScheduleDisplay from './applicationSchedule';

const { Header, Content, Sider } = Layout;
const { Item } = Menu;

const TAApplicantsDashboard = () => {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState('profile');

  const handleMenuItemClick = (item) => {
    setSelectedSection(item.key);
    if (item.key === 'logout') {
      // Route to the sign-in page when "Signout" is clicked
      router.push('/loginPage'); // Replace '/signin' with the actual sign-in page URL
    }
  };

  const layoutStyles = {
    display: 'flex',
    minHeight: '100vh',
  };

  const sidebarStyles = {
    width: '200px',
    background: 'dark',
  };

  const contentStyles = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const headerStyles = {
    backgroundColor: '#008b8b',
    color: 'white',
    width: '100%',
  };

  const textCenterStyles = {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '24px',
  };

  return (
    <Layout style={layoutStyles}>
      <Sider width={200} theme="dark" style={sidebarStyles}>
        <div className="logo">Your Logo</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['profile']} onClick={handleMenuItemClick}>
          <Item key="profile" icon={<UserOutlined />}>
            Profile
          </Item>
          <Item key="application-form" icon={<FileAddOutlined />}>
            Application Form
          </Item>
          <Item key="application-status" icon={<CheckOutlined />}>
            Application Status
          </Item>
          <Item key="application-schedule" icon={< ScheduleOutlined  />}>
            Application Schedule
          </Item>
          <Item key="logout" icon={<LogoutOutlined />}>
            Logout
          </Item>
        </Menu>
      </Sider>

      <Layout style={contentStyles}>
        <Header style={headerStyles}>
          <h1 style={textCenterStyles}>TA Applicants Dashboard</h1>
        </Header>
        <Content style={{ background: 'dark', padding: '16px', color: 'white' }}>
          {selectedSection === 'profile' && <ProfileTAPage/>}
          {selectedSection === 'application-form' && <ApplicationFormTAPage/>}
          {selectedSection === 'application-status' && <ApplicationStatusPage/>}
          {selectedSection === 'logout' &&  <loginAct/>}
          {selectedSection === 'application-schedule' &&  <ApplicationScheduleDisplay/>}
          
          {/* Render header and image when no section is selected */}
          {selectedSection === '' && (
            <div>
              <Header style={headerStyles}>
                <h1 style={textCenterStyles}>Welcome to TA Applicants Dashboard</h1>
              </Header>
              <img
                src="https://images.pexels.com/photos/1181487/pexels-photo-1181487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Replace with your image URL and dimensions
                alt="Welcome"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default TAApplicantsDashboard;
