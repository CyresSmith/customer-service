import Button from 'components/Ui/Buttons/Button';
import { IconType } from 'react-icons';
import { SectionsButtonList } from './ModalSectionsList.styled';

type SectionButton = { id: number; label: string; Icon: IconType };

type Props = {
  sectionButtons: SectionButton[];
  currentSection: number;
  handleSectionSelect: (sectionId: number) => void;
};

const ModalSectionsList = ({
  sectionButtons,
  currentSection,
  handleSectionSelect,
}: Props) => {
  return (
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
