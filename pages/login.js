import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Axios from 'axios'
import Router from 'next/router'
import { useState } from 'react'

export default function Login() {
    let isLogin = false
    let message = ""
    const [errorMessage, setErrorMessage] = useState("");
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        Axios
            .get("api/login", {params: data} )
            .then(res => {
                console.log(res)
                if (res.data.isLogin) {
                    Router.push('/home')
                } else {
                    setErrorMessage(res.data.message)
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                { errorMessage }
            </div>
            <TextField
                name="tenantId"
                label="テナントID"
                type="text"
                inputRef={register({ required: true })}
                error={Boolean(errors.tenantId)}
                helperText={errors.tenantId && "テナントIDは必須です。"}
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
                helperText={errors.userId && "ユーザIDは必須です。"}
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
                helperText={errors.password && "パスワードは必須です。"}
            />
            <Grid container justify="center">
                <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    style={{ marginTop: 10, marginBottom: 10 }}
                >
                    ログイン
            </Button>
            </Grid>
        </form>
    );
}