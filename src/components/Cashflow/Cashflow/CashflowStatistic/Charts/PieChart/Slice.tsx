import { Arc, DefaultArcObject, PieArcDatum, interpolate } from 'd3';
import { SpringValue, animated } from 'react-spring';
import { DataType } from './PieChart';

type Props = {
    from: PieArcDatum<DataType>;
    to: PieArcDatum<DataType>;
    createArc: Arc<unknown, DefaultArcObject>;
    color: string;
    animatedProps: {
        t: SpringValue<number>;
    };
};

const Slice = ({ from, to, createArc, color, animatedProps }: Props) => {
    const interpolator = interpolate(
        from as unknown as DefaultArcObject,
        to as unknown as DefaultArcObject
    );

    return (
        <g>
            <animated.path
                d={animatedProps.t.to(t => createArc(interpolator(t) as DefaultArcObject)) as never}
                fill={color}
            />
        </g>
    );
};

export default Slice;
