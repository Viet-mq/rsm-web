import styled from 'styled-components';
import { Divider } from 'antd';

export const Panel = styled.section`
  background-color: #fff;
`

export const PanelHeader = styled.header`
  background-color: #F4F4F4;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const PanelContent = styled.div`
  padding: 10px 20px 30px 20px;
`

export const H3 = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
`

export const H4 = styled.h4`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`

export const StyledDivider = styled(Divider)`
    height: 43px;
    color: #D9D9D9;
`

export const Heading = styled(H4)`
    margin-bottom: 10px;
    text-transform: uppercase;
`

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 25%;
    overflow: hidden;
`
export const BoxTimekeeping = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 45%;
    overflow: hidden;
`

export const BigText = styled.span`
    font-weight: 500;
    font-size: 18px;
    line-height: 18px;
    color: #27343B;
    margin-bottom: 5px;
`

export const Label = styled.span`
    color: #979797;
    font-size: 8.5px;
    text-transform: uppercase;
`

export const AggregationWorkTime = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 234px;
`

export const WorkTime = styled.div`
    display: flex;
    flex-driection: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    background: #F4F4F4;
    border: 1px solid #E5EBF1;
    border-radius: 4px;
`

export const WorkTimeTitle = styled.div`
    text-transform: uppercase;
    font-size: 12px;
    width: 30%
`