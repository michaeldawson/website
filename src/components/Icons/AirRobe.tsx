import * as React from "react";
import IconWrapper from "../IconWrapper";

export default function AirRobeIcon(props) {
  return (
    <IconWrapper white name="AirRobe" {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        viewBox="0 67.9 189.963 189.237"
        height={32}
        style={{ marginBottom: 7 }}
        {...props}
      >
        <path
          fill="#ff9579"
          d="M189.963 72.23v184.907h-23.835V217.41c-15.167 24.2-40.809 39.727-72.951 39.727C42.255 257.137 0 215.966 0 162.516S42.255 67.9 93.177 67.9c32.142 0 57.784 15.529 72.951 39.726V72.23zm-23.835 90.286c0-40.087-31.058-71.507-71.146-71.507s-71.145 31.42-71.145 71.507 31.058 71.507 71.145 71.507 71.146-31.423 71.146-71.507z"
        />
      </svg>
    </IconWrapper>
  );
}
