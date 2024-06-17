import { useTypedSelector } from './useTypedSelector';

export const useMenu = () =>
    useTypedSelector(state => {
        return state.user.isMenuOpen;
    });
