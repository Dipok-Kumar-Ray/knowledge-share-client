import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const CategoryArticles = () => {
  const { categoryName } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/articles?category=${categoryName}`)
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error(err));
  }, [categoryName]);

  return (
    <section className="py-12 px-5">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Articles in: {categoryName}
        </motion.h2>

        {articles.length > 0 ? (
          <div className="space-y-4">
            {articles.map((article) => (
              <motion.div
                key={article._id}
                className="bg-gray-100 rounded-lg p-4 shadow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-500">
                  By {article.author} · {new Date(article.date).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p>No articles found in this category.</p>
        )}
      </div>
    </section>
  );
};

export default CategoryArticles;
