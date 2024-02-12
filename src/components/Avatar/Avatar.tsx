import Button from 'components/Ui/Buttons/Button';
import Loader from 'components/Ui/Loader';
import VisuallyHidden from 'components/Ui/VisuallyHidden';
import useFileUpload from 'hooks/useFileUpload';
import { HiCamera, HiCloudUpload, HiX } from 'react-icons/hi';
import { AvatarBox, ButtonsBox, ImageBox } from './Avatar.styled';

type Props = {
  allowChanges: boolean;
  light?: boolean;
  size?: number;
  $round?: boolean;
  currentImageUrl?: string;
  alt: string;
  isLoading?: boolean;
  handleUpload: (currentFile: File) => void;
};

const Avatar = ({
  allowChanges,
  light = false,
  size = 250,
  $round = false,
  currentImageUrl,
  alt = 'some image',
  isLoading = false,
  handleUpload,
}: Props) => {
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

  return (
    <AvatarBox width={size}>
      {!allowChanges ? (
        <ImageBox
          $allowChanges={allowChanges}
          $light={light}
          size={size}
          $round={$round}
        >
          {currentImageUrl ? (
            <img src={currentImageUrl} alt={alt} />
          ) : (
            <HiCamera />
          )}
        </ImageBox>
      ) : (
        <>
          <ImageBox
            $light={light}
            $allowChanges={allowChanges}
            size={size}
            $round={$round}
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {currentImageUrl || previewImage ? (
                  <img
                    src={previewImage ? previewImage : currentImageUrl}
                    alt={alt}
                  />
                ) : (
                  <HiCamera id="camera" />
                )}
                <HiCloudUpload id="upload" />

                <VisuallyHidden>
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    size={5 * 1024 * 1024}
                    ref={inputRef}
                    onChange={handleSelect}
                  />
                </VisuallyHidden>
              </>
            )}
          </ImageBox>

          {currentFile && (
            <ButtonsBox>
              <Button
                onClick={() => {
                  handleUpload(currentFile);
                  reset();
                }}
                $colors="light"
                $variant="text"
                Icon={HiCloudUpload}
              >
                Оновити
              </Button>

              <Button
                onClick={reset}
                $colors="light"
                $variant="text"
                Icon={HiX}
              >
                Видалити
              </Button>
            </ButtonsBox>
          )}
        </>
      )}
    </AvatarBox>
  );
};

export default Avatar;
