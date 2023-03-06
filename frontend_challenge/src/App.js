import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCoffeesThunk, addCoffeeThunk, deleteCoffeeThunk } from './store/coffee';
import { getAllPostsThunk, addPostThunk, deletePostThunk, getCoffeePostsThunk } from './store/post';
import { Modal } from './context/Modal';

const starRating = (num) => {
    const arr = []
    for (let i = 0; i < num; i++) {
        arr.push(<i key={i} className="fa-solid fa-star" />)
    }
    return arr
}

function App() {

    const dispatch = useDispatch();

    const [ sorted, setSorted ] = useState('ascending')
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ showNew, setShowNew ] = useState(false);
    const [ showAdd, setShowAdd ] = useState(false);
    const [ title, setTitle ] = useState('');
    const [ rating, setRating ] = useState('Rating');
    const [ coffee, setCoffee ] = useState('Select Coffee');
    const [ text, setText ] = useState('');
    const [ name, setName ] = useState('');
    const [ year, setYear ] = useState(0);
    const [ caffeine, setCaffeine ] = useState(0);
    const [ index, setIndex ] = useState(null);
    const [ coffeeId, setCoffeeId ] = useState(0);
    const [ postId, setPostId ] = useState(0);
    const [ showDelCoffee, setShowDelCoffee ] = useState(false);
    const [ showDelPost, setShowDelPost ] = useState(false);

    const coffeesObj = useSelector(state => state.coffees.all);
    const postsObj = useSelector(state => state.posts.all);

    const coffees = Object.values(coffeesObj);
    let posts = Object.values(postsObj);

    useEffect(() => {
        (async () => {
            await dispatch(getAllCoffeesThunk());
            await dispatch(getAllPostsThunk());
            setIsLoaded(true);
        })()
    }, [])

    useEffect(() => {
        (async () => {
            await dispatch(getCoffeePostsThunk())
        })()
    }, [])

    const onSubmitPost = async e => {
        e.preventDefault()

        const formData = {
            title,
            coffee,
            text,
            rating
        }
        await dispatch(addPostThunk(formData))
        await dispatch(getAllPostsThunk())
        await setShowNew(false)
        return
    }

    const onSubmitCoffee = async e => {
        e.preventDefault()

        const formData = {
            name,
            year,
            caffeine
        }
        await dispatch(addCoffeeThunk(formData))
        await dispatch(getAllCoffeesThunk())
        await setShowAdd(false)
        return
    }

    const onDeleteCoffee = async () => {
        await dispatch(deleteCoffeeThunk(coffeeId))
        await dispatch(getAllCoffeesThunk())
        await dispatch(getAllPostsThunk())
        return
    }

    const onDeletePost = async () => {
        await dispatch(deletePostThunk(postId))
        await dispatch(getAllPostsThunk())
        return
    }

    const sortPosts = () => {
        if(sorted === 'ascending') {
            posts = posts.sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
        } else if (sorted === 'descending') {
            posts = posts.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
        }
        return posts
    }

    return isLoaded && (
        <>
            <div className="main-container">
                <div className="posts-container">
                    <div className="posts-header">
                        <div className="header-left">
                            <h2>Posts</h2>
                            <button className="new-post" onClick={() => setShowNew(true)}>
                                New Post
                            </button>
                        </div>
                        <div className="header-right">
                            <select
                                className="sorted-select"
                                value={sorted}
                                onChange={(e) => setSorted(e.target.value)}
                            >
                                <option value='ascending'>asc</option>
                                <option value='descending'>desc</option>
                            </select>
                        </div>
                    </div>
                    <div className="posts-content">
                        {sortPosts(posts).map((post, idx) => (
                            <div className="post-card" key={post.id}>
                                <div className="p-header">
                                    <h2>{post.title}</h2>
                                </div>
                                <div className="p-ratings">
                                    {starRating(post.rating)}
                                </div>
                                <div className="p-body">
                                    <p>{post.text}</p>
                                </div>
                                <div
                                    className="coffee-wrapper"
                                    onMouseEnter={() => {
                                        setShowDelPost(true)
                                        setPostId(post.id)
                                        setIndex(idx)
                                    }}
                                    onMouseLeave={() => {
                                        setShowDelPost(false)
                                        setPostId(0)
                                        setIndex(null)
                                    }}>
                                    <div className="p-coffee-details">
                                        <p id="post-coff">{post.coffee_name} - {post.caffeine} mg per oz</p>
                                    </div>
                                    <div className="post-delete">
                                        {showDelPost && index === idx && (
                                            <button className="new-coffee" onClick={onDeletePost}>
                                                x
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {showNew && (
                        <Modal onClose={() => setShowNew(false)}>
                            <div className="create-post">
                                <form className="create-wrapper" onSubmit={onSubmitPost}>
                                    <div className="create-header">
                                        <h2>Create Post</h2>
                                    </div>
                                    <div className="create-title">
                                        <input
                                            type="text"
                                            className="title"
                                            placeholder="Title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="middle-input">
                                        <div className="create-rating">
                                            <select
                                                className="rating"
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                            >
                                                <option disabled>Rating</option>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                            </select>
                                        </div>
                                        <div className="create-coffee">
                                            <p>Coffee:</p>
                                            <select
                                                className="cc-select"
                                                value={coffee}
                                                onChange={(e) => setCoffee(e.target.value)}
                                            >
                                                <option disabled>Select Coffee</option>
                                                {coffees.map(c => (
                                                    <option key={c.id} value={c.id}>{c.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="create-textarea">
                                        <textarea
                                            style={{ resize: "none" }}
                                            className="textarea"
                                            placeholder="Post Text"
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                        />
                                    </div>
                                    <div className="create-btn">
                                        <button className="cc-btn" type="submit">
                                            submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Modal>
                    )}
                </div>
                <div className="coffees-container">
                    <div className="coffees-header">
                        <h3>Coffees</h3>
                        <button className="new-coffee" onClick={() => setShowAdd(!showAdd)}>
                            New Coffee
                        </button>
                    </div>
                    {showAdd && (
                        <div className="add-coffee-wrapper">
                            <form className="add-coffee-form" onSubmit={onSubmitCoffee}>
                                <div className="add-header">
                                    <h3>New Coffee</h3>
                                </div>
                                <div className="name-input">
                                    <p id="label">Name:</p>
                                    <input
                                        type="text"
                                        className="input"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="year-input">
                                    <p id="label">Year:</p>
                                    <input
                                        type="number"
                                        className="input"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                    />
                                </div>
                                <div className="caff-input">
                                    <p id="label">Caffeine:</p>
                                    <input
                                        type="number"
                                        className="input"
                                        value={caffeine}
                                        onChange={(e) => setCaffeine(e.target.value)}
                                    />
                                </div>
                                <div className="new-btn">
                                    <button className="new-coffee" type="submit">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                    <div className="coffees-content">
                        {coffees.map((coffee, idx) => (
                            <div
                                key={coffee.id}
                                className="coffee-card"
                                onMouseEnter={() => {
                                    setShowDelCoffee(true)
                                    setCoffeeId(coffee.id)
                                    setIndex(idx)
                                }}
                                onMouseLeave={() => {
                                    setShowDelCoffee(false)
                                    setCoffeeId(0)
                                    setIndex(null)
                                }}>
                                <div className="coffee-icon">
                                    <i className="fa-solid fa-mug-hot" />
                                </div>
                                <div className="coffee-name">
                                    <p id="coff">{coffee.name} - {coffee.year}</p>
                                </div>
                                {index === idx && showDelCoffee && (
                                    <div className="coffee-delete">
                                        <button className="new-coffee" onClick={onDeleteCoffee}>
                                            x
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
