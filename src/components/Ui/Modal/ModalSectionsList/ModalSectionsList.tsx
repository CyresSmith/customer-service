import Button from 'components/Ui/Buttons/Button';
import CustomFormSelect from 'components/Ui/Form/CustomFormSelect';
import { SelectItem } from 'components/Ui/Form/types';
import { IconType } from 'react-icons';
import { useMediaQuery } from 'usehooks-ts';
import theme from 'utils/theme';
import { SectionsButtonList } from './ModalSectionsList.styled';

type SectionButton = { id: number; label: string; Icon: IconType };

type Props = {
    sectionButtons: SectionButton[];
    currentSection: number;
    handleSectionSelect: (sectionId: number) => void;
};

const ModalSectionsList = ({ sectionButtons, currentSection, handleSectionSelect }: Props) => {
    const isMobile = useMediaQuery(theme.breakpoints.mobile.media);

    const selectedItem = sectionButtons.find(({ id }) => id === currentSection);

    const handleSelect = ({ id }: SelectItem) => id && handleSectionSelect(+id);

    return isMobile && sectionButtons.length > 1 ? (
        <CustomFormSelect
            selectItems={sectionButtons.map(({ id, label: value }) => ({ id, value }))}
            selectedItem={{
                id: selectedItem?.id || sectionButtons[0].id,
                value: selectedItem?.label || sectionButtons[0].label,
            }}
            handleSelect={handleSelect}
            colors="dark"
        />
    ) : (
        <SectionsButtonList>
            {sectionButtons.map(({ label, id, Icon }) => (
                <li key={label}>
                    <Button
                        size="s"
                        $colors={currentSection === id ? 'accent' : 'light'}
                        $variant={currentSection === id ? 'solid' : 'text'}
                        onClick={() => handleSectionSelect(id)}
                        Icon={Icon}
                    >
                        {label}
                    </Button>
                </li>
            ))}
        </SectionsButtonList>
    );
};

export default ModalSectionsList;
