// Component for tracking the user's portfolio
    import React from 'react';

    function Portfolio({ balance }) {
      return (
        <div>
          <h2>Portfolio</h2>
          <p>Your current balance is: {balance} ETH</p>
        </div>
      );
    }

    export default Portfolio;
