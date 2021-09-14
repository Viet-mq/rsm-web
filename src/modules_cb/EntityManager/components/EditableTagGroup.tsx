import React, {useEffect, useRef, useState} from "react";
import {Input, Tag, Tooltip} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

interface IProps {
  current_tags: string[],

  onNewTags?(tags: string[]): void;
}

function EditableTagGroup(props: IProps) {

  const [tags, setTags] = useState<string[]>(props.current_tags);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [editInputIndex, setEditInputIndex] = useState<number>(-1);
  const [editInputValue, setEditInputValue] = useState<string>('');

  const saveInputRef = useRef<any>(null);
  const saveEditInputRef = useRef<any>(null);

  const handleClose = (removedTag: string) => {
    const t = tags.filter(tag => tag !== removedTag);
    setTags(t);
  };

  useEffect(() => {
    if (inputVisible) {
      saveInputRef?.current?.focus();
    }
  }, [inputVisible])

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      let newTags = [...tags, inputValue];
      setTags(newTags);
      if (props.onNewTags) {
        props.onNewTags(newTags);
      }
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: any) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue('');
  };

  return (
    <>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={saveEditInputRef}
              key={tag}
              size="small"
              className="tag-input"
              placeholder="Từ đồng nghĩa"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;

        const tagElem = (
          <Tag
            className="edit-tag"
            key={tag}
            closable={true}
            onClose={() => handleClose(tag)}
          >
              <span
                onDoubleClick={e => {
                  if (index !== 0) {
                    setEditInputIndex(index);
                    setEditInputValue(tag);
                    saveEditInputRef?.current?.focus();
                    e.preventDefault();
                  }
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={saveInputRef}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined/> Thêm
        </Tag>
      )}
    </>
  );

}

export default EditableTagGroup;
