import { TopBar } from "./PageTopBar.styled"

type Props = {
    components: React.ReactNode[];
}

const PageTopBar = ({components}: Props) => {
    return (
        <TopBar>
            {components.map((component, i) => <div key={i}>{component}</div>)}
        </TopBar>
    )
};

export default PageTopBar;