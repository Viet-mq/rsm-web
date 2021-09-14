import React from 'react';
import { Heading, AggregationWorkTime, WorkTime, WorkTimeTitle, BigText, StyledDivider, Box, Label, BoxTimekeeping } from './styled';

/**
 * Statistc component
 * @param props
 * data = [{title: 'công chuẩn', morning: '12; night: '10;}, {{title: 'tổng công', morning: '12; night: '10;}}]
 * heading = 'chấm công'
 */
const TimeKeeping = (props: any) => {
    const { heading, data } = props
    return (
        <>
            <Heading>{heading}</Heading>
            <AggregationWorkTime>
                {data.map((item: any, index: any) => (
                    <WorkTime key={index}>
                        <WorkTimeTitle>{item.title}</WorkTimeTitle>
                        <BoxTimekeeping>
                            <BigText>{item.day}</BigText>
                            <Label>{item.subTitle ? item.subTitle[0]: 'CA NGÀY'}</Label>
                        </BoxTimekeeping>
                        <StyledDivider type="vertical" />
                        <Box>
                            <BigText>{item.night}</BigText>
                            <Label>{item.subTitle ? item.subTitle[1]: 'CA ĐÊM'}</Label>
                        </Box>
                    </WorkTime>
                ))}
            </AggregationWorkTime>
        </>
    )
};

export default TimeKeeping;
