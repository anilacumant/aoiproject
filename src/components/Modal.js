import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

const Modal = ({ title, show, onHide, children, onSubmit }) => {
  return (
    <BootstrapModal show={show} onHide={onHide} centered>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>{children}</BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Save Changes
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;
