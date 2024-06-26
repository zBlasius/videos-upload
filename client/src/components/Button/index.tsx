import React, { MouseEvent, ChangeEvent } from "react";
import Button from 'react-bootstrap/Button';
import "./index.scss"

interface MyButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  label: string;
  variant?: string;
  disabled?: boolean;
  style?: any;
  className?: string;
}

const MyButton = ({ onClick, label, variant = "primary", disabled = false, style, className }: MyButtonProps) => {
  return (
    <Button disabled={disabled} className={`button-main ${className}`} style={{borderRadius:15, width: "100%", height:"100%", ...style}} variant={variant} onClick={onClick}>
      {label}
    </Button>
  );
}

export default MyButton;
