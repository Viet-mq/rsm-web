import React, {useEffect, useRef, useState} from "react";
import {ChatBot} from "../types";
import * as apis from "../redux/services/apis";
import {Select} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {chatBotSelected} from "../redux/actions";

const {Option} = Select;

const mapState = ({chatBotManager: {selector_bot}}: RootState) => ({selector_bot})

const connector = connect(mapState, {chatBotSelected});
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
  placeholder?: string;
  allowEmpty?: boolean;
  value?: string | undefined;
  allLabel?: string | undefined

  onChange?(value: string): void;

  onSelected?(object: ChatBot): void;
}

function ChatBotSelector(props: IProps) {
  const ref = useRef();
  const [bots, setBots] = useState<ChatBot[]>([]);
  const [keySearch, setKeySearch] = useState('');

  const getBotsAsync = async (params: any) => {
    const data = await apis.getListChatBots(params);
    setBots(data.rows);
  }

  useEffect(() => {
    getBotsAsync({page: 1, size: 100});
  }, []);

  const onSearchBot = (value: string) => {
    setKeySearch(value);
    let params = {
      "chatbot_name": value,
      "page": 1,
      "size": 100
    }
    getBotsAsync(params);
  }

  const onSelectedBot = (id: string) => {
    let cb: ChatBot = {
      chatbot_id: "",
      chatbot_name: "",
      chatbot_language_id: -1,
      chatbot_description: "",
      active_status: -1,
      training_status: -1,
      create_at: -1,
      update_at: -1,
      create_by: "",
      update_by: "",
    };
    for (let i = 0; i < bots.length; i++) {
      if (bots[i].chatbot_id === id) {
        cb = bots[i];
        break;
      }
    }
    // set to props
    props.chatBotSelected(id, cb);
    if (props.onChange) {
      props.onChange(id);
    }
    if (props.onSelected) {
      props.onSelected(cb);
    }
  }

  return (
    <Select
      showSearch={true}
      onSearch={onSearchBot}
      autoClearSearchValue={false}
      placeholder={props.placeholder}
      value={props.selector_bot.bot_id}
      onChange={(value: string) => {
        onSelectedBot(value);
      }}>

      {props.allowEmpty ? <Option value="">{props.allLabel ? props.allLabel : 'Chọn chat bot'}</Option> : null}

      {bots.map(x => (
        <Option key={x.chatbot_id} value={x.chatbot_id}>
          {x.chatbot_name}
        </Option>
      ))}

    </Select>
  );

}

export default connector(ChatBotSelector);

