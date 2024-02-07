import Button from 'components/Ui/Buttons/Button';

type Props = {};

const EmployeesBar = (props: Props) => {
  return (
    <>
      <Button $colors="light">Додати</Button>
      <Button $colors="light">Змінити</Button>
      <Button $colors="light">Видалити</Button>
    </>
  );
};

export default EmployeesBar;
