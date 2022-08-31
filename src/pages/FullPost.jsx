import React, { useState } from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "../api/axios";

export const FullPost = () => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();
	useEffect(() => {
		axios.get(`/posts/${id}`).then(response => {
			setData(response.data);
			console.log(response.data)
			setIsLoading(false);
		})
	}, []);
	return (
		isLoading
			? <Post isLoading={isLoading} />
			:
			<>
				<Post
					id={1}
					title={data.title}
					imageUrl={data.imageUrl ? data.imageUrl : ''}
					user={{
						avatarUrl: data.user?.avatarUrl,
						fullName: data.user?.fullName,
					}}
					createdAt={data.createdAt}
					viewsCount={data.viewsCount}
					commentsCount={3}
					tags={data.tags}
					isFullPost
				>
					<p>
						{data.text}
					</p>
				</Post>
				<CommentsBlock
					items={[
						{
							user: {
								fullName: "Вася Пупкин",
								avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
							},
							text: "Это тестовый комментарий 555555",
						},
						{
							user: {
								fullName: "Иван Иванов",
								avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
							},
							text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
						},
					]}
					isLoading={false}
				>
					<Index />
				</CommentsBlock>
			</>
	);
};
