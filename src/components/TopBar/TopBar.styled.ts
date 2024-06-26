import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'utils/theme';

export const HEADER_HIGHT = '72px';

export const TopBarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: ${HEADER_HIGHT};
    background-color: ${theme.colors.bg.dark};
    border-radius: ${theme.radii.l};
    padding: ${theme.space[3]};
    box-shadow: ${theme.shadow.m};

    @media ${theme.breakpoints.desktop.media} {
        padding: ${theme.space[4]} ${theme.space[5]};
    }
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
