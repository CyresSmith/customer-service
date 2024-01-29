import styled from 'styled-components';
import theme from 'utils/theme';

const ANIMATION_TIME = '3s';

export const LoaderBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Spinner = styled.span`
  animation: rotate ${ANIMATION_TIME} infinite;
  height: 50px;
  width: 50px;

  &:before,
  &:after {
    content: '';
    border-radius: 50%;
    display: block;
    height: 20px;
    width: 20px;
  }

  &:before {
    animation: ball1 ${ANIMATION_TIME} infinite;
    background-color: ${theme.colors.secondary.light};
    box-shadow: 30px 0 0 ${theme.colors.accent.main};
    margin-bottom: 10px;
  }

  &:after {
    animation: ball2 ${ANIMATION_TIME} infinite;
    background-color: ${theme.colors.accent.main};
    box-shadow: 30px 0 0 ${theme.colors.secondary.light};
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg) scale(0.8);
    }
    50% {
      transform: rotate(360deg) scale(1.2);
    }
    100% {
      transform: rotate(720deg) scale(0.8);
    }
  }

  @keyframes ball1 {
    0% {
      box-shadow: 30px 0 0 ${theme.colors.accent.main};
    }
    50% {
      box-shadow: 0 0 0 ${theme.colors.accent.main};
      margin-bottom: 0;
      transform: translate(15px, 15px);
    }
    100% {
      box-shadow: 30px 0 0 ${theme.colors.accent.main};
      margin-bottom: 10px;
    }
  }

  @keyframes ball2 {
    0% {
      box-shadow: 30px 0 0 ${theme.colors.secondary.light};
    }
    50% {
      box-shadow: 0 0 0 ${theme.colors.secondary.light};
      margin-top: -20px;
      transform: translate(15px, 15px);
    }
    100% {
      box-shadow: 30px 0 0 ${theme.colors.secondary.light};
      margin-top: 0;
    }
  }
`;
