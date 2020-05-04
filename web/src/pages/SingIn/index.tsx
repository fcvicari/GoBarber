import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Backgroud, AnimationContainer } from './styles';
import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';

interface SingInFormData {
  email: string;
  password: string;
}

const SingIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { singIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SingInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-Mail obrigatório.')
            .email('Digite um e-mail válido.'),
          password: Yup.string().required('Senha obrigatória.'),
        });
        await schema.validate(data, { abortEarly: false });
        await singIn({ email: data.email, password: data.password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação.',
          description:
            'Ocorreu erro ao efetuar o login. Verifique as credenciais.',
        });
      }
    },
    [singIn, addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
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
          </Form>
          <Link to="/singup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Backgroud />
    </Container>
  );
};

export default SingIn;
