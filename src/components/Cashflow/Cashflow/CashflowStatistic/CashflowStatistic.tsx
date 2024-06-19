import { addHours, eachDayOfInterval, eachHourOfInterval, endOfDay, isSameDay } from 'date-fns';
import { getTimeStr } from 'helpers/timeConversion';
import { translateLabels } from 'helpers/translateLabels';
import { Period } from 'pages/CashflowPage/CashflowPage';
import { Transaction, TransactionType } from 'services/types/transaction.types';
import { StatisticBox } from './CashflowStatistic.styled';
import LineChart from './Charts/LineChart';
import PieChart, { DataType } from './Charts/PieChart/PieChart';

type Props = { transactions: Transaction[]; period: Period };

const excludedCategories: TransactionType[] = ['moving', 'change'];

const CashflowStatistic = ({ transactions = [], period }: Props) => {
    const data =
        transactions
            .reduce((acc: { type: string; data: DataType[] }[], item) => {
                const { type, category, amount } = item;

                if (excludedCategories.includes(type)) return acc;

                const accTypeIdx = acc.findIndex(item => item.type === type);

                if (accTypeIdx !== undefined && accTypeIdx !== -1) {
                    const data = acc[accTypeIdx].data;

                    const accCategoryIdx = data.findIndex(item => item.type === category.name);

                    if (accCategoryIdx !== undefined && accCategoryIdx !== -1) {
                        data[accCategoryIdx].value += amount;
                    } else {
                        amount > 0 && data.push({ type: category.name, value: amount });
                    }
                } else {
                    amount > 0 &&
                        acc.push({ type, data: [{ type: category.name, value: amount }] });
                }

                return acc;
            }, [])
            .sort((a, b) => a.type.localeCompare(b.type)) || [];

    const isOneDaySelection = isSameDay(period.from, period.to);

    const isTodayPeriod = isSameDay(new Date(), period.to);

    const timeArray = isOneDaySelection
        ? eachHourOfInterval({
              start: period.from,
              end: isTodayPeriod ? addHours(new Date(), 1) : period.to,
          })
        : eachDayOfInterval({ start: period.from, end: endOfDay(new Date()) });

    // const transactionsData = timeArray.reduce(
    //     (acc: { xValue: Date; yValue: number }[], item, i) => {
    //         const hours = (time: number) => +getTimeStr(time).split(':')[0];

    //         const dateTransactions = transactions.filter(({ year, month, day, time }) => {
    //             const date = new Date(year, month, day, hours(time), 0);

    //             return isOneDaySelection ? isSameHour(date, item) : isSameDay(date, item);
    //         });

    //         const prev = i > 0 ? acc[i - 1].yValue : 0;

    //         const yValue =
    //             dateTransactions.reduce((acc: number, item) => (acc += item.amount), 0) + prev;

    //         acc.push({ xValue: item, yValue });

    //         return acc;
    //     },
    //     []
    // );

    const transactionsData = [...transactions]
        .sort((a, b) => {
            const getTimeArr = (time: number) => getTimeStr(time).split(':');

            const aTime = getTimeArr(a.time);
            const bTime = getTimeArr(b.time);

            const aDate = new Date(a.year, a.month, a.day, +aTime[0], +aTime[1]);
            const bDate = new Date(b.year, b.month, b.day, +bTime[0], +bTime[1]);

            return aDate < bDate ? -1 : aDate > bDate ? 1 : 0;
        })
        .reduce(
            (
                acc: { xValue: Date; yValue: number }[],
                { year, month, day, time, amount, type },
                i
            ) => {
                const timeArr = getTimeStr(time).split(':');

                const prev = i > 0 ? acc[i - 1].yValue : 0;

                acc.push({
                    xValue: new Date(year, month, day, +timeArr[0], +timeArr[1]),
                    yValue: amount + prev,
                });

                return acc;
            },
            []
        );

    return (
        <StatisticBox>
            {data.length > 0 &&
                data.map(({ type, data }) => (
                    <PieChart
                        key={type}
                        width={200}
                        height={200}
                        data={data}
                        isCurrency
                        title={translateLabels(type)}
                    />
                ))}

            {transactionsData.length > 0 && (
                <LineChart
                    width={600}
                    height={200}
                    data={transactionsData}
                    isOneDaySelection={isOneDaySelection}
                />
            )}
        </StatisticBox>
    );
};

export default CashflowStatistic;
