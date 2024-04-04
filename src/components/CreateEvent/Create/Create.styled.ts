import styled from 'styled-components';
import theme from 'utils/theme';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: ${theme.space[4]};
  align-items: center;
  justify-content: center;
`;

export const FirstStepChoose = styled.div`
  padding: ${theme.space[2]};
  width: calc((100% - ${theme.space[7]}) / 2);
  height: 200px;
  display: flex;
  gap: ${theme.space[3]};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${theme.borders.bold} ${theme.colors.accent.main};
  border-radius: ${theme.radii.xs};
  cursor: pointer;
  transition: ${theme.transition.primary};

  &:hover,
  :focus-visible {
    box-shadow: ${theme.shadow.m};
  }
`;

export const FirstStepChooseIcon = styled.svg`
  width: 50px;
  height: 50px;
  stroke: ${theme.colors.accent.light};
`;

export const FirstStepChooseText = styled.div`
  text-align: center;
`;

export const FirstStepChooseTitle = styled.p`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.accent.light};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: ${theme.space[3]};
`;

export const FirstStepChooseDesc = styled.p`
  font-style: italic;
`;
