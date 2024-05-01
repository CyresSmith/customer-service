import { useTypedSelector } from './useTypedSelector';

export const useChat = () => useTypedSelector(state => state.chat);
