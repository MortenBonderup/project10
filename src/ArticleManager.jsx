import { useState } from 'react';
import styles from './ArticleManager.module.css';

function ArticleManager() {
    const [articles, setArticles] = useState([]);
    const [currentArticle, setCurrentArticle] = useState({ title: '', content: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    function handleChange(e) {
        const { name, value } = e.target;
        setCurrentArticle({ ...currentArticle, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isEditing) {
            const updatedArticles = articles.map((article, index) =>
                index === editIndex ? currentArticle : article
            );
            setArticles(updatedArticles);
            setIsEditing(false);
            setEditIndex(null);
        } else {
            setArticles([...articles, currentArticle]);
        }
        setCurrentArticle({ title: '', content: '' });
    }

    function handleDelete(index) {
        // The underscore (_) is used as a placeholder. 
        // This is a common convention to indicate that the parameter is intentionally unused.
        const updatedArticles = articles.filter((_, i) => i !== index);
        setArticles(updatedArticles);
    }

    function handleEdit(index) {
        setCurrentArticle(articles[index]);
        setIsEditing(true);
        setEditIndex(index);
    }

    return (
        <div className={styles.container}>
            <h1>Article Manager</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={currentArticle.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Article:</label>
                    <textarea
                        name="content"
                        value={currentArticle.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{isEditing ? 'Update' : 'Create'} Article</button>
            </form>
            <h2>Articles</h2>
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        <h3>{article.title}</h3>
                        <p>{article.content}</p>
                        <button onClick={() => handleEdit(index)}>Edit</button>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ArticleManager;
