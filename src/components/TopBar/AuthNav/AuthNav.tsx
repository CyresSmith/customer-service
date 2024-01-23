import Button from "components/Ui/Buttons/Button/Button";
import { List, ListItem } from "./AuthNav.styled";

type Props = {
    openModal?: (arg: string) => void,
}

const AuthNav = ({openModal}: Props) => {
    return (
        <List>
            <ListItem>
                <Button name='login' type="button" $bgColor="button" $type="text" openModal={openModal} children="Вхід"/>
            </ListItem>
            <ListItem>
                <Button name='register' type="button" $bgColor="button" $type="text" openModal={openModal} children="Реєстрація"/>
            </ListItem>
        </List>
    )
};

export default AuthNav;