import React, { useState } from 'react';
import { Layout, Menu, Form, Input, Select, Button } from 'antd';
import { useRouter } from 'next/router';
import {
  UserOutlined, // Profile icon
  BarChartOutlined, // Status icon
  LogoutOutlined, // Logout icon
} from '@ant-design/icons';
import ProfileInstructorPage from './ProfileInstructorPage';
import AssessPerformanceForm from './assessPerformance';
const { Header, Content, Sider } = Layout;
const { Item } = Menu;
const { Option } = Select;

// Import the components that you want to display for each menu item


const TACommitteeMemberDashboard = () => {
  const router = useRouter();

  // State to track the selected menu item
  const [selectedMenuItem, setSelectedMenuItem] = useState('profile');

  // Function to handle menu item clicks and set the selected menu item
  const handleMenuItemClick = (item) => {
    const menuItemKey = item.key;
    setSelectedMenuItem(item.key);
    
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

  // Define a mapping of menu items to their corresponding components
  const menuComponentMap = {
    profile: <ProfileInstructorPage/>,
    'assess-performance':  <AssessPerformanceForm/>,
  };

  // Retrieve the selected component based on the selected menu item
  const selectedComponent = menuComponentMap[selectedMenuItem];

  return (
    <Layout style={layoutStyles}>
      {/* Sidebar */}
      <Sider width={200} theme="dark" style={sidebarStyles}>
        <div className="logo">Your Logo</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['profile']} onClick={handleMenuItemClick}>
          <Item key="profile" icon={<UserOutlined />}>
            Profile
          </Item>
          <Item key="assess-performance" icon={<BarChartOutlined />}>
            Assess performance
          </Item>
          <Item key="logout" icon={<LogoutOutlined />}>
            Logout
          </Item>
        </Menu>
      </Sider>

      {/* Content */}
      <Layout style={contentStyles}>
        <Header style={headerStyles}>
          <h1 style={textCenterStyles}>Instructor Dashboard</h1>
        </Header>
        <Content style={{ background: 'dark', padding: '16px', color: 'white' }}>
          {selectedComponent}
        </Content>
      </Layout>
    </Layout>
  );
};

export default TACommitteeMemberDashboard;
