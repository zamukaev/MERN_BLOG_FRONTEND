import React from 'react';
import { fetchPosts } from '../../redux/slices/posts'

import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { logout } from '../../redux/slices/auth';
import { useSelector, useDispatch } from 'react-redux';

export const Header = () => {
	const isAuth = useSelector(state => Boolean(state.auth.data));
	const dispatch = useDispatch();

	const onClickLogout = () => {
		if (window.confirm('Möchten Sie wirklig auslogen?')) {
			dispatch(logout());
			localStorage.removeItem('token')
		}
	};
	return (
		<div className={styles.root}>
			<Container maxWidth="lg">
				<div className={styles.inner}>
					<Link onClick={() => dispatch(fetchPosts())} className={styles.logo} to="/">
						<div >BLOG</div>
					</Link>
					<div className={styles.buttons}>
						{isAuth ? (
							<>
								<Link to="/add-post">
									<Button variant="contained">Написать статью</Button>
								</Link>
								<Button onClick={onClickLogout} variant="contained" color="error">
									Выйти
								</Button>
							</>
						) : (
							<>
								<Link to="/login">
									<Button variant="outlined">Войти</Button>
								</Link>
								<Link to="/register">
									<Button variant="contained">Создать аккаунт</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};
