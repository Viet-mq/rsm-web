import React from 'react';
import styled from 'styled-components';

/**
 * Statistic component
 * @param props 
 * data = [{title: 'Số lần đi muộn', value: '5'}, {title: 'Số lần về sớm', value: '5'}]
 * heading = 'thống kê'
 * minHeight = '300px' // conffig height content
 */
const StatisticBox = (props: any) => {
    const { heading, data } = props

    return (
        <>
            <Heading>{heading}</Heading>
            <CategoriesStatistic>
                {data.map((item: { title: string; value: string; }, index: any) => (
                    <Category key={index} >
                        <Title>{item.title}</Title>
                        <Value>{item.value}</Value>
                    </Category>
                ))}
            </CategoriesStatistic>
        </>
    );
};


const Heading = styled.h4`
    font-size: 14px;
    font-weight: 500;
    margin: 0;
    margin-bottom: 10px;
    text-transform: uppercase;
`

const Title = styled.div`
    margin: auto 0;
`

const Value = styled.div`
    font-weight: 500;
    margin: auto 0;
`

const CategoriesStatistic = styled.div`
    display: flex;
    flex-direction: column;
    background: #F4F4F4;
    border: 1px solid #E5EBF1;
    border-radius: 4px;
    padding: 0 10px;
    min-height: 234px;
`

const Category = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    padding: 10px;

    &:not(:last-child) {
        border-bottom: 1px solid #E5EBF1;
    }
`

export default StatisticBox;