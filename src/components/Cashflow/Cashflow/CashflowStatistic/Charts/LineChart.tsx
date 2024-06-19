import {
    axisBottom,
    axisLeft,
    curveMonotoneX,
    extent,
    interpolate,
    line,
    scaleLinear,
    scaleTime,
    select,
} from 'd3';
import { eachDayOfInterval, eachHourOfInterval } from 'date-fns';
import { StatisticPeriod } from 'helpers/enums';
import { useEffect, useMemo, useRef } from 'react';
import { animated, SpringValue, useSpring } from 'react-spring';
import theme from 'utils/theme';

type LineChartDataType = { xValue: number | Date; yValue: number; type?: number | string };

type Props = {
    width: number;
    height: number;
    data: LineChartDataType[];
    periodType?: StatisticPeriod;
    isOneDaySelection?: boolean;
};

const marginTop = 20;
const marginRight = 20;
const marginBottom = 20;
const marginLeft = 50;

type LineItemProps = {
    from: string;
    to: string;
    color: string;
    animatedProps: {
        t: SpringValue<number>;
    };
};

const animationConfig = {
    to: async (next: (arg0: { t: number }) => unknown) => await next({ t: 1 }),
    from: { t: 0 },
    config: { duration: 300 },
    reset: true,
};

const LineItem = ({ from, to, color, animatedProps }: LineItemProps) => {
    const interpolator = interpolate(from, to);

    return (
        <animated.path
            d={animatedProps.t.to(t => interpolator(t))}
            fill={'none'}
            stroke={color}
            strokeWidth={2}
        />
    );
};

const LineChart = ({ width, height, data, isOneDaySelection = false }: Props) => {
    const svgWidth = width - (marginRight + marginLeft);
    const svgHight = height - (marginTop + marginBottom);

    const axesRef = useRef<SVGGElement>(null);
    const cache = useRef<string>('');

    const isDateScale = typeof data[0].xValue !== 'number';

    const xValues = data.map(({ xValue }) => xValue);
    const yValues = data.map(({ yValue }) => yValue);

    const xScaleDomain = extent(xValues);

    const xScale = useMemo(
        () =>
            isDateScale
                ? scaleTime()
                      .domain(xScaleDomain as Date[])
                      .range([0, svgWidth])
                      .nice(data.length)
                : scaleLinear()
                      .domain(xScaleDomain as number[])
                      .range([0, svgWidth]),
        [data, width]
    );

    const yScale = useMemo(
        () =>
            scaleLinear()
                .domain(extent(yValues) as number[])
                .range([svgHight, 0])
                .nice(data.length),
        [data, height]
    );

    const lineBuilder = line<LineChartDataType>()
        .x(d => xScale(d.xValue))
        .y(d => yScale(d.yValue))
        .curve(curveMonotoneX);

    const linePath = lineBuilder(data);
    cache.current = linePath as string;

    const [animatedProps, api] = useSpring(() => animationConfig);

    useEffect(() => {
        const svgElement = select(axesRef.current);
        svgElement.selectAll('*').remove();

        const xTicsCount = isDateScale
            ? isOneDaySelection
                ? eachHourOfInterval({
                      start: xScaleDomain[0] as Date,
                      end: xScaleDomain[1] as Date,
                  }).length
                : eachDayOfInterval({
                      start: xScaleDomain[0] as Date,
                      end: xScaleDomain[1] as Date,
                  }).length
            : data.length;

        const xAxisGenerator = axisBottom(xScale).ticks(xTicsCount);

        svgElement
            .append('g')
            .attr('transform', 'translate(0,' + svgHight + ')')
            .call(xAxisGenerator);

        const yAxisGenerator = axisLeft(yScale);

        svgElement.append('g').call(yAxisGenerator);

        api.start(animationConfig);
    }, [data]);

    if (!linePath) {
        return null;
    }

    return (
        <div style={{ width: `${width}px`, height: `${height}px` }}>
            <svg
                width={svgWidth}
                height={svgHight}
                style={{
                    margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
                    overflow: 'visible',
                }}
            >
                <g width={svgWidth} height={svgHight}>
                    <LineItem
                        from={cache.current}
                        to={linePath}
                        animatedProps={animatedProps}
                        color={theme.colors.accent.main}
                    />
                </g>

                <g width={svgWidth} height={svgHight} ref={axesRef} />
            </svg>
        </div>
    );
};

export default LineChart;
