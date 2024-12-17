import NewsItems from "./NewsItems";
const NewsList = ({ news }) => {
  return (
    <div>
      {news.map((article, index) => (
        <NewsItems key={index} article={article} />
      ))}
    </div>
  );
};

export default NewsList;
