import { ReactElement, PureComponent, Children } from 'react';


export class Line extends PureComponent<{
    label: string,
    color: string,
}, unknown> {}

export class AxisX extends PureComponent<{
    labels?: string[],
}, unknown> {}

export class AxisY extends PureComponent<{[k: string]: never}, unknown> {}

export class Zoom extends PureComponent<{[k: string]: never}, unknown> {}

export class Tooltips extends PureComponent<{
    formatLabel: (value: number, line: string) => string | number,
}, unknown> {}


export const getDefaultSettings = () => ({
    lines: [],
    axisX: { labels: [] },
    axisY: {},
    tooltips: { formatLabel: (value: number) => value },
    zoom: null,
});

export const getSettings = (children: JSX.Element | JSX.Element[] = []) => {
    if (Children.count(children) === 0) {
        return getDefaultSettings();
    }

    const settings = Children.toArray(children) as ReactElement[];

    const lines = settings
        .filter(child => child.type === Line)
        .map(line => line.props);

    const axisX = settings.find(child => child.type === AxisX)?.props;
    const axisY = settings.find(child => child.type === AxisY)?.props;
    const tooltips = settings.find(child => child.type === Tooltips)?.props;
    const zoom = settings.find(child => child.type === Zoom)?.props;

    return {
        lines,
        axisX,
        axisY,
        tooltips,
        zoom,
    };
};
