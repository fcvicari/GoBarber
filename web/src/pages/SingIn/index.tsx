import React from 'react';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Backgroud } from './styles';

const SingIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Faça seu logon</h1>

        <Input name="email" icon={FiMail} placeholder="E-Mail" />

        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Senha"
        />

        <Button type="submit">Entrar</Button>

        <a href="forgot">Esqueci minha senha.</a>
      </form>
      <a href="/singup">
        <FiLogIn />
        Criar conta
      </a>
    </Content>
    <Backgroud />
  </Container>
);

export default SingIn;
