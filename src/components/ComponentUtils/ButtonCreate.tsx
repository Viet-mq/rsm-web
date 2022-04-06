import React from 'react';
import {Button, Icon} from "antd";
import {CheckViewAction} from "../../helpers/utilsFunc";

interface ButtonCreateProps {
  path?: any,
  action?: any,
  name?: any,
  type?: any,
  size?: any,
  handleClick?: (event?: any, record?: any) => void
}

const ButtonCreate = (props: ButtonCreateProps) => {
  const {path, name, action, handleClick, type, size} = props
  return (
    <div style={type?{display:"inherit",marginRight:4}:{display: "inline-block"}}>
      {CheckViewAction(path, action)
        ?
        <Button className="ant-btn ml-1 mr-1 ant-btn-sm"
                onClick={handleClick}
                type={type}
                size={size}
                style={size?{height:"inherit"}:{height:32}}
        >
          <Icon type="plus"/>{name}
        </Button>
        : null}

    </div>
  )
}

export default ButtonCreate
