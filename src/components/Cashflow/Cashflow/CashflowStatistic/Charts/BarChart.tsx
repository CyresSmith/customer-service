import { axisBottom, axisLeft, max, scaleBand, scaleLinear, select } from 'd3';
import { format } from 'date-fns';
import { useEffect, useRef } from 'react';

type DataType = { date: Date; price: number };

type Props = {
    width: number;
    height: number;
    data: DataType[];
};

const marginTop = 20;
const marginRight = 20;
const marginBottom = 20;
const marginLeft = 40;

const BarChart = ({ width, height, data }: Props) => {
    const svgWidth = width - (marginRight + marginLeft);
    const svgHight = height - (marginTop + marginBottom);

    const xAxisRef = useRef<SVGGElement | null>(null);
    const yAxisRef = useRef<SVGGElement | null>(null);
    const xGridRef = useRef<SVGGElement | null>(null);
    const yGridRef = useRef<SVGGElement | null>(null);
    const barsBoxRef = useRef<SVGGElement | null>(null);

    useEffect(() => {
        const dateFormat = (date: Date) => format(date, 'dd.MM');

        const dates: Date[] = data.map(({ date }) => date);
        const prices: number[] = data.map(({ price }) => price);

        const xScale = scaleBand().range([0, svgWidth]).domain(dates.map(dateFormat)).padding(0.2);

        const yScale = scaleLinear()
            .range([svgHight, 0])
            .domain([10, max(prices)] as number[]);

        const colorScale = scaleLinear()
            .domain([50, (50 + Number(max(prices))) / 2, max(prices)] as number[])
            .range(['yellow', 'orange', 'red'])
            .clamp(true);

        const xAxis = axisBottom(xScale).ticks(dates.length);

        select(xAxisRef.current as SVGGElement)
            .style('transform', `translateY(${svgHight}px)`)
            .call(xAxis);

        const yAxis = axisLeft(yScale);

        select(yAxisRef.current as SVGGElement).call(yAxis);

        const barBox = select(barsBoxRef.current);

        barBox
            .selectAll('[id=bar]')
            .data(data)
            .join('rect')
            .attr('id', 'bar')
            .attr('transform', 'scale(1, -1)')
            .attr('x', d => xScale(dateFormat(d.date)) as number)
            .attr('y', -svgHight)
            .attr('width', xScale.bandwidth())
            .on('mouseenter', (_, d) => {
                barBox
                    .selectAll('[id=tooltip]')
                    .data([dateFormat(d.date)])
                    .join(enter => enter.append('text').attr('y', yScale(d.price)))
                    .attr('id', 'tooltip')
                    .text(d.price)
                    .attr('x', (xScale(dateFormat(d.date)) as number) + xScale.bandwidth() / 2)
                    .attr('fill', colorScale(d.price))
                    .attr('text-anchor', 'middle')
                    .transition()
                    .attr('y', (yScale(d.price) - 10) as number)
                    .attr('opacity', 1);
            })
            .on('mouseleave', () => barBox.select('[id=tooltip]').remove())
            .transition()
            .attr('fill', d => colorScale(d.price))
            .attr('height', d => svgHight - yScale(d.price));
    }, [data]);

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
                <g ref={xAxisRef} />
                <g ref={yAxisRef} />
                <g ref={xGridRef} />
                <g ref={yGridRef} />
                <g ref={barsBoxRef} />
            </svg>
        </div>
    );
};

export default BarChart;
