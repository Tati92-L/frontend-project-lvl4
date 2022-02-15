import React from 'react';

export default function NoMatch() {
    let location = useLocation();
  
    return (
      <div>
        <h3>
          No match for <code>{location.pathname}</code>
        </h3>
        <p>404 Not Found</p>
      </div>
    );
  }