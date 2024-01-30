import styled from 'styled-components';
import theme from 'utils/theme';

export const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: ${theme.space[5]};
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[5]};
`;

export const Name = styled.h1`
  font-size: ${theme.fontSizes.heading.s};
  font-weight: ${theme.fontWeights.regular};
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.space[2]};
  margin-bottom: ${theme.space[2]};
`;

export const Title = styled.h5`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
`;

export const InfoBlock = styled.div`
  > ul {
    display: flex;
    flex-direction: column;
    gap: ${theme.space[2]};
  }
`;

const ICON_SIZE = '20px';

export const StyledIcon = styled.svg`
  width: ${ICON_SIZE};
  height: ${ICON_SIZE};
  fill: ${theme.colors.accent.main};
`;

export const Address = styled.p`
  margin-left: calc(${theme.space[2]} + ${ICON_SIZE});
`;

export const InfoList = styled.ul`
  margin-left: calc(${theme.space[2]} + ${ICON_SIZE});
`;