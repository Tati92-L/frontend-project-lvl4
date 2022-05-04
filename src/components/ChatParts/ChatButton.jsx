import React from 'react';
import { Button } from 'react-bootstrap';

export default function ChatButton({ channel, currentChat, updateChannel }) {
  const handleClick = channel.id === currentChat ? null : () => updateChannel(channel.id);
  const variant = channel.id === currentChat ? 'secondary' : 'light';

  return (
    <Button variant={variant} type="button" onClick={handleClick} className="w-100 rounded-0 text-start">
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  );
}
