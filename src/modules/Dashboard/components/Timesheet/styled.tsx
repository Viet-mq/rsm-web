import {Calendar, Popover, Tag} from 'antd';
import styled from 'styled-components';
import React from 'react';

export const StyledCalendar = styled(Calendar)`
  background-color: #fff;

  .ant-fullcalendar-calendar-body {
    padding: 0;
  }

  .ant-fullcalendar-column-header {
    padding: 15px 5px;
    text-align: center;
    background-color: #f2f2f2;

    &:not(:last-child) {
      border-right: 1px solid #e8e8e8;
    }

    .ant-fullcalendar-column-header-inner {
      font-weight: 500;
      text-transform: uppercase;
    }
  }

  .ant-fullcalendar-cell {
    overflow: hidden;
    padding: 5px;
    border-top: 1px solid #e8e8e8;

    &:not(:last-child) {
      border-right: 1px solid #e8e8e8;
    }
  }

  .ant-fullcalendar-next-month-btn-day,
  .ant-fullcalendar-last-month-cell {
    color: #dadada;
  }
`;

export const Cell = styled(props => <div {...props} />)`
  overflow: hidden;
  height: 81px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  opacity: ${props => (props as any).opacity || 1}
`;

export const Row = styled(props => <div {...props} />)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;


export const Date = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: #979797;
  line-height: 20px;
`;

export const Icon = styled.img`
  margin: 2px;
  height: 12px;
`;

export const Total = styled.div`
  color: #595959;
  margin: 2px;
  font-weight: 500;
  display: inline-block;
  font-family: Roboto;
  font-size: 13px;
  light-height: 15px;
`;

export const CheckIn = styled(Tag)`
    color: #595959;
    border: unset;
    padding: 0px 3px;
    font-size: 12px;
    border-radius: 2px;
`;

export const Label = styled(Tag)`
  font-weight: 500;
  font-size: 12px;
  margin: 0;
  color: #595959;
  border-radius: 2px;
  border: unset;
  line-height: 20px;
  text-transform: uppercase;
  background-color: #F4F4F4;
`;

export const SmallLabel = styled(Label)`
  color: #fff;
  font-size: 10px;
  line-height: 10px;
  padding: 2px 3px;
`;

export const SmallLabel2 = styled(Label)`
  line-height: 10px;
  padding: 2px 3px;
  color: #fff;
  font-size: 10px;
`;


export const ActionItem = styled.div`
  color: #000;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }

  &:last-child {
    border-top: 1px solid #e8e8e8;
  }
`;

export const ActionWrapper = styled.div``;

export const StyledPopover = styled(({className, ...props}) => <Popover overlayClassName={className} {...props} />)`
  .ant-popover-inner-content {
    padding: 0;
  }
`;
