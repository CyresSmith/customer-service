import Button from 'components/Ui/Buttons/Button';
import { HiRefresh, HiTrash, HiX } from 'react-icons/hi';
import { useMediaQuery } from 'usehooks-ts';
import theme from 'utils/theme';
import { ButtonsList } from '../WorkScheduleBar.styled';

type Props = {
    onChangeClick: () => void;
    onResetClick: () => void;
    isResetLoading: boolean;
    resetSelection: () => void;
};

const EditScheduleButtons = ({
    onChangeClick,
    onResetClick,
    isResetLoading,
    resetSelection,
}: Props) => {
    const isDesktop = useMediaQuery(theme.breakpoints.desktop.media);

    return (
        <ButtonsList>
            <li>
                <Button
                    onClick={onChangeClick}
                    Icon={HiRefresh}
                    children={isDesktop ? 'Змінити' : undefined}
                    $colors="accent"
                    $round={isDesktop ? false : true}
                />
            </li>
            <li>
                <Button
                    onClick={onResetClick}
                    Icon={HiTrash}
                    children={isDesktop ? 'Видалити' : undefined}
                    $colors="accent"
                    isLoading={isResetLoading}
                    $round={isDesktop ? false : true}
                />
            </li>
            <li>
                <Button
                    onClick={resetSelection}
                    Icon={HiX}
                    children={isDesktop ? 'Зняти виделення' : undefined}
                    $colors="accent"
                    $round={isDesktop ? false : true}
                />
            </li>
        </ButtonsList>
    );
};

export default EditScheduleButtons;
