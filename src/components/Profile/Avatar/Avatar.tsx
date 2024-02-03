import { HiOutlineCloudUpload, HiCamera, HiCloudUpload, HiX } from "react-icons/hi";
import { AvatarBox, AvatarImg, Backdrop, ButtonsBox, StyledCamera, StyledUpload, Wrapper } from "./Avatar.styled";
import useFileUpload from "hooks/useFileUpload";
import VisuallyHidden from "components/Ui/VisuallyHidden";
import Button from "components/Ui/Buttons/Button";
import { useActions } from "hooks";
import { useUploadAvatarMutation } from "services/auth.api";
import { toast } from "react-toastify";
import Loader from "components/Ui/Loader";

type Props = {
    id: string | number;
    avatar: string;
};

const Avatar = ({ id, avatar }: Props) => {
    const {
        inputRef,
        handleClick,
        handleSelect,
        currentFile,
        previewImage,
        reset,
    } = useFileUpload();

    const [uploadAvatarMutation, {isLoading}] = useUploadAvatarMutation();

    const { setAvatar } = useActions();

    const handleUpload = async () => {
        if (!currentFile) {
            return
        }

        const data = new FormData();
        data.append('avatar', currentFile);

        const { url } = await uploadAvatarMutation({ id, data }).unwrap();

        if (url) {
            setAvatar(url);
            toast.success('Аватар успішно оновлено');
            reset();
        }
    };

    return (
        <Wrapper>
            {isLoading ? <Loader /> :
            <AvatarBox onClick={handleClick}>
                {isLoading ? <Loader /> :
                    <>
                        ({previewImage || avatar ?
                        <AvatarImg src={previewImage ? previewImage : avatar} alt='Avatar' /> :
                        <StyledCamera as={HiCamera} />
                        }
                        <VisuallyHidden>
                            <input
                                type="file"
                                accept=".png,.jpg,.jpeg"
                                size={5 * 1024 * 1024}
                                ref={inputRef}
                                onChange={handleSelect}
                            />
                        </VisuallyHidden>
                        <Backdrop>
                            <StyledUpload as={HiOutlineCloudUpload} />
                        </Backdrop>)
                    </>
                }
            </AvatarBox>}
            {currentFile && (
                <ButtonsBox>
                    <Button
                        onClick={handleUpload}
                        $colors="light"
                        $variant="text"
                        Icon={HiCloudUpload}
                    >
                        Зберегти
                    </Button>

                    <Button onClick={reset} $colors="light" $variant="text" Icon={HiX}>
                        Відмінити
                    </Button>
                </ButtonsBox>
            )}
        </Wrapper>
    )
};

export default Avatar;