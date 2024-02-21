import Button from "components/Ui/Buttons/Button";
import { Bar } from "./ClientProfile.styled";

const buttons = [
    { name: 'Профіль', id: 'profile' },
    { name: 'Записи', id: 'actions' },
    { name: 'Продажі', id: 'sales' },
    { name: 'Статистика', id: 'statistic' }
];

type Props = {
    isActiveSection: string;
    handleClick: (id: string) => void;
};

export const ClientProfileBar = ({handleClick, isActiveSection}: Props) => {
    return (
        <Bar>
            {buttons.map(b =>
                <Button
                    onClick={() => handleClick(b.id)}
                    children={b.name}
                    id={b.id}
                    key={b.id}
                    $colors="light"
                    $variant={isActiveSection === b.id ? 'solid' : 'text'}
                />)}
        </Bar>
    )
};