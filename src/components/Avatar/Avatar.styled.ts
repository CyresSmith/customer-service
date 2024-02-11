import styled from 'styled-components';
import theme from 'utils/theme';

interface IImageBox {
  $light: boolean;
  size: number;
  $round: boolean;
  $allowChanges: boolean;
}

export const AvatarBox = styled.div<{ width: number }>`
  width: ${({ width }) => (width ? `${width}px` : '250px')};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ImageBox = styled.div<IImageBox>`
  position: relative;
  width: ${({ size }) => (size ? `${size}px` : '250px')};
  height: ${({ size }) => (size ? `${size}px` : '250px')};
  object-fit: cover;
  overflow: hidden;
  border-radius: ${({ $round }) =>
    $round ? theme.radii.round : theme.radii.xs};
  background-color: ${({ $light }) =>
    $light ? `rgba(255, 255, 255, 0.5 )` : `rgba(0, 0, 0, 0.5 )`};
  cursor: ${({ $allowChanges }) => (!$allowChanges ? 'default' : 'pointer')};

  &:hover {
    > svg {
      opacity: 0.8;
    }

    > svg[id='camera'] {
      transform: translate(-50%, -250%);
    }

    > svg[id='upload'] {
      transform: translate(-50%, -50%);
    }
  }

  > svg {
    position: absolute;
    left: 50%;
    width: 50%;
    height: 50%;
    opacity: 0.5;
    transition: ${theme.transition.primary};
    fill: ${theme.colors.white};
  }

  > svg[id='camera'] {
    top: 50%;
    transform: translate(-50%, -50%);
  }

  > svg[id='upload'] {
    top: 50%;
    transform: translate(-50%, 250%);
  }

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ButtonsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: ${theme.space[3]};
`;
