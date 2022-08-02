// The individual post component
const Post = props => (
	<article id={props.id} className="post">
		<h2 className="post-title">{props.title}</h2>
		<hr />
		<p className="post-content">{props.content}</p>
		<button onClick={props.delete}>Delete this post</button>
	</article>
);

// The seperate form component to be written later

class Form extends React.Component {}

// The posts loop component

class Posts extends React.Component {
	state = {
		posts: [],
		post: {
			id: "",
			title: "",
			content: ""
		},
		indexes: []
	};

	componentDidMount() {
		const { posts } = this.state;
		axios
			.get("https://my-simple-react-blog-app.firebaseio.com/posts.json")
			.then(response => {
			console.log(response.data);
			  // create an array to hold th unique id as key and post as value using Object.entries
				const retrievedPosts = [];
				for (const [key, value] of Object.entries(response.data)) {
					const post = {
						id: key,
						title: value.title,
						content: value.content
					};
					// add all posts to the array here
					retrievedPosts.push(post);
				}
				// update state
				this.setState({ posts: retrievedPosts });
			console.log(retrievedPosts);
			});
	}
	handleChange = event => {
		const [name, value] = [event.target.name, event.target.value];
		// const value = event.target.value;
		const { post } = this.state;
		const newPost = {
			...post,
			[name]: value
		};
		this.setState({ post: newPost });
	};

	// submit = async (event) => {
	// 	 try{
	// 		 event.preventDefault();
	// 		const { posts } = this.state;
	// 		const postIndex = posts.length + 1;
	// 		const post = {
	// 			id: postIndex,
	// 			title: this.state.post.title,
	// 			content: this.state.post.content
	// 		}
	// 		let updatedPosts =[];
	// 		axios
	// 			.post("https://my-simple-react-blog-app.firebaseio.com/posts.json", post)
	// 			.then(response => {
	// 				 updatedPosts = [
	// 					...posts,
	// 					{ id: post.id, title: post.title, content: post.content }
	// 				];
	// 	 }
	// 		 catch(er){}
	// }
	handleSubmit = event => {
		event.preventDefault();
		const { posts } = this.state;
		// use this as a temporary id for post method
		const postIndex = posts.length + 1;
		const post = {
			id: postIndex,
			title: this.state.post.title,
			content: this.state.post.content
		};
		axios
			.post("https://my-simple-react-blog-app.firebaseio.com/posts.json", post)
			.then(response => {
				const updatedPosts = [
					...posts,
					{ id: post.id, title: post.title, content: post.content }
				];
			// update state
				this.setState({ posts: updatedPosts });
			console.log(posts);
			});

	};

	handleDelete = postId => {
		event.preventDefault();
		// get a copy of the posts
		const posts = [...this.state.posts];
		// in delete method use postId to create a unique url for the post to be deleted
		axios
			.delete(
				"https://my-simple-react-blog-app.firebaseio.com/posts/" + postId + ".json"
			)
			.then(response => {
			//update state
				this.setState({ posts: posts });
			});
	};

	render() {
		let posts = <p>No posts yet</p>;
		if (this.state.posts !== null) {
			posts = this.state.posts.map(post => {
				return (
					<Post
						id={post.id}
						key={post.id}
						{...post}
						delete={() => this.handleDelete(post.id)}
					/>
				);
			});
		}

		return (
			<React.Fragment>
				{posts}
				<form className="new-post-form" onSubmit={this.handleSubmit}>
					<label>
						Post title
						<input
							className="title-input"
							type="text"
							name="title"
							onChange={this.handleChange}
						/>
					</label>
					<label>
						Post content
						<textarea
							className="content-input"
							rows="7"
							type="text"
							name="content"
							onChange={this.handleChange}
						/>
					</label>
					<input className="submit-button" type="submit" value="submit" />
				</form>
			</React.Fragment>
		);
	}
}

class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Posts />
			</React.Fragment>
		);
	}
}
// Render method to run the app

ReactDOM.render(<App />, document.getElementById("id"));
