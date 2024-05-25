import styled from 'styled-components';
import theme from 'utils/theme';

export const ListBox = styled.div`
    display: flex;
    gap: ${theme.space[3]};
    flex-grow: 1;
`;
type IsSelected = { $isSelected: boolean };

export const List = styled.ul`
    flex-grow: 1;
    overflow-y: scroll;
    background-color: ${theme.colors.bg.dark};
    border-radius: ${theme.radii.m};
    padding: ${theme.space[4]};
    display: flex;
    flex-direction: column;
    gap: ${theme.space[4]};
`;

export const ListItem = styled.li<IsSelected>`
    display: flex;
    flex-direction: column;
    gap: ${({ $isSelected }) => ($isSelected ? theme.space[4] : 0)};
    transition: ${theme.transition.primary};
`;

export const CompanyItem = styled.button<IsSelected>`
    width: 100%;
    display: flex;
    align-items: center;
    gap: ${theme.space[3]};
    color: ${theme.colors.white};
    transition: ${theme.transition.primary};

    > p {
        color: ${({ $isSelected }) =>
            $isSelected ? theme.colors.accent.light : theme.colors.white};
        transition: ${theme.transition.primary};
        word-break: break-all;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        flex: 1;
        text-align: left;
    }

    &:hover {
        > p {
            color: ${({ $isSelected }) =>
                $isSelected ? theme.colors.accent.main : theme.colors.secondary.main};
        }
    }
`;

const PADDING = theme.space[4];

export const ContactsList = styled.ul<IsSelected & { $contactsCount: number }>`
    display: flex;
    flex-direction: column;
    padding: ${({ $isSelected }) => ($isSelected ? `${PADDING} 0` : 0)};
    border-bottom: ${({ $isSelected }) => ($isSelected ? `1px solid ${theme.colors.white}` : 0)};
    border-top: ${({ $isSelected }) => ($isSelected ? `1px solid ${theme.colors.white}` : 0)};
    height: ${({ $isSelected, $contactsCount }) =>
        $isSelected && $contactsCount ? `calc(${$contactsCount} * 70px + (${PADDING} * 2))` : 0};
    transition: ${theme.transition.primary};
    overflow: hidden;
`;

export const ContactItem = styled.button<{ $active: boolean }>`
    width: 100%;
    padding: ${theme.space[3]};
    border-radius: ${theme.radii.xl};
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: ${theme.space[3]};
    align-items: center;
    color: ${({ $active }) => ($active ? theme.colors.bg.dark : theme.colors.white)};
    background-color: ${({ $active }) => ($active ? theme.colors.primary.main : 'transparent')};
    transition: ${theme.transition.primary};
`;

export const ContactName = styled.p`
    font-size: ${theme.fontSizes.xl};
    word-break: break-all;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
`;
