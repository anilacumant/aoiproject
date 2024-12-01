import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

const RoleSelector = ({ onSelect }) => {
  return (
    <Container className="text-center">
      <h2>Select Your Role</h2>
      <Row className="mt-4">
        <Col>
          <Button variant="primary" onClick={() => onSelect('HR')}>
            HR
          </Button>
        </Col>
        <Col>
          <Button variant="success" onClick={() => onSelect('Manager')}>
            Manager
          </Button>
        </Col>
        <Col>
          <Button variant="info" onClick={() => onSelect('Employee')}>
            Employee
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default RoleSelector;
