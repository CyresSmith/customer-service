import { ReactElement } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { PageBar, PageLayoutBox } from './PageContentLayout.styled';

type Props = {
    bar?: ReactElement;
    content: ReactElement;
};

const PageContentLayout = ({ bar, content }: Props) => {
    const { companyId } = useParams();

    return companyId ? (
        <PageLayoutBox>
            {bar && <PageBar>{bar}</PageBar>}
            {content}
        </PageLayoutBox>
    ) : (
        <Navigate to="/" replace={true} />
    );
};

export default PageContentLayout;
