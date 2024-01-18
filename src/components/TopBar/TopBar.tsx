import AuthNav from "components/AuthNav";
import { BarWrapper } from "./TopBar.styled";

export interface IProps {
    toggleModal: () => void,
}

const TopBar = ({toggleModal}: IProps) => {
    return(
        <BarWrapper>
            <div>LOGO</div>
            <AuthNav toggleModal={toggleModal}/>
        </BarWrapper>
    )
};

export default TopBar;