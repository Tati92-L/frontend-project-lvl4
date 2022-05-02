import React, { useEffect, useRef, useState } from 'react';
import { object, string } from 'yup';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import useSocket from '../hooks/useSocket.jsx';
import { selectors as channelSelectors } from '../slices/channelsSlice.js';

export default function RenameChannelModal(props) {
  const { onHide, modalInfo } = props;
  const { id, name } = modalInfo.item;
  const { renameChannel } = useSocket();
  const inputRef = useRef();
  const { t } = useTranslation('translation', { keyPrefix: 'modalElements' });

  const [fieldInvalid, setFieldInvalid] = useState(false);
  const [validationError, setValidationError] = useState(null);

  const channels = useSelector((state) => channelSelectors.selectAll(state));
  const channelsNames = channels.map((channel) => channel.name);

  const userSchema = object().shape({
    body: string()
      .min(3, (t('modalValid.modalMin')))
      .max(20, (t('modalValid.modalMax')))
      .required((t('modalValid.modalRequired')))
      .notOneOf(channelsNames, t('modalValid.uniqueChnlName')),
  });

  const formik = useFormik({
    initialValues: { body: name },

    onSubmit: async (values) => {
      try {
        await userSchema.validate(values);
        setValidationError(null);
        setFieldInvalid(false);
        const { body } = values;
        renameChannel({ id, name: body });
        onHide();
      } catch (err) {
        setValidationError(err.message);
        setFieldInvalid(true);
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  return (
    <Modal show>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title className="h4">{t('renameModal.modalTitle')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control 
              name="body"
              data-testid="input-body"
              className="mb-2"
              value={formik.values.body}
              placeholder={t('addChannelModal.modalInput')}
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={fieldInvalid}
              required
            />
            <Form.Label className="visually-hidden">{t('renameModal.inputLabel')}</Form.Label>
            <Form.Control.Feedback type="invalid">{validationError}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={() => onHide()}>
            {t('modalBtn.cancelBtn')}
          </Button>
          <Button type="submit" variant="primary" className="me-2">
            {t('modalBtn.sendBtn')}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
