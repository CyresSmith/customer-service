import Loader from '../Loader';
import { Container, BarSkeleton, ContentSkeleton, Backdrop } from './LayoutLoaderSkeleton.styled';

const LayoutLoaderSkeleton = () => {
    return (
        <Container>
            <BarSkeleton />
            <ContentSkeleton />
            <Backdrop />
            <Loader />
        </Container>
    );
};

export default LayoutLoaderSkeleton;
