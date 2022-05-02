import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useSocket from '../hooks/useSocket.jsx';

export default function RemoveChannelModal(props) {
  const { onHide, modalInfo } = props;
  const { id } = modalInfo.item;
  const { removeChannel } = useSocket();
  const { t } = useTranslation('translation', { keyPrefix: 'modalElements' });

  const handleRemoveChannel = () => {
    removeChannel(id);
    onHide();
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title className="h4">{t('removeModal.modalTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('removeModal.removeQuestion')}</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={() => onHide()}>
          {t('modalBtn.cancelBtn')}
        </Button>
        <Button type="submit" variant="danger" className="me-2" onClick={handleRemoveChannel}>
          {t('modalBtn.removeBtn')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
