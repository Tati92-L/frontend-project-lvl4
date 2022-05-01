import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';

export default function DropChatButton({
  channel, currentChat, updateChannel, showModal,
}) {
  const handleClick = channel.id === currentChat ? null : () => updateChannel(channel.id);

  return (
    <Dropdown as={ButtonGroup} className="flex-grow-0">
      <Button onClick={handleClick} className="w-100 rounded-0 text-start">
        <span className="me-1">#</span>
        {channel.name}
      </Button>
      <Dropdown.Toggle split>
        <span className="visually-hidden">Управление каналом</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => showModal('removeChannel', { id: channel.id })}>Удалить</Dropdown.Item>
        <Dropdown.Item onClick={() => showModal('renameChannel', channel)}>Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
