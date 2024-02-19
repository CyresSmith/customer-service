import styled from 'styled-components';
import theme from 'utils/theme';

export const ProfileInfoBox = styled.div`
  width: 100%;
`;

export const FormInputsList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: ${theme.space[5]};
  justify-content: center;
  align-items: center;

  div[id='info'] {
    grid-column-start: span 2;
    > div {
      > textarea {
        height: 80px;
      }
    }
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
