import React from "react";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {deleteScript, getListScript, showFormUpdateAddStep} from "../redux/actions";
import styled from "styled-components";
import {Button, Card, Form, Input, Popconfirm} from "antd";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {DeleteScriptRequest, ScriptEntity, Step} from "../types";

const SearchForm = styled.div`
  margin-bottom: 10px;
  .ant-form-item {
    margin: 0;
  }
`;

const ListItem = styled.div`
  
  .item-header{
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-bottom: 15px;
    
    strong {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  
  .list-item{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    
    &__item{
      position: relative;
      width: calc(50% - 5px);
      height: 50px;
      cursor: pointer;
      margin-bottom: 15px;
      
      .ant-btn{
        width: 100%;
        height: 100%;
        padding: 5px 10px;
        border: 1px solid #000;
        border-radius: 5px;
      }
      
      &--close{
        position: absolute;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 0 5px #bbb;
        right: -9px;
        top: -9px;
        font-size: 16px;
        text-align: center;
        line-height: 18px;
        margin: 0;
        z-index: 9;
        
        &:active{
          background: #ccc;
        }
      }
      
      &-title, &-desc{
        display: block;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
      }
      
      &-desc{
        color: #aaa;
      }
      
      &-plus{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

const mapStateToProps = ({scriptManager: {list}}: RootState) => ({list})
const connector = connect(mapStateToProps, {
  getListScript,
  showFormUpdateAddStep,
  deleteScript
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListScript(props: IProps) {

  const onSearchChange = (e: any) => {
  }

  // const onClickCard = (e: any) => {
  //   console.log("on card clicked get template to display");
  // }

  const onClickNew = (event: any, scriptId: string) => {
    props.showFormUpdateAddStep(true);
  }

  const onDeleteScriptClicked = (event: any, item: ScriptEntity) => {
    let req: DeleteScriptRequest = {
      scenario_id: item.scenario_id
    }
    props.deleteScript(req);
  }

  const onDeleteStepClicked = (event: any, step: Step) => {
  }

  return (

    <Card>

      <SearchForm>
        <Form>
          <Form.Item hasFeedback>
            <Input.Search placeholder='Tìm kiếm kịch bản' onChange={onSearchChange}/>
          </Form.Item>
        </Form>
      </SearchForm>

      {props.list.rows?.map((item, i) => {

          return (<ListItem key={i}>
            <div className="item-header">
              <strong>{item.scenario_name}</strong>
              <Popconfirm
                title="Bạn muốn xóa kịch bản này chứ ?"
                okText="Xóa"
                onCancel={event => {
                  event?.stopPropagation();
                }}
                onConfirm={event => onDeleteScriptClicked(event, item)}
              >
                <DeleteOutlined/>
              </Popconfirm>
            </div>

            <div className="list-item">

              {item.list_step?.map(function (step, j) {
                return (
                  <div className="list-item__item" key={step.step_id}>

                    <Popconfirm
                      title="Bạn muốn xóa bước này chứ ?"
                      okText="Xóa"
                      onCancel={event => {
                        event?.stopPropagation();
                      }}
                      onConfirm={event => onDeleteStepClicked(event, step)}
                    >
                      <span className="list-item__item--close">&times;</span>
                    </Popconfirm>
                    <Button>
                      <div className="list-item__item-title">{step.step_name}</div>
                      <div className="list-item__item-desc">{step.step_name}</div>
                    </Button>
                  </div>
                );
              })}

              <div className="list-item__item">
                <Button onClick={event => onClickNew(event, item.scenario_id)} className="list-item__item">
                  <div className="list-item__item-plus">
                    <PlusOutlined style={{fontSize: 32}}/>
                  </div>
                </Button>
              </div>

            </div>

          </ListItem>);

        }
      )}

    </Card>

  );

}

export default connector(ListScript);
