import React from 'react';

const textStyles = {
  fontSize: '12rem',
  textAlign: 'center',
  position: 'absolute',
  left: '50%',
  top: '50%',
  marginTop: '-6rem',
  marginLeft: '-100px'
};

const containerStyles = {
  position: 'absolute',
  zIndex: -10,
  top: '0',
  right: '0',
  bottom: '0',
  left: '0'
};

const notFound = () => {
  return (
    <div className="App container">
      <div style={ containerStyles }>
        <h1 style={ textStyles }>404</h1>
      </div>
    </div>
  );
};
export default notFound;