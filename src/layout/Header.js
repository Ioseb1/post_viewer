import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, UnorderedListOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const Header = () => {
  const [itemClick, setClick] = useState('home');

  const click = (e) => {
    setClick((e.key));
    //console.log(e.key);
  }

  return (
    <Menu onClick={click} selectedKeys={itemClick} mode="horizontal" theme='dark'>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        {/* <Menu.Item key="app" icon={<UnorderedListOutlined />}>
          <Link to="/post">Post</Link>
        </Menu.Item> */}
      </Menu>
  )
}

export default Header