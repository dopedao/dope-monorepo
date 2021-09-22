// Conditionally wraps child components with parent tag
import React from 'react';

interface ConditionalWrapProps {
  condition: boolean;
  wrap: (children: JSX.Element) => JSX.Element;
  children: JSX.Element;
}

const ConditionalWrapper = ({ condition, children, wrap }: ConditionalWrapProps) => {
  return condition ? React.cloneElement(wrap(children)) : children;
};

export default ConditionalWrapper;
