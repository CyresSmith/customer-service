import ItemAvatar from 'components/Ui/ItemsList/ItemAvatar';
import {
  ModalHeaderBox,
  SubTitle,
  Title,
  TitleBox,
} from './ModalHeaderWithAvatar.styled';

type Props = { avatar: string; title: string; subtitle?: string };

const ModalHeaderWithAvatar = ({ avatar, title, subtitle }: Props) => {
  return (
    <ModalHeaderBox>
      <ItemAvatar avatar={avatar} name={title} />

      <TitleBox>
        <Title>{title}</Title>

        {subtitle && <SubTitle>{subtitle}</SubTitle>}
      </TitleBox>
    </ModalHeaderBox>
  );
};

export default ModalHeaderWithAvatar;
