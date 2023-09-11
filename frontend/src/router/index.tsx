import React, { ComponentProps } from "react";
import { BrowserRouter as Router } from "react-router-dom";

const Root: React.FC<ComponentProps<"div">> = ({ children }) => {
  return <Router>{children}</Router>;
};

export default Root;
