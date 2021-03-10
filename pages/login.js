import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

export default function Login() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
            name="tenantId"
            label="テナントID"
            type="text"
            inputRef={register({ required: true })}
            error={Boolean(errors.tenantId)}
            helperText={ errors.tenantId && "テナントIDは必須です。" }
        />
        <TextField
            name="userId"
            label="ユーザID"
            type="text"
            variant="filled"
            fullWidth
            margin="normal"
            inputRef={register({ required: true })}
            error={Boolean(errors.userId)}
            helperText={ errors.userId && "ユーザIDは必須です。" }
        />
        <TextField
            name="password"
            label="パスワード"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            inputRef={register({ required: true })}
            error={Boolean(errors.password)}
            helperText={ errors.password && "パスワードは必須です。" }
        />
        <Grid container justify="center">
            <Button
                variant="contained"
                color="secondary"
                type="submit"
                style={{ marginTop: 10 }}
            >
            Submit
            </Button>
        </Grid>
    </form>
  );
}