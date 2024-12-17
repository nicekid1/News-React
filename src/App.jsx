import { useEffect, useState } from "react";
import NewsList from "./components/NewsList";
import style from "./app.module.css";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // API fetching
  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?q=Apple&from=2024-12-03&sortBy=popularity&apiKey=2eb953e106794636b68f5ea0981caa57"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok" && data.articles.length > 0) {
          setNews(data.articles);
        }
      })
      .catch(() => setError("An error occurred while fetching news"))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //delete removed news
  const availableNews = news.filter((item) => item.title !== "[Removed]");

  // Filter by search query
  const filteredNews = availableNews.filter((article) => {
    return article.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Pagination
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  if (loading) return <p>News is loading, please wait...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className={style.header}>
        <h1 className={style.headerTitle}>List of News</h1>
        <div className={style.search}>
          <h3>Search</h3>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search news..."
            className={style.searchBox}
          />
        </div>
      </div>
      <div className={style.mainPage}>
        <NewsList news={paginatedNews} />
      </div>
      <div className={style.footer}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={style.btn}
      >
        Previous
      </button>
      <p>
        Page {currentPage} of {totalPages}
      </p>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={style.btn}
      >
        Next
      </button>
      </div>
      
    </div>
  );
}

export default App;
