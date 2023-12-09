import React, { useState } from 'react';
import { Layout, Menu, Form, Input, Select, Button } from 'antd';
import { useRouter } from 'next/router';

import {
  UserOutlined,
  PlusOutlined,
  BarChartOutlined,
  LogoutOutlined,
  StarOutlined,
  BellOutlined,
  MinusOutlined,
  DownOutlined 
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const { Item } = Menu;

// Import the components that you want to display for each menu item
import ProfileAdministratorPage from './ProfileAdministratorPage';
import AddCourseForm from '../components/courseAdd';
import DropCoursesPage from './DropCoursesPage';
import SelectTAApplicants from './selectTAApplicants';
import NotifyApplicant from './notifyApplicants';
import PerformanceForm from './PerformanceForm';


const AdministratorDashboard = () => {
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState('/profile'); // Initialize with '/profile' as the default selected key

  // Function to handle menu item clicks and navigate to the respective pages
  const handleMenuItemClick = (item) => {
    const menuItemKey = item.key;
    setSelectedKey(item.key); // Update the selected key
    if (menuItemKey === 'logout') {
      // Navigate to the logout page when the "Logout" menu item is clicked
      router.push('/loginPage'); // Change '/logout' to the actual URL of your logout page
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
      {/* Sidebar */}
      <Sider width={200} theme="dark" style={sidebarStyles}>
        <div className="logo">Your Logo</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuItemClick}
        >
          <Item
            key="/profile"
            icon={<UserOutlined />}
          >
            Profile
          </Item>
          <Item
            key="/add-courses"
            icon={<PlusOutlined />}
          >
            Add Courses
          </Item>
          <Item
            key="/drop-courses"
            icon={<MinusOutlined/>}
          >
           Drop Courses
          </Item>
          <Item
            key="/select-ta-applicants"
            icon={<DownOutlined />}
          >
            Recommend TA Applicants
          </Item>
          <Item
            key="/notify-applicant"
            icon={<BellOutlined />}
          >
            Notify TA Applicants
          </Item>
          <Item
            key="/access-performance"
            icon={<BarChartOutlined />}
          >
            Access performance
          </Item>
          <Item
            key="logout"
            icon={<LogoutOutlined />}
          >
            Logout
          </Item>
        </Menu>
      </Sider>

      {/* Content */}
      <Layout style={contentStyles}>
        <Header style={headerStyles}>
          <h1 style={textCenterStyles}>Administrator Dashboard</h1>
        </Header>
        <Content style={{ background: 'dark', padding: '16px', color: 'black' }}>
          {selectedKey === '/profile' && <ProfileAdministratorPage />}
          {selectedKey === '/add-courses' && <AddCourseForm/>}
          {selectedKey === '/drop-courses' && <DropCoursesPage/>}
          {selectedKey === '/select-ta-applicants' &&<SelectTAApplicants/>}
          {selectedKey === '/access-performance' && <PerformanceForm />}
          {selectedKey === '/notify-applicant' && <NotifyApplicant />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdministratorDashboard;
