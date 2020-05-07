import React, { ChangeEvent, FormEvent } from 'react';
import cn from 'classnames';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from '@material-ui/core';
import './Auth.scss';
import { CallBackHook, Hook } from '../../../hooks/types';
import { createFipc } from 'react-fipc';

export type AuthHooks = {
  usePhoneInput: Hook<[string, (e: ChangeEvent<HTMLInputElement>) => void]>;
  usePasswordInput: Hook<[string, (e: ChangeEvent<HTMLInputElement>) => void]>;
  useSubmitHandler: CallBackHook<[FormEvent<HTMLFormElement>]>;
};
export interface AuthProps extends AuthHooks {
  className?: string;
}

export const AuthComponent: React.FC<AuthProps> = ({
  usePasswordInput,
  usePhoneInput,
  useSubmitHandler,
  children,
  className,
}) => {
  const [phone, handlePhoneChange] = usePhoneInput();
  const [password, handlePasswordChange] = usePasswordInput();
  const submitHandler = useSubmitHandler();
  const blockClassName = cn(className, 'Auth');
  return (
    <div className={blockClassName}>
      <Grid
        className="Auth__inner"
        container
        justify="center"
        alignItems="center"
      >
        <Card className="Auth__card">
          <CardHeader title={'Войти'} />
          <CardContent>
            <form onSubmit={submitHandler} autoComplete={'on'}>
              <Grid container spacing={2} direction={'column'}>
                <Grid item>
                  <TextField
                    autoComplete={'on'}
                    type={'tel'}
                    value={phone}
                    onChange={handlePhoneChange}
                    fullWidth
                    variant={'outlined'}
                    label={'Телефон'}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    autoComplete={'on'}
                    type={'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    fullWidth
                    variant={'outlined'}
                    label={'Пароль'}
                  />
                </Grid>
                <Grid item>
                  <Button
                    type={'submit'}
                    fullWidth
                    color={'primary'}
                    size={'large'}
                    variant={'contained'}
                  >
                    Войти
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export const Auth$ = createFipc(AuthComponent);
