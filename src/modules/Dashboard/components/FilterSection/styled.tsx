import styled from 'styled-components';
import { Icon, Row, Divider} from 'antd';


export const PageHeader = styled(Row)`
    background-color: #F4F4F4;
    padding: 6px 0px 10px 0px;
    .tmp-btn {
        margin-left: 10px;

        button {
            color: #02a7f0;
            border-color: #02a7f0;
        }
    }
`;

export const Wrapper = styled.section`
    min-height: 375px;
    background-color: #fff;
`

export const PanelContent = styled.div`
  padding: 10px 20px 30px 20px;
`

export const StyledDivider = styled(Divider)`
  height: 43px;
  color: #D9D9D9;
`

export const Heading = styled.h4`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`

export const Padding = styled.div`
    margin: 0px 10px;
    display: flex;
    position: relative;
    justify-content: space-between;
`;

export const SearchIcon = styled(Icon)`
    position: absolute;
    top: 10px;
    left: 10px;
`

export const Title = styled.div``

export const Value = styled.div`
    font-weight: 500;
`

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`

export const BigText = styled.span`
    font-weight: 500;
    font-size: 30px;
    line-height: 30px;
    color: #27343B;
`

export const Label = styled.span`
    color: #979797;
    font-size: 12px;
`

export const CategoriesStatistic = styled.div`
    display: flex;
    flex-direction: column;
    background: #F4F4F4;
    border: 1px solid #E5EBF1;
    border-radius: 4px;
    padding: 0 10px;
    flex: 1;
    min-height: 285px;
    max-height: 285px;
    overflow-y: auto;
`

export const Category = styled.div`
    align-items: center;
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    padding: 5px 10px;
    min-height: 56px;
    &:not(:last-child) {
        border-bottom: 1px solid #E5EBF1;
    }
`

export const AggregationWorkTime = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 250px;
`

export const WorkTime = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    background: #F4F4F4;
    border: 1px solid #E5EBF1;
    border-radius: 4px;
`

export const WorkTimeTitle = styled.div`
    width: 40%;
`

export const AggregationDayOff = styled.div`
    height: 100%;
    display: flex;
    min-height: 250px;
    flex-direction: column;
    padding: 12px 20px;
    background: #F4F4F4;
    border: 1px solid #E5EBF1;
    border-radius: 4px;
`

export const DayOffRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 6px;
    margin-bottom: 30px;
`

export const DayOffBox = styled(Box)`
    width: 40%;
`