import React from 'react';
import {Button, Icon, Popconfirm, Tooltip} from "antd";
import {CheckViewAction} from "../../helpers/utilsFunc";

interface ButtonDeleteProps {
  path?: any,
  action?: any,
  message?: any,
  handleClick?: (event?: any, record?: any) => void
}

const ButtonDelete = (props: ButtonDeleteProps) => {
  const {path, message, action, handleClick} = props
  return (
    <div style={{display: "inline-block"}}>
      {CheckViewAction(path, action)
        ?
        <Popconfirm
          title={`Bạn muốn xóa ${message} này chứ ?`}
          okText="Xóa"
          onCancel={event => {
            event?.stopPropagation();
          }}
          onConfirm={handleClick}
        >
          <Tooltip placement="top" title="Xóa">

            <Button
              size="small"
              className="ant-btn ml-1 mr-1 ant-btn-sm"
              onClick={event => {
                event.stopPropagation();
              }}
            >
              <Icon type="delete" theme="filled"/>
            </Button>
          </Tooltip>

        </Popconfirm>
        : null}

    </div>
  )
}

export default ButtonDelete
