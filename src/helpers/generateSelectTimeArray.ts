import { SelectItem } from 'components/Ui/Form/types';

const generateSelectTimeArray = ({
    min,
    max,
    step,
    units,
}: {
    min: number;
    max: number;
    step: number;
    units: string;
}): SelectItem[] => {
    const times = [];

    for (let item = min; item <= max; item += step) {
        times.push({ id: item, value: `${item} ${units}` });
    }

    return times;
};

export default generateSelectTimeArray;
