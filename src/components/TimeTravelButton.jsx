import React from 'react';

export default function TimeTravelButton({
  onClick,
  children,
  highlight = false,
}) {
  const className = highlight ? 'current-move-button' : 'move-button';
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
