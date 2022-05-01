import React from 'react';
import { Button } from 'react-bootstrap';

export default function ChatButton({ channel, currentChat, updateChannel }) {
  const handleClick = channel.id === currentChat ? null : () => updateChannel(channel.id);

  return (
    <Button type="button" onClick={handleClick} className="w-100 rounded-0 text-start text-truncate btn">
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  );
}
