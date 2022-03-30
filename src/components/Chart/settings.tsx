import { ReactElement, PureComponent, Children, JSXElementConstructor } from 'react';


export class Line extends PureComponent<{
    label: string,
    color: string,
}, unknown> {}

export class AxisX extends PureComponent<{
    labels?: string[],
}, unknown> {}

export class AxisY extends PureComponent<{ [k: string]: never }, unknown> {}

export class Zoom extends PureComponent<{ [k: string]: never }, unknown> {}

export class Tooltips extends PureComponent<{
    formatLabel: (value: number, line: string) => string | number,
}, unknown> {}


export interface Settings {
    lines: Array<{
        color: string,
        label: string,
    }>,
    axisX: {
        labels: [],
    } | null,
    axisY: {
        [k: string]: never,
    } | null,
    tooltips: {
        formatLabel: (value: number, line: string) => string | number,
    } | null,
    zoom: {
        [k: string]: never,
    } | null,
}


const getDefaultSettings = (): Settings => ({
    lines: [],
    axisX: null,
    axisY: null,
    tooltips: null,
    zoom: null,
});

const isComponent = <T,>(Component: JSXElementConstructor<T>) => (child: ReactElement) => child.type === Component;

const getProps = (element?: JSX.Element) => element?.props ?? null;


export const getSettings = (children: JSX.Element | JSX.Element[] = []): Settings => {
    if (Children.count(children) === 0) {
        return getDefaultSettings();
    }

    const settings = Children.toArray(children) as ReactElement[];

    return {
        lines: settings.filter(isComponent(Line)).map(getProps),
        axisX: getProps(settings.find(isComponent(AxisX))),
        axisY: getProps(settings.find(isComponent(AxisY))),
        tooltips: getProps(settings.find(isComponent(Tooltips))),
        zoom: getProps(settings.find(isComponent(Zoom))),
    };
};
