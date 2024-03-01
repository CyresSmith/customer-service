import styled from 'styled-components';
import theme from 'utils/theme';

export const AddServiceModalBox = styled.div`
  display: grid;
  grid-template-columns: 150px 400px;
  gap: ${theme.space[4]};
`;

export const StepButtonsBox = styled.div<{ $IsOneButton: boolean }>`
  display: flex;
  justify-content: ${({ $IsOneButton }) =>
    $IsOneButton ? 'end' : 'space-between'};
  width: 100%;
  margin-top: ${theme.space[5]};
`;
