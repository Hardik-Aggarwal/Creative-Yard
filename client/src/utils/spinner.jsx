import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  position :absolute;
  left: 100%; 
  top: 100%; 
  z-index: 0;
  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 1px;
    height: 1px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #f3f3f3;
    border-top-color: #3498db;
    animation: ${rotate} 1s linear infinite;
  }
`;

const LoadingSpinner = () => {
  return <StyledSpinner />;
};

export default LoadingSpinner;
