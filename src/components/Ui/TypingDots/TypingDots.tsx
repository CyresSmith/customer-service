import { TypingDotsBox } from './TypingDots.styled';

type Props = { size?: number };

const TypingDots = ({ size = 5 }: Props) => {
    return (
        <TypingDotsBox size={size}>
            <span />
            <span />
            <span />
        </TypingDotsBox>
    );
};

export default TypingDots;
