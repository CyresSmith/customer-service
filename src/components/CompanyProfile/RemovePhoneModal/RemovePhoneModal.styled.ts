import styled from 'styled-components';
import theme from 'utils/theme';

export const RemovePhoneBox = styled.div`
  min-width: 20vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${theme.space[6]};
`;

export const Message = styled.p`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.regular};
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${theme.space[3]};
`;

export const Phone = styled.span`
  font-size: ${theme.fontSizes.xxl};
  font-weight: ${theme.fontWeights.regular};
  text-align: center;
`;

export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.space[5]};
`;
