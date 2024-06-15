import { IconType } from 'react-icons';
import { TitleBox, Way, WayDesc, WayIcon, WayList, WayTitle } from './ChoseWay.styled';

type Props = {
    ways: { id: number; icon: IconType; title: string; desc?: string }[];
    setWay: (id: number) => void;
};

const ChoseWay = ({ ways, setWay }: Props) => {
    return (
        <WayList $waysCount={ways.length}>
            {ways.map(({ id, icon, title, desc }) => (
                <li key={id}>
                    <Way onClick={() => setWay(id)}>
                        <TitleBox>
                            <WayIcon as={icon} />
                            <WayTitle>{title}</WayTitle>
                        </TitleBox>

                        {desc && <WayDesc>{desc}</WayDesc>}
                    </Way>
                </li>
            ))}
        </WayList>
    );
};

export default ChoseWay;
