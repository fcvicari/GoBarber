import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import singUpBackgroudImage from '../../assets/sing-up-background.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromRigth = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px)
  }
  to {
    opacity: 1;
    transform: translateX(0px)
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;

  animation: ${appearFromRigth} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #ff9900;
      display: block;
      margin-top: 80px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#ff9900')};
      }
    }
  }
`;

export const Backgroud = styled.div`
  flex: 1;
  background: url(${singUpBackgroudImage}) no-repeat center;
  background-size: cover;
`;
