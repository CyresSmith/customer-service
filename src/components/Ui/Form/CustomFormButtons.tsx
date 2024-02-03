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
    disabledSubmit,
    disabledReset
}: ButtonsProps) => {
    return (
        <ButtonsWrapper $direction={direction}>
            <ButtonBox $second={resetButtonLabel ? true : false} $buttonWidth={buttonWidth}>
                <Button
                    children={submitButtonLabel}
                    Icon={SubmitIcon}
                    type='submit'
                    isLoading={isLoading}
                    disabled={disabledSubmit}
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
                        disabled={disabledReset}
                        $colors="light"
                    />
                </ButtonBox>
            }
        </ButtonsWrapper>
    )
};

export default CustomFormButtons;