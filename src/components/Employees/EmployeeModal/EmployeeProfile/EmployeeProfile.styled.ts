import styled from 'styled-components';
import theme from 'utils/theme';

export const ProfileBox = styled.div`
    display: grid;
    grid-template-rows: max-content 1fr;
    gap: ${theme.space[5]};
    align-items: center;

    @media ${theme.breakpoints.tablet.media} {
        grid-template-columns: 150px 1fr;
        grid-template-rows: 1fr;
        min-height: 350px;
        align-items: start;
    }

    @media ${theme.breakpoints.desktop.media} {
        grid-template-columns: 200px 1fr;
        grid-template-rows: 1fr;
        min-height: 350px;
        align-items: start;
    }
`;

export const AvatarBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};
    align-items: center;
    justify-content: space-between;

    @media ${theme.breakpoints.tablet.media} {
        align-items: flex-start;
        height: 100%;
    }
    @media ${theme.breakpoints.desktop.media} {
        align-items: flex-start;
        height: 100%;
    }
`;

export const StatusBadge = styled.span<{ $active: boolean; $size?: 's' | 'l' }>`
    font-size: ${({ $size }) => theme.fontSizes[$size === 's' ? 'xs' : 'l']};
    font-weight: ${theme.fontWeights.bold};
    text-transform: uppercase;
    width: ${({ $size }) => ($size === 's' ? 'auto' : '100px')};
    text-align: center;
    padding: ${({ $size }) =>
        $size === 's' ? `${theme.space[0]} ${theme.space[2]}` : theme.space[2]};
    border-radius: ${theme.radii.s};
    color: ${theme.colors.bg.main};
    background-color: ${({ $active }) =>
        $active ? theme.colors.success.light : theme.colors.danger.light};
`;

export const Status = styled.ul`
    display: flex;
    justify-content: center;
    gap: ${theme.space[0]};
    width: 100%;
`;

export const StatusItem = styled.li<{ $active: boolean }>`
    flex: 0.5;

    button {
        font-size: ${theme.fontSizes.s};
        font-weight: ${theme.fontWeights.bold};
        text-transform: uppercase;
        transition: ${theme.transition.primary};
        cursor: pointer;
        text-align: center;
        padding: ${theme.space[1]} ${theme.space[3]};
        color: ${theme.colors.bg.main};
        background-color: ${theme.colors.bg.light};
        width: 100%;
    }

    &:first-of-type {
        > button {
            border-radius: ${theme.radii.l} 0 0 ${theme.radii.l};
            background-color: ${({ $active }) =>
                $active ? theme.colors.success.light : theme.colors.bg.light};

            &:hover {
                background-color: ${theme.colors.success.main};
            }
        }
    }

    &:last-of-type {
        > button {
            border-radius: 0 ${theme.radii.l} ${theme.radii.l} 0;
            background-color: ${({ $active }) =>
                $active ? theme.colors.danger.light : theme.colors.bg.light};

            &:hover {
                background-color: ${theme.colors.danger.main};
            }
        }
    }
`;
