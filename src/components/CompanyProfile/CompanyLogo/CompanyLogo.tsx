import Button from 'components/Ui/Buttons/Button';
import Loader from 'components/Ui/Loader';
import VisuallyHidden from 'components/Ui/VisuallyHidden';
import handleError from 'helpers/errorHandler';
import useFileUpload from 'hooks/useFileUpload';
import { useEffect, useMemo } from 'react';
import { HiCamera, HiCloudUpload, HiX } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { useUploadCompanyAvatarMutation } from 'services/company.api';
import {
  Backdrop,
  ButtonsBox,
  Info,
  InfoBox,
  LogoBox,
} from './CompanyLogo.styled';
import { useActions } from 'hooks';

type Props = {
  companyId: string;
  avatar: string;
  name: string;
  refetchCompanyData: () => void;
};

const CompanyLogo = ({
  companyId,
  avatar,
  name,
  refetchCompanyData,
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

  const { setCompanyLogo } = useActions();

  const data = useMemo(() => new FormData(), []);

  const [uploadImage, { isSuccess, isError, isLoading, error }] =
    useUploadCompanyAvatarMutation();

  const handleUpload = async () => {
    if (companyId && data.has('avatar')) {
      const { url } = await uploadImage({ id: companyId, data }).unwrap();

      if (url) {
        setCompanyLogo({ avatar: url });
        refetchCompanyData();
      }
    }
  };

  useEffect(() => {
    if (!currentFile) return;

    data.append('avatar', currentFile);
  }, [currentFile, data]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      toast.success('Зображення успішно оновлено');
    }

    if (isError) {
      toast.error(handleError(error));
    }
  }, [error, isError, isSuccess, reset]);

  return (
    <div>
      <LogoBox
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
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
              <Info>Натисніть або перетягніть сюди файл</Info>
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
          </>
        )}
      </LogoBox>

      {currentFile && (
        <ButtonsBox>
          <Button
            onClick={handleUpload}
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
