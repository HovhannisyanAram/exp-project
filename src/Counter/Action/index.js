import React from 'react';

import Counter from '../../Counter/index';

const Action = () => {
  return(
  <div>
    <span>
      <button onClick={() => {Counter.handlePlusCount()}}>+</button>
      <button onClick={() => {Counter.handleMinusCount()}}>-</button>
    </span>
  </div>
  )
};

export default Action;