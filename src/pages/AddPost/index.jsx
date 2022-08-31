import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';

import { useSelector } from 'react-redux';
import { isAuthSelector } from '../../redux/slices/auth';

import axios from '../../api/axios';

import styles from './AddPost.module.scss';
import { useState } from 'react';


export const AddPost = () => {
	const navigate = useNavigate();

	const { id } = useParams();

	const isAuth = useSelector(isAuthSelector);

	const [imageUrl, setImageUrl] = useState('');

	const inputFileRef = React.useRef();

	const [text, setText] = React.useState('');
	const [title, setTitle] = React.useState('');
	const [tags, setTags] = React.useState('');

	const [isLoading, setIsloading] = useState(false);

	const isEdit = Boolean(id);



	const handleChangeFile = async (event) => {
		try {
			const formData = new FormData();
			const file = event.target.files[0];
			formData.append('image', file);
			const { data } = await axios.post('/upload', formData);
			setImageUrl(data.url);
		} catch (err) {
			console.warn(err);
			alert(err);
		}
	};

	const onClickRemoveImage = () => {
		setImageUrl('')
	};

	const onChange = React.useCallback((value) => {
		setText(value);
	}, []);

	const onSubmit = async () => {
		try {
			setIsloading(true);
			const fields = {
				title,
				text,
				imageUrl,
				tags: tags
			};
			const { data } = (isEdit ? await axios.patch(`/posts/${id}`, fields) : await axios.post('/posts', fields));
			setIsloading(false);

			const _id = (isEdit ? id : data._id);
			navigate(`/posts/${_id}`);

		} catch (error) {
			alert(error)
		}
	}
	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Введите текст...',
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[],
	);

	React.useEffect(() => {
		if (isEdit) {
			axios.get(`/posts/${id}`).then(res => {
				setTitle(res.data.title);
				setText(res.data.text);
				setImageUrl(res.data.imageUrl);
				setTags(res.data.tags.join(','))
			})
		}
	}, [])

	if (!isAuth && !localStorage.getItem('token')) {
		return <Navigate to="/login" />
	}
	return (
		<Paper style={{ padding: 30 }}>
			<Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
				Загрузить превью
			</Button>
			<input ref={inputFileRef} onChange={handleChangeFile} type="file" hidden />
			{imageUrl && (
				<>
					<Button variant="contained" color="error" onClick={onClickRemoveImage}>
						Удалить
					</Button>
					<img className={styles.image} src={imageUrl ? `http://localhost:4444${imageUrl}` : ''} alt="Uploaded" /></>
			)
			}

			<br />
			<br />
			<TextField
				classes={{ root: styles.title }}
				variant="standard"
				placeholder="Заголовок статьи..."
				fullWidth
				value={title}
				onChange={event => setTitle(event.target.value)}
			/>
			<TextField
				classes={{ root: styles.tags }}
				variant="standard"
				placeholder="Тэги"
				fullWidth
				value={tags}
				onChange={event => setTags(event.target.value)}
			/>
			<SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />

			<div className={styles.buttons}>
				<Button onClick={onSubmit} size="large" variant="contained">
					{isEdit ? 'Сохранить' : 'Опубликовать'}
				</Button>
				<a href="/">
					<Button size="large">Отмена</Button>
				</a>
			</div>
		</Paper >
	);
};
