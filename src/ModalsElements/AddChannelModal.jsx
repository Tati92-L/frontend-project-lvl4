import React, { useEffect, useRef, useState } from 'react';
import { object, string } from 'yup';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectors as channelSelectors } from '../slices/channelsSlice.js';
import useSocket from '../hooks/useSocket.jsx';
import useToastify from '../hooks/useToastify.jsx';
// import useAuth from '../hooks/useAuth.jsx';
// eslint-disable-next-line import/no-cycle
import { getUsername } from '../components/ChatParts/ChatPage.jsx';

export default function AddChannelModal(props) {
  const { onHide } = props;

  const { createNewChannel } = useSocket();
  const [fieldInvalid, setFieldInvalid] = useState(false);
  const [validationError, setValidationError] = useState('');
  const inputRef = useRef();
  const { t } = useTranslation('translation', { keyPrefix: 'modalElements' });
  const { successMessage } = useToastify();

  const channels = useSelector((state) => channelSelectors.selectAll(state));
  const channelsNames = channels.map((cnl) => cnl.name);

  const userSchema = object().shape({
    body: string().min(3, t('modalValid.minMaxLength')).max(20, t('modalValid.minMaxLength')).required(t('modalValid.modalRequired'))
      .notOneOf(channelsNames, t('modalValid.uniqueChnlName')),
  });

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async (values) => {
      try {
        console.log(values);
        await userSchema.validate(values);
        setValidationError(null);
        setFieldInvalid(false);
        createNewChannel({
          name: values.body,
          author: getUsername(),
        });
        onHide();
      } catch (err) {
        setValidationError(err.message);
        setFieldInvalid(true);
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title className="h4">{t('addChannelModal.modalTitle')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
              data-testid="input-body"
              name="body"
              placeholder={t('addChannelModal.modalInput')}
              isInvalid={fieldInvalid}
              className="mb-2"
            />
            <Form.Label className="visually-hidden">{t('addChannelModal.inputLabel')}</Form.Label>
            <Form.Control.Feedback type="invalid">{validationError}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={() => onHide()}>
            {t('modalBtn.cancelBtn')}
          </Button>
          <Button type="submit" variant="primary" onClick={() => successMessage(t('toastNotification.createToast'))}>
            {t('modalBtn.sendBtn')}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
