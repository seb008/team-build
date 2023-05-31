import React, { useState } from 'react';
import './tooltip.scss';

function Tooltip({ children, content }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && <div className="tooltip">{content}</div>}
    </div>
  );
}

export default Tooltip;