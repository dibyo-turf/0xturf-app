export type RenderShape = {
    percent: number;
    cornerRadius: number;
    name: string;
    tooltipPayload: [
        {
            name: string;
            value: number;
            payload: {
                payload: {
                    name: string;
                    value: number;
                };
                cx: string;
                cy: string;
                fill: string;
                stroke: string;
                style: {
                    outline: string;
                    border: string;
                };
                name: string;
                value: number;
            };
            dataKey: string;
        }
    ];
    midAngle: number;
    middleRadius: number;
    tooltipPosition: {
        x: number;
        y: number;
    };
    payload: {
        payload: {
            name: string;
            value: number;
        };
        cx: string;
        cy: string;
        fill: string;
        stroke: string;
        style: {
            outline: string;
            border: string;
        };
        name: string;
        value: number;
    };
    cx: number;
    cy: number;
    fill: string;
    stroke: string;
    style: {
        outline: string;
        border: string;
    };
    value: number;
    innerRadius: number;
    outerRadius: number;
    maxRadius: number;
    startAngle: number;
    endAngle: number;
    paddingAngle: number;
};
