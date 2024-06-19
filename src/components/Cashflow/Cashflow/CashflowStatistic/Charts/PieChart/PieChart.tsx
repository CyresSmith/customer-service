import { arc, DefaultArcObject, pie, scaleOrdinal, schemeCategory10 } from 'd3';
import { numberToCurrency } from 'helpers/numberToCurrency';
import { useEffect, useRef, useState } from 'react';
import { useSpring } from 'react-spring';
import theme from 'utils/theme';
import {
    ChartTitle,
    Legend,
    LegendList,
    PieBox,
    PieChartBox,
    StyledG,
    Total,
} from './PieChart.styled';
import Slice from './Slice';

export type DataType = { type: string; value: number };

type Props = {
    width: number;
    height: number;
    marginX?: number;
    marginY?: number;
    data: DataType[];
    units?: string;
    showTotal?: boolean;
    background?: boolean;
    isCurrency?: boolean;
    title?: string;
};

const animationConfig = {
    to: async (next: (arg0: { t: number }) => unknown) => await next({ t: 1 }),
    from: { t: 0 },
    config: { duration: 300 },
    reset: true,
};

const PieChart = ({
    width,
    height,
    marginX = 0,
    marginY = 0,
    data,
    units,
    showTotal = false,
    background = false,
    isCurrency = false,
    title,
}: Props) => {
    const svgWidth = width - marginX * 2;
    const svgHeight = height - marginY * 2;
    const totalPadding = parseInt(theme.space[2]) || 5;
    const totalSize = Math.min(svgWidth, svgHeight) / 2;
    const outerRadius = Math.min(svgWidth, svgHeight) / 2 - totalPadding;
    const innerRadius = outerRadius * 0.5 - totalPadding;

    const ref = useRef<SVGGElement>(null);
    const cache = useRef<DataType[]>([]);

    const [hoveredType, setHoveredType] = useState<DataType | null>(null);

    const createPie = pie<DataType>()
        .value(d => d.value)
        .sort(null);

    const createArc = arc<DefaultArcObject>()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .cornerRadius(parseInt(theme.space[2]) || 5)
        .padAngle(0.025);

    const pieData = createPie(data);
    const previousData = createPie(cache.current);
    const colors = scaleOrdinal(schemeCategory10);

    const [animatedProps, api] = useSpring(() => animationConfig);

    useEffect(() => {
        cache.current = data;
        api.start(animationConfig);
    }, [data, api]);

    const total = data.reduce((acc: number, { value }) => acc + value, 0);

    const visibleValue = (value: number) =>
        isCurrency ? numberToCurrency(value) : units ? value + ' ' + units : value;

    return (
        <PieChartBox width={width}>
            {title && <ChartTitle>{title}</ChartTitle>}

            <PieBox>
                <svg width={width} height={height} style={{ padding: `${marginY}px ${marginX}px` }}>
                    {background && (
                        <circle
                            cx={svgWidth / 2}
                            cy={svgHeight / 2}
                            r={totalSize}
                            fill={theme.colors.bg.main}
                            opacity={0.8}
                        />
                    )}

                    <g transform={`translate(${svgWidth / 2}, ${svgHeight / 2})`} ref={ref}>
                        {pieData.map((d, i) => (
                            <StyledG
                                key={i}
                                onMouseEnter={() => setHoveredType(d.data)}
                                onMouseLeave={() => setHoveredType(null)}
                                $isHovered={hoveredType?.type === d.data.type}
                                $isSomeHovered={Boolean(hoveredType)}
                            >
                                <Slice
                                    from={previousData[i]}
                                    to={d}
                                    createArc={createArc}
                                    color={colors(d.data.type)}
                                    animatedProps={animatedProps}
                                />
                            </StyledG>
                        ))}
                    </g>
                </svg>

                {showTotal && (
                    <Total>
                        <span>Всього</span>
                        <span>{visibleValue(total)}</span>
                    </Total>
                )}
            </PieBox>

            <LegendList>
                {data.map((item, i) => {
                    const { type, value } = item;
                    return (
                        <Legend
                            key={type}
                            color={colors(type)}
                            onMouseEnter={() => setHoveredType(item)}
                            onMouseLeave={() => setHoveredType(null)}
                            $isHovered={hoveredType?.type === type}
                            $isSomeHovered={Boolean(hoveredType)}
                        >
                            <div /> <span>{type + ': '}</span> <span>{visibleValue(value)}</span>
                        </Legend>
                    );
                })}
            </LegendList>
        </PieChartBox>
    );
};

export default PieChart;
