import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'utils/theme';

export const TopBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 72px;
  background-color: ${theme.colors.bg.dark};
  padding: ${theme.space[4]} ${theme.space[5]};
  border-radius: ${theme.radii.m};
  box-shadow: ${theme.shadow.m};
`;

export const Logo = styled(NavLink)`
  font-size: ${theme.fontSizes.xxl};
  font-weight: ${theme.fontWeights.bold};
  display: flex;
  align-items: center;
  gap: ${theme.space[4]};

  > img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: ${theme.radii.round};
  }
`;

export const FormBox = styled.div`
  width: 20vw;
`;
