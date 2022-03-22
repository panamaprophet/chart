import React, { useState } from 'react';
import { Chart } from 'chart';
import { render } from 'react-dom';

const App = () => {
    const mock = [
        {"date":"2022-03-13T20:58:33.838Z","humidity":17,"temperature":18},
        {"date":"2022-03-13T21:08:43.827Z","humidity":14,"temperature":25},
        {"date":"2022-03-13T21:18:53.929Z","humidity":11,"temperature":27},
        {"date":"2022-03-13T21:29:04.045Z","humidity":11,"temperature":27},
        {"date":"2022-03-13T21:39:13.833Z","humidity":11,"temperature":27},
        {"date":"2022-03-13T21:49:23.819Z","humidity":12,"temperature":27},
        {"date":"2022-03-13T21:59:33.853Z","humidity":10,"temperature":27},
        {"date":"2022-03-13T22:09:52.508Z","humidity":11,"temperature":27},
        {"date":"2022-03-13T22:19:53.938Z","humidity":9,"temperature":28},
        {"date":"2022-03-13T22:30:06.703Z","humidity":11,"temperature":28},
        {"date":"2022-03-13T22:40:13.980Z","humidity":12,"temperature":28},
        {"date":"2022-03-13T22:50:23.925Z","humidity":12,"temperature":29},
        {"date":"2022-03-13T23:00:33.970Z","humidity":12,"temperature":29},
        {"date":"2022-03-13T23:10:43.794Z","humidity":13,"temperature":29},
        {"date":"2022-03-13T23:20:53.885Z","humidity":5,"temperature":27},
        {"date":"2022-03-13T23:31:03.950Z","humidity":9,"temperature":25},
        {"date":"2022-03-13T23:41:13.912Z","humidity":10,"temperature":27},
        {"date":"2022-03-13T23:51:23.843Z","humidity":7,"temperature":26},
        {"date":"2022-03-14T15:46:54.032Z","humidity":25,"temperature":20},
        {"date":"2022-03-14T18:19:14.066Z","humidity":23,"temperature":20},
        {"date":"2022-03-14T18:29:24.069Z","humidity":24,"temperature":20},
        {"date":"2022-03-14T18:39:34.292Z","humidity":22,"temperature":20},
        {"date":"2022-03-14T18:49:44.124Z","humidity":24,"temperature":20},
        {"date":"2022-03-14T18:59:54.423Z","humidity":24,"temperature":20},
        {"date":"2022-03-14T19:10:04.101Z","humidity":20,"temperature":20},
        {"date":"2022-03-14T19:30:25.015Z","humidity":22,"temperature":20},
        {"date":"2022-03-14T19:40:34.137Z","humidity":20,"temperature":20},
        {"date":"2022-03-14T19:50:44.102Z","humidity":20,"temperature":19},
        {"date":"2022-03-14T20:00:54.232Z","humidity":20,"temperature":19},
        {"date":"2022-03-14T20:11:04.135Z","humidity":20,"temperature":19},
        {"date":"2022-03-14T20:21:14.144Z","humidity":20,"temperature":19},
        {"date":"2022-03-14T20:31:24.092Z","humidity":20,"temperature":19},
        {"date":"2022-03-14T20:41:34.174Z","humidity":20,"temperature":19},
        {"date":"2022-03-14T20:51:44.098Z","humidity":20,"temperature":19},
        {"date":"2022-03-14T21:01:54.161Z","humidity":19,"temperature":21},
        {"date":"2022-03-14T21:12:04.169Z","humidity":18,"temperature":26},
        {"date":"2022-03-14T21:22:14.189Z","humidity":17,"temperature":28},
        {"date":"2022-03-14T21:32:24.258Z","humidity":17,"temperature":29},
        {"date":"2022-03-14T21:42:34.242Z","humidity":17,"temperature":29},
        {"date":"2022-03-14T21:52:44.245Z","humidity":16,"temperature":30},
        {"date":"2022-03-14T22:02:54.159Z","humidity":16,"temperature":31},
        {"date":"2022-03-14T22:13:06.903Z","humidity":16,"temperature":31},
        {"date":"2022-03-14T22:23:14.138Z","humidity":16,"temperature":31},
        {"date":"2022-03-14T22:33:24.180Z","humidity":12,"temperature":30},
        {"date":"2022-03-14T22:43:34.133Z","humidity":14,"temperature":29},
        {"date":"2022-03-14T22:53:44.148Z","humidity":14,"temperature":28},
        {"date":"2022-03-14T23:03:54.140Z","humidity":15,"temperature":27},
        {"date":"2022-03-14T23:14:04.165Z","humidity":17,"temperature":27},
        {"date":"2022-03-14T23:24:14.264Z","humidity":16,"temperature":28},
        {"date":"2022-03-14T23:34:24.298Z","humidity":16,"temperature":29},
        {"date":"2022-03-14T23:44:34.169Z","humidity":16,"temperature":29},
        {"date":"2022-03-14T23:54:44.201Z","humidity":15,"temperature":30},
        {"date":"2022-03-15T00:04:54.135Z","humidity":15,"temperature":30},
        {"date":"2022-03-15T00:15:04.227Z","humidity":15,"temperature":31},
        {"date":"2022-03-15T00:25:14.278Z","humidity":16,"temperature":31},
        {"date":"2022-03-15T00:35:24.193Z","humidity":15,"temperature":31},
        {"date":"2022-03-15T00:45:34.190Z","humidity":14,"temperature":31},
        {"date":"2022-03-15T04:08:44.177Z","humidity":15,"temperature":30},
        {"date":"2022-03-15T04:18:54.188Z","humidity":15,"temperature":30},
    ];

    const props = {
        labels: mock.map(item => item.date),
        lines: {
            temperature: mock.map(item => item.temperature),
            humidity: mock.map(item => item.humidity),
        },
        colors: {
            temperature: 'green',
            humidity: 'blue',
        },
    };

    const [hasDots, setDotsVisibility] = useState(false);
    const [hasLabels, setLabelsVisibility] = useState(false);

    return (
        <div>
            <Chart lines={props.lines} colors={props.colors} showDots={hasDots} labels={hasLabels && props.labels} />
            <div>
                <label>
                    <input type="checkbox" onChange={event => setDotsVisibility(event.target.checked)}/>
                    show dots
                </label>
                <label>
                    <input type="checkbox" onChange={event => setLabelsVisibility(event.target.checked)}/>
                    show labels
                </label>
            </div>
        </div>
    );

}

render(<App />, document.getElementById('root'));
