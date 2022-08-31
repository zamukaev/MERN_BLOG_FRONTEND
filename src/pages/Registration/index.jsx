import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Login.module.scss';
import { fetchRegisterUser, isAuthSelector } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(isAuthSelector)

	const { handleSubmit, register, setError, formState: { errors, isValid } } = useForm({
		defaultValues: {
			fullName: '',
			email: '',
			password: ''
		},
		mode: 'onChange'
	});

	const onSubmitHandler = async (values) => {
		const data = await dispatch(fetchRegisterUser(values));

		if (!data.payload) {
			alert('Konnte nicht regestriert werden!!');
		}
		if ('token' in data.payload) {
			localStorage.setItem('token', data.payload.token);
		}
	}
	if (isAuth) {
		return <Navigate to="/" />
	}
	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Создание аккаунта
			</Typography>
			<div className={styles.avatar}>
				<Avatar sx={{ width: 100, height: 100 }} />
			</div>
			<form onSubmit={handleSubmit(onSubmitHandler)}>
				<TextField
					className={styles.field}
					label="Полное имя"
					error={errors.fullName?.message}
					helperText={errors.fullName?.message}
					fullWidth {...register('fullName', { required: 'Geben Sie Name ein' })}
				/>
				<TextField
					className={styles.field}
					label="E-Mail"
					fullWidth
					error={errors.email?.message}
					helperText={errors.email?.message}
					{...register('email', { required: 'Geben Sie E-Mail ein' })} />
				<TextField
					className={styles.field}
					label="Пароль"
					fullWidth
					error={errors.password?.message}
					helperText={errors.password?.message}
					{...register('password', { required: 'Geben Sie password ein' })} />
				<Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth >
					Зарегистрироваться
				</Button>
			</form>
		</Paper>
	);
};
