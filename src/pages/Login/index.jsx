import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form';

import { Navigate } from 'react-router-dom'

import { fetchUserData } from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthSelector } from '../../redux/slices/auth'

import styles from "./Login.module.scss";

export const Login = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(isAuthSelector);

	const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
		defaultValues: {
			email: '',
			password: ''
		},
		mode: 'onChange'
	});
	const onSubmit = async (values) => {
		const data = await dispatch(fetchUserData(values));
		if (!data.payload) {
			return alert('Konnte nicht eingelogt werden!')
		}
		if ('token' in data.payload) {
			localStorage.setItem('token', data.payload.token)
		}
	}

	if (isAuth) {
		return <Navigate to="/" />
	}

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Вход в аккаунт
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					type="email"
					className={styles.field}
					label="E-Mail"
					error={errors.email?.message}
					helperText={errors.email?.message}
					{...register('email', { required: 'Geben Sie bitte Email an' })}

					fullWidth
				/>
				<TextField className={styles.field} label="Пароль" error={errors.password?.message} helperText={errors.password?.message} {...register('password', { required: 'Geben Sie bitte Password an' })} fullWidth />
				<Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
					Войти
				</Button>
			</form>
		</Paper>
	);
};
