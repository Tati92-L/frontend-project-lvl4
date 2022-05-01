import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import useSocket from '../hooks/useSocket.jsx';

export default function RemoveChannelModal(props) {
  const { onHide, modalInfo } = props;
  const { id } = modalInfo.item;
  const { removeChannel } = useSocket();

  const handleRemoveChannel = () => {
    removeChannel(id);
    onHide();
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title className="h4">Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={() => onHide()}>
          Отменить
        </Button>
        <Button type="submit" variant="danger" className="me-2" onClick={handleRemoveChannel}>
          Отправить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
