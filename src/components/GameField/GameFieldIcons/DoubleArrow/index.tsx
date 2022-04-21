import React from 'react';

const DoubleArrowUp: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 11l7-7 7 7M5 19l7-7 7 7"
    />
  </svg>
);

const DoubleArrowRight: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 5l7 7-7 7M5 5l7 7-7 7"
    />
  </svg>
);

const DoubleArrowDown: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
    />
  </svg>
);

const DoubleArrowLeft: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
    />
  </svg>
);

export { DoubleArrowUp, DoubleArrowRight, DoubleArrowDown, DoubleArrowLeft };
