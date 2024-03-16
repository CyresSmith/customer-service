import Button from 'components/Ui/Buttons/Button';
import Loader from 'components/Ui/Loader';
import VisuallyHidden from 'components/Ui/VisuallyHidden';
import useFileUpload from 'hooks/useFileUpload';
import { HiCamera, HiX } from 'react-icons/hi';
import { HiCursorArrowRays } from 'react-icons/hi2';
import { IoIosSave } from 'react-icons/io';
import { AvatarBox, ButtonsBox, ImageBox } from './Avatar.styled';

type Props = {
  allowChanges?: boolean;
  light?: boolean;
  size?: number;
  $round?: boolean;
  currentImageUrl?: string;
  alt: string;
  isLoading?: boolean;
  handleUpload: (currentFile: File) => void;
};

const Avatar = ({
  allowChanges = true,
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
    <AvatarBox size={size}>
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
            <HiCamera id="static" />
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
                <HiCursorArrowRays id="upload" />

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
            <ButtonsBox width={size}>
              <Button
                onClick={() => {
                  handleUpload(currentFile);
                  reset();
                }}
                $colors="success"
                // $variant="text"
                Icon={IoIosSave}
                $round
              >
                {/* Оновити */}
              </Button>

              <Button
                onClick={reset}
                $colors="danger"
                // $variant="text"
                Icon={HiX}
                $round
              >
                {/* Видалити */}
              </Button>
            </ButtonsBox>
          )}
        </>
      )}
    </AvatarBox>
  );
};

export default Avatar;
