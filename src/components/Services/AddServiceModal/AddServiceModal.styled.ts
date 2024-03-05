import styled from 'styled-components';
import theme from 'utils/theme';

export const AddServiceModalBox = styled.div`
  display: flex;
  gap: ${theme.space[5]};
  align-items: start;
`;

export const FormSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[5]};
`;

export const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[4]};
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
`;

export const DurationBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.space[4]};
`;

export const TimeBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.space[2]};
  width: 115px;

  input {
    width: 65px;
  }
`;
