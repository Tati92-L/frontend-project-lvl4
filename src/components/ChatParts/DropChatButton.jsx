import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function DropChatButton({
  channel, currentChat, updateChannel, showModal,
}) {
  const handleClick = channel.id === currentChat ? null : () => updateChannel(channel.id);
  const { t } = useTranslation('translation', { keyPrefix: 'chatPage.chatColumn' });
  const variant = channel.id === currentChat ? 'secondary' : 'light';

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button onClick={handleClick} variant={variant} className="w-100 rounded-0 text-start noFocus">
        <span className="me-1">#</span>
        {channel.name}
      </Button>
      <Dropdown.Toggle split variant={variant} className="noFocus">
        <span className="visually-hidden">{t('changeChnlBtn')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => showModal('removeChannel', { id: channel.id })}>{t('removeBtn')}</Dropdown.Item>
        <Dropdown.Item onClick={() => showModal('renameChannel', channel)}>{t('renameBtn')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
