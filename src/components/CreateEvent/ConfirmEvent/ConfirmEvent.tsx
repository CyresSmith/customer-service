import { IEmployee } from 'services/types/employee.types';
import { HiPhoto } from 'react-icons/hi2';
import { ServiceBasicInfo } from 'services/types/service.type';
import {
    AvatarBox,
    Container,
    EventInfoList,
    EventInfoListItem,
    ListItemText,
    ListItemTitle,
    SubjectDesc,
    SubjectDetails,
    SubjectInfoWrapper,
    SubjectName,
} from './ConfirmEvent.styled';
import { format } from 'date-fns';
import { millisecondsToTime } from 'helpers/millisecondsToTime';
import {
    List,
    ListItem,
    RightWrapper,
    ServiceName,
    ServicePrice,
    ServiceTime,
} from '../ServicesList/ServicesList.styled';
import getAvatarLetters from 'helpers/getAvatarLetters';
import { Client } from 'services/types/clients.types';

type Props = {
    chosenEmployee: IEmployee;
    chosenServices: ServiceBasicInfo[];
    eventDate: Date;
    eventTime: string;
    chosenClient: Client;
    eventDuration: number;
};

const ConfirmEvent = ({
    chosenEmployee,
    chosenServices,
    eventDate,
    eventTime,
    chosenClient,
    eventDuration,
}: Props) => {
    // const getTotalDuration = () => {
    //     let total = 0;

    //     chosenServices.forEach(({ duration }) => {
    //         total += duration;
    //     });

    //     return millisecondsToTime(total);
    // };

    return (
        <Container>
            <EventInfoList>
                <EventInfoListItem>
                    <ListItemTitle>Клієнт:</ListItemTitle>
                    <SubjectDetails>
                        <AvatarBox>
                            {chosenClient.avatar ? (
                                <img
                                    src={String(chosenClient.avatar)}
                                    alt={`${chosenClient.firstName} image`}
                                />
                            ) : chosenClient.firstName ? (
                                <span>{getAvatarLetters(chosenClient.firstName)}</span>
                            ) : (
                                <HiPhoto />
                            )}
                        </AvatarBox>
                        <SubjectInfoWrapper>
                            <SubjectName>
                                {chosenClient.firstName + ' ' + chosenClient.lastName}
                            </SubjectName>
                            <SubjectDesc>{chosenClient.phone}</SubjectDesc>
                        </SubjectInfoWrapper>
                    </SubjectDetails>
                </EventInfoListItem>
                <EventInfoListItem>
                    <ListItemTitle>Дата:</ListItemTitle>
                    <ListItemText>{format(eventDate, 'MM.dd.yyyy')}</ListItemText>
                </EventInfoListItem>
                <EventInfoListItem>
                    <ListItemTitle>Час:</ListItemTitle>
                    <ListItemText>{eventTime}</ListItemText>
                </EventInfoListItem>
                <EventInfoListItem>
                    <ListItemTitle>Тривалість:</ListItemTitle>
                    <ListItemText>{millisecondsToTime(eventDuration)}</ListItemText>
                </EventInfoListItem>
                <EventInfoListItem>
                    <ListItemTitle>Послуги:</ListItemTitle>
                    <List>
                        {chosenServices.map(({ name, duration, price, id }) => (
                            <ListItem key={id}>
                                <ServiceName>{name}</ServiceName>
                                <RightWrapper>
                                    <ServiceTime>{millisecondsToTime(duration)}</ServiceTime>
                                    <ServicePrice>{price + ' грн.'}</ServicePrice>
                                </RightWrapper>
                            </ListItem>
                        ))}
                    </List>
                </EventInfoListItem>
                <EventInfoListItem>
                    <ListItemTitle>Виконавець:</ListItemTitle>
                    <SubjectDetails>
                        <AvatarBox>
                            {chosenEmployee.avatar ? (
                                <img
                                    src={String(chosenEmployee.avatar)}
                                    alt={`${chosenEmployee.firstName} image`}
                                />
                            ) : chosenEmployee.firstName ? (
                                <span>{getAvatarLetters(chosenEmployee.firstName)}</span>
                            ) : (
                                <HiPhoto />
                            )}
                        </AvatarBox>
                        <SubjectInfoWrapper>
                            <SubjectName>
                                {chosenEmployee.firstName + ' ' + chosenEmployee.lastName}
                            </SubjectName>
                            <SubjectDesc>{chosenEmployee.jobTitle}</SubjectDesc>
                        </SubjectInfoWrapper>
                    </SubjectDetails>
                </EventInfoListItem>
            </EventInfoList>
        </Container>
    );
};

export default ConfirmEvent;
