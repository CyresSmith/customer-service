import theme from 'utils/theme';
import { Container } from './HomeContent.styled';

const HomeContent = () => {
    return (
        <Container>
            <p
                style={{
                    textAlign: 'center',
                    fontSize: theme.fontSizes.heading.s,
                    marginTop: theme.space[8],
                }}
            >
                Згодом тут буде якась дуже необхідна інфа :)
            </p>
        </Container>
    );
};

export default HomeContent;
