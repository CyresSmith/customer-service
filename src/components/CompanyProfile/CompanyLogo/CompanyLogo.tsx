import Button from 'components/Ui/Buttons/Button';
import VisuallyHidden from 'components/Ui/VisuallyHidden';
import useFileUpload from 'hooks/useFileUpload';
import { HiCamera, HiCloudUpload, HiX } from 'react-icons/hi';
import {
  Backdrop,
  ButtonsBox,
  Info,
  InfoBox,
  LogoBox,
} from './CompanyLogo.styled';

type Props = {
  avatar: string;
  name: string;
};

const CompanyLogo = ({ avatar, name, uploadImage }: Props) => {
  const {
    inputRef,
    handleClick,
    handleSelect,
    handleDragOver,
    handleDrop,
    currentFile,
    previewImage,
    reset,
  } = useFileUpload();
  console.log('🚀 ~ CompanyLogo ~ currentFile:', currentFile);

  return (
    <div>
      <LogoBox
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {avatar || previewImage ? (
          <img
            src={previewImage ? previewImage : avatar}
            alt={`${name} logo`}
          />
        ) : (
          <HiCamera id="camera" />
        )}

        <InfoBox id="upload">
          <Backdrop />
          <Info>Натисніть тут або перетягніть сюди файл</Info>
        </InfoBox>

        <VisuallyHidden>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            size={5 * 1024 * 1024}
            ref={inputRef}
            onChange={handleSelect}
          />
        </VisuallyHidden>
      </LogoBox>

      {currentFile && (
        <ButtonsBox>
          <Button
            onClick={uploadImage}
            $colors="light"
            $variant="text"
            Icon={HiCloudUpload}
          >
            Оновити
          </Button>

          <Button onClick={reset} $colors="light" $variant="text" Icon={HiX}>
            Видалити
          </Button>
        </ButtonsBox>
      )}
    </div>
  );
};

export default CompanyLogo;
