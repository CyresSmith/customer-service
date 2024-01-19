import AuthNav from "components/AuthNav";
import { BarWrapper } from "./TopBar.styled";

export interface IProps {
    openModal: (arg: string) => void,
}

const TopBar = ({openModal}: IProps) => {
    return(
        <BarWrapper>
            <div>LOGO</div>
            <AuthNav openModal={openModal}/>
        </BarWrapper>
    )
};

export default TopBar;