// import { PureComponent } from "react";
// import { Cell, Pie, PieChart, Sector } from "recharts";

// const data = [
//     { name: "Group A", value: 400 },
//     { name: "Group B", value: 300 },
//     { name: "Group C", value: 300 },
//     { name: "Group D", value: 200 },
//     { name: "Group D", value: 200 },
//     { name: "Group D", value: 200 },
// ];

// const renderActiveShape = (props) => {
//     const RADIAN = Math.PI / 180;
//     const {
//         cx,
//         cy,
//         midAngle,
//         innerRadius,
//         outerRadius,
//         startAngle,
//         endAngle,
//         fill,
//         payload,
//         percent,
//         value,
//     } = props;
//     const sin = Math.sin(-RADIAN * midAngle);
//     const cos = Math.cos(-RADIAN * midAngle);
//     const sx = cx + (outerRadius + 10) * cos;
//     const sy = cy + (outerRadius + 10) * sin;
//     const mx = cx + (outerRadius + 30) * cos;
//     const my = cy + (outerRadius + 30) * sin;
//     const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//     const ey = my;
//     const textAnchor = cos >= 0 ? "start" : "end";

//     return (
//         <g>
//             <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#fff"}>
//                 Gro
//             </text>
//         </g>
//     );
// };

// const Piechart = () => {
//     return (
//         <PieChart width={400} height={400}>
//             <defs>
//                 <linearGradient id="colorUv1" x1="1" y1="1" x2="0" y2="0">
//                     <stop offset="30%" stopColor="#8147C3" stopOpacity={0.5} />
//                     <stop offset="95%" stopColor="#8179F2" stopOpacity={0.5} />
//                 </linearGradient>
//             </defs>
//             <defs>
//                 <linearGradient id="colorUv" x1="1" y1="1" x2="0" y2="0">
//                     <stop offset="30%" stopColor="#6D83F6" stopOpacity={0.5} />
//                     <stop offset="95%" stopColor="#455AC1" stopOpacity={0.5} />
//                 </linearGradient>
//             </defs>
//             <Pie
//                 data={data}
//                 innerRadius={65}
//                 activeShape={renderActiveShape}
//                 outerRadius={80}
//                 stroke="none"
//                 radius={100}
//                 cornerRadius={100}
//                 fill="#8884d8"
//                 paddingAngle={5}
//                 dataKey="value"
//             >
//                 {data.map((entry, index) => (
//                     <Cell
//                         radius={20}
//                         style={{
//                             outline: "none",
//                             border: "none",
//                         }}
//                         key={`cell-${index}`}
//                         fill="url(#colorUv1)"
//                     />
//                 ))}
//             </Pie>
//         </PieChart>
//     );
// };

// export default Piechart;

import React from "react";
import { Pie, PieChart, Sector } from "recharts";
import { RenderShape } from "./types";

const renderActiveShape = (props: RenderShape) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g
            style={{
                outline: "none",
            }}
        >
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#fff"}>
                {payload.name + " " + value}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                cornerRadius={20}
                endAngle={endAngle}
                fill={fill}
            />
            {/* <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            /> */}
            {/* <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            /> */}
            {/* <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" /> */}
            {/* <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >{`PV ${value}`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text> */}
        </g>
    );
};

const Piechart = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);

    const data = [
        { name: "Action", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 },
    ];

    return (
        <PieChart width={600} height={600}>
            <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={80}
                fill="#8884d8"
                stroke="none"
                cornerRadius={20}
                style={{
                    outline: "none",
                    border: "none",
                }}
                paddingAngle={10}
                dataKey="value"
            />
        </PieChart>
    );
};

export default Piechart;
