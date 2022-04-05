import React from 'react';
import {Button, Icon} from "antd";
import {CheckViewAction} from "../../helpers/utilsFunc";

interface ButtonUpdateProps {
  path?: any,
  action?: any,
  handleClick?: (event?: any, record?: any) => void
}

const ButtonUpdate = (props: ButtonUpdateProps) => {
  const {path, action, handleClick} = props
  return (
    <div style={{display:"inline-block"}}>
      {CheckViewAction(path, action)
        ?
        <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm"
                onClick={handleClick}
        >
          <Icon type="edit"/>
        </Button>
        : null}

    </div>
  )
}

export default ButtonUpdate
