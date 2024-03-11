import styled from 'styled-components';
import theme from 'utils/theme';

export const ModalBox = styled.div`
  min-width: 400px;
  min-height: 340px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const AddServiceModalBox = styled.div`
  display: flex;
  gap: ${theme.space[5]};
  align-items: start;
  min-height: 340px;
`;

export const FormSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[4]};
`;

export const Form = styled.form`
  width: 400px;
`;

export const SelectBox = styled.div``;

export const StepButtonsBox = styled.div<{ $IsOneButton: boolean }>`
  display: flex;
  justify-content: ${({ $IsOneButton }) =>
    $IsOneButton ? 'end' : 'space-between'};
  width: 100%;
  margin-top: ${theme.space[5]};
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
  margin-top: ${theme.space[6]};
`;

export const DurationBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.space[4]};
  width: 100%;
`;

export const TimeBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.space[2]};
`;
