import DatePicker from "components/Ui/DatePicker";

type Props = {};

const WorkSchedule = (props: Props) => {
  const handleDatePick = () => {

  }

  return (
    <>
      <DatePicker bgColor="dark" calendarCellSize={30} handleDateConfirm={handleDatePick} />
    </>
  );
};

export default WorkSchedule;
