import React from 'react';
import { Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ menuItems }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Nav className="flex-column bg-light vh-100 p-3" activeKey={location.pathname}>
      {menuItems.map((item) => (
        <Nav.Link
          key={item.path}
          href="#"
          onClick={() => navigate(item.path)}
          className={location.pathname === item.path ? 'active' : ''}
        >
          {item.label}
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default Sidebar;
