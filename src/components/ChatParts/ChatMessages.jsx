import React, { useRef, useState, useEffect } from 'react';
import { Col, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function ChatMessages({
  messages, sendMessage, currentChannelId, currentChannelName,
}) {
  const [text, setText] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const lastMessageRef = useRef();
  const inputRef = useRef();
  const { t } = useTranslation('translation', { keyPrefix: 'chatPage.chatMessages' });

  const getUsername = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId) {
      return userId.username;
    }

    return null;
  };

  const handleChangeText = (e) => {
    const messageText = e.target.value;
    setText(messageText);
    setBtnDisabled(!(messageText.length > 0));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    sendMessage(text, currentChannelId, getUsername());
    setText('');
    setBtnDisabled(true);
  };

  useEffect(() => {
    const scrollToBottom = async () => {
      if (messages.length > 0) {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    scrollToBottom();
  }, [messages]);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {currentChannelName}
            </b>
          </p>
          <span className="text-muted">
            {t('messagesCounter.count', { count: messages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          <div id="message-box" className="overflow-auto px-5">
            {
            messages.map((message, index) => (
              <div
                className="message mb-2"
                key={message.id}
                ref={index === (messages.length - 1) ? lastMessageRef : null}
              >
                <b>
                  {message.author}
                  :
                </b>
                {' '}
                {message.messageText}
              </div>
            ))
          }
          </div>
        </div>
        <div className="mt-auto px-5 py-3">
          <Form onSubmit={handleSendMessage} className="py-1 border rounded-2">
            <Form.Group className="input-group has-validation d-flex">
              <Form.Control value={text} onChange={handleChangeText} type="text" placeholder={t('messagePlaceholder')} className="border-0 p-0 ps-2" aria-label={t('messageAriaLabel')} ref={inputRef} />
              <Button type="submit" disabled={btnDisabled} className="btn btn-group-vertical">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                  />
                </svg>
                <span className="visually-hidden">{t('messageSubmitBtn')}</span>
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Col>
  );
}
