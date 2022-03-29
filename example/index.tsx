import React from 'react';
import { render } from 'react-dom';
import { Chart, Line, AxisX, AxisY, Tooltips, Zoom } from '../src';

import mock from './mock.json';


const App = () => {
    const values = [
        mock.map(item => item.temperature),
        mock.map(item => item.humidity),
    ];

    const dates = mock.map(item => item.date);
    const formatLabel = (value: number, line: string) => `${line}: ${value}`;

    return (
        <Chart values={values}>
            <Line label="temperature" color="#73A921" />
            <Line label="humidity" color="#487AFA" />

            <AxisX labels={dates} />
            <AxisY />

            <Zoom />

            <Tooltips formatLabel={formatLabel} />
        </Chart>
    );
};


render(<App />, document.getElementById('root'));
