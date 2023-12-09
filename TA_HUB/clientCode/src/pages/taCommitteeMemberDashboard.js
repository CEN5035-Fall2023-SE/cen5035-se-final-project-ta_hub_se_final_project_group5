import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import AssignTA from './assignTA';
import ProfileTACommitteeMemberPage from './ProfileTACommitteeMemberPage';
import {
  UserOutlined,
  CheckCircleOutlined,
  LogoutOutlined,
  BarChartOutlined,
  ScheduleOutlined 
} from '@ant-design/icons';
import ManageTACandidates from './manageApplicant';
import PerformanceFormTAC from './PerformanceForm2';
const { Header, Content, Sider } = Layout;
const { Item } = Menu;

const TACommitteeMemberDashboard = () => {
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState('profile'); 
  const handleMenuItemClick = (item) => {
    const menuItemKey = item.key;
    setSelectedKey(item.key);
    if (menuItemKey === 'logout') {
   
      router.push('/loginPage'); 
    }
  
  };

  const menuComponentMap = {
    profile: <ProfileTACommitteeMemberPage/>,
    'record-decision': <ManageTACandidates/>,
    'access-performance': <PerformanceFormTAC/>,
    logout: <ProfileTACommitteeMemberPage/>,
    'assign-TA':<AssignTA/>,
  };

  return (
    <Layout style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider width={200} theme="dark" style={{ background: 'dark' }}>
        <div className="logo">Your Logo</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['profile']}
          onClick={handleMenuItemClick}
        >
          <Item key="profile" icon={<UserOutlined/>}>
            Profile
          </Item>
          <Item key="record-decision" icon={<CheckCircleOutlined/>}>
            Record Decisions
          </Item>
          <Item key="assign-TA" icon={<ScheduleOutlined/>}>
            Assign TA
          </Item>
          <Item key="access-performance" icon={<BarChartOutlined/>}>
            Access Performance
          </Item>
          <Item key="logout" icon={<LogoutOutlined/>}>
            Logout
          </Item>
        </Menu>
      </Sider>

      {/* Content */}
      <Layout style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header
          style={{
            backgroundColor: '#008b8b',
            color: 'white',
            width: '100%',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '24px',
          }}
        >
          TA Committee Member Dashboard
        </Header>
        <Content style={{ background: 'dark', padding: '16px', color: 'white', alignItems: 'center', justifyContent: 'center' }}>
          {menuComponentMap[selectedKey]}
        </Content>
      </Layout>
    </Layout>
  );
};

export default TACommitteeMemberDashboard;
