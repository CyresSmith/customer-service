import Button from "components/Ui/Buttons/Button/Button";
import { List, ListItem } from "./AuthNav.styled";

interface Props {
    toggleModal: () => void,
}

const AuthNav = ({toggleModal}: Props) => {
    return (
        <List>
            <ListItem>
                <Button handleClick={toggleModal} children="Вхід"/>
            </ListItem>
            <ListItem>
                <Button handleClick={toggleModal} children="Реєстрація"/>
            </ListItem>
        </List>
    )
};

export default AuthNav;