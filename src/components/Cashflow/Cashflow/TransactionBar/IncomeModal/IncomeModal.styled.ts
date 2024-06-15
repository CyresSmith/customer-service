import styled from 'styled-components';
import theme from 'utils/theme';

export const ClientsInputBox = styled.div<{ $isClient: boolean }>`
    display: flex;
    align-items: center;
    gap: ${theme.space[3]};
    position: relative;
    height: 31px;

    button[id='removeItem'] {
        position: absolute;
        right: 0;
        bottom: 50%;
        transform: translateY(50%);
        opacity: ${({ $isClient }) => ($isClient ? 1 : 0)};
        pointer-events: ${({ $isClient }) => ($isClient ? 'unset' : 'none')};
    }

    svg[id='SearchIcon'] {
        opacity: ${({ $isClient }) => ($isClient ? 0 : 1)};
    }

    &:hover {
        > svg[id='SearchIcon'] {
            fill: ${theme.colors.bg.main};
        }
    }
`;

export const SearchIcon = styled.svg`
    width: 31px;
    height: 31px;
    padding: ${theme.space[2]};
    position: absolute;
    right: 0;
    bottom: 50%;
    transform: translateY(50%);
    fill: ${theme.colors.bg.light};
    transition: ${theme.transition.primary};
    pointer-events: none;
`;

export const ListBox = styled.div``;

export const ModalContentBox = styled.div<{ $isButtons?: boolean }>`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: ${({ $isButtons }) => ($isButtons ? '510px max-content' : '510px')};
    min-height: 500px;
    max-height: 600px;
`;

export const AddButtonBox = styled.div<{ $backButton?: boolean }>`
    display: flex;
    justify-content: ${({ $backButton }) => ($backButton ? 'space-between' : 'flex-end')};
    margin-top: ${theme.space[5]};
`;
