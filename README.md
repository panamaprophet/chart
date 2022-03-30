# Hey,

Do you have something to plot?

I'm the `<Chart />` component and I'm really excited about how incredibly awesome your data will look like on my canvas! I'm self-sufficient and provide a bunch of options to custmoize myself for your needs in the most convinient way.

> Please, be advised this repo is marked as `in progress` and can work unstable.

### Installation

`yarn add @evergreenstash/react-chart` 

or 

`npm -i @evergreenstash/react-chart`

will do the work :)

### Usage

All you need to start is to import `<Chart />` into project and pass some numeric values to it.

The children are *completely* optional, some of them can be additionally tuned.

The minimal setup:

```js
import { Chart } from '@evergreenstash/react-chart';

...

const values = [
    data.map(item => item.temperature)
];

...

<Chart values={values} />
```

The complete basic setup:

```js
import { Chart, Line, AxisX, AxisY, Zoom, Tooltips } from '@evergreenstash/react-chart';

...

const values = [
    data.map(item => item.temperature),
    data.map(item => item.humidity),
];

const dates = data.map(item => item.date);

...

<Chart values={values}>
    <Line label="temperature" color="#73A921" />
    <Line label="humidity" color="#487AFA" />

    <AxisX labels={dates} />
    <AxisY />

    <Zoom />

    <Tooltips />
</Chart>
```

Check the [`example`](example) folder for more details.
