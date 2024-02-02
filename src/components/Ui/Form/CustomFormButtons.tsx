import Button from "../Buttons/Button";
import { ButtonBox, ButtonsWrapper } from "./CustomForm.styled";
import { ButtonsProps } from "./types";

const CustomFormButtons = ({
    buttonWidth,
    submitButtonLabel,
    resetButtonLabel,
    direction,
    onReset,
    SubmitIcon,
    ResetIcon,
    isLoading,
    disabled
}: ButtonsProps) => {
    return (
        <ButtonsWrapper $direction={direction}>
            <ButtonBox $second={resetButtonLabel ? true : false} $buttonWidth={buttonWidth}>
                <Button
                    children={submitButtonLabel}
                    Icon={SubmitIcon}
                    type='submit'
                    isLoading={isLoading}
                    disabled={disabled}
                    $colors="accent"
                />
            </ButtonBox>
            {resetButtonLabel &&
                <ButtonBox $second={resetButtonLabel ? true : false} $buttonWidth={buttonWidth}>
                    <Button
                        onClick={onReset}
                        children={resetButtonLabel}
                        Icon={ResetIcon}
                        type="button"
                        disabled={disabled}
                        $colors="light"
                    />
                </ButtonBox>
            }
        </ButtonsWrapper>
    )
};

export default CustomFormButtons;