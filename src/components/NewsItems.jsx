import style from "./newsItems.module.css";


export default function NewsItems({article}) {
  return (
    <div className={style.news}>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
        />
      )}
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Continue reading...
      </a>
    </div>
  );
}
