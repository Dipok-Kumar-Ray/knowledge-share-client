import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useParams, Link } from 'react-router';

const LearningPathDetails = () => {
  const { user } = useContext(AuthContext);
  const { pathId } = useParams();
  const [learningPath, setLearningPath] = useState(null);
  const [pathProgress, setPathProgress] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch learning path details
    fetch(`${import.meta.env.VITE_API_URL}/learning-paths/${pathId}`)
      .then(res => res.json())
      .then(data => {
        setLearningPath(data);
        
        // Fetch articles in the path
        const articleIds = data.articleSequence || [];
        if (articleIds.length > 0) {
          // For simplicity, we'll fetch all articles and filter
          // In a production app, you might want to create an endpoint to fetch multiple articles by IDs
          fetch(`${import.meta.env.VITE_API_URL}/articles`)
            .then(res => res.json())
            .then(allArticles => {
              const pathArticles = allArticles.filter(article => 
                articleIds.includes(article._id)
              );
              // Sort articles according to the sequence in the learning path
              const sortedArticles = articleIds.map(id => 
                pathArticles.find(article => article._id === id)
              ).filter(Boolean);
              setArticles(sortedArticles);
            })
            .catch(error => {
              console.error('Error fetching articles:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error fetching learning path:', error);
        setLoading(false);
      });

    // Fetch user progress for this path if logged in
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/user/progress/${user.email}/path/${pathId}`)
        .then(res => res.json())
        .then(data => {
          setPathProgress(data.progress);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching path progress:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [pathId, user]);

  const handleEnroll = () => {
    if (!user?.email) {
      alert('Please log in to enroll in learning paths');
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/user/progress/${user.email}/enroll/${pathId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(() => {
      // Refresh progress data
      fetch(`${import.meta.env.VITE_API_URL}/user/progress/${user.email}/path/${pathId}`)
        .then(res => res.json())
        .then(data => {
          setPathProgress(data.progress);
          alert('Successfully enrolled in learning path!');
        });
    })
    .catch(error => {
      console.error('Error enrolling in learning path:', error);
      alert('Failed to enroll in learning path');
    });
  };

  const handleMarkComplete = (articleId) => {
    if (!user?.email) {
      alert('Please log in to track your progress');
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/user/progress/${user.email}/complete/${articleId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(() => {
      // Refresh progress data
      fetch(`${import.meta.env.VITE_API_URL}/user/progress/${user.email}/path/${pathId}`)
        .then(res => res.json())
        .then(data => {
          setPathProgress(data.progress);
          alert('Article marked as completed!');
        });
    })
    .catch(error => {
      console.error('Error marking article as complete:', error);
      alert('Failed to mark article as complete');
    });
  };

  const getNextArticle = () => {
    if (!pathProgress || !articles.length) return null;
    
    for (const article of articles) {
      if (!pathProgress.completedArticleIds.includes(article._id)) {
        return article;
      }
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!learningPath) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Learning Path Not Found</h2>
          <p className="text-gray-600 mb-6">The learning path you're looking for doesn't exist or has been removed.</p>
          <Link to="/learning-paths" className="btn btn-primary">
            Browse All Learning Paths
          </Link>
        </div>
      </div>
    );
  }

  const nextArticle = getNextArticle();
  const progressPercentage = pathProgress?.progressPercentage || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-base-100 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{learningPath.title}</h1>
            <p className="text-gray-600 mt-2">{learningPath.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="badge badge-outline">{learningPath.category}</span>
              <span className="badge badge-outline">{learningPath.difficulty}</span>
              <span className="badge badge-outline">{learningPath.estimatedHours} hours</span>
              <span className="badge badge-outline">{articles.length} articles</span>
            </div>
          </div>
          
          {!user ? (
            <Link to="/login" className="btn btn-primary">
              Log in to Enroll
            </Link>
          ) : !pathProgress ? (
            <button onClick={handleEnroll} className="btn btn-primary">
              Enroll in Path
            </button>
          ) : (
            <div className="text-right">
              <div className="text-lg font-bold">{progressPercentage}% Complete</div>
              <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress Section */}
      {pathProgress && (
        <div className="bg-base-100 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">
              {pathProgress.completedArticles} of {pathProgress.totalArticles} articles completed
            </span>
            <span className="font-bold text-lg">{progressPercentage}%</span>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-500 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          {nextArticle && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Next Article to Read</h3>
              <div className="flex justify-between items-center">
                <span className="font-medium">{nextArticle.title}</span>
                <Link to={`/articleDetails/${nextArticle._id}`} className="btn btn-sm btn-primary">
                  Read Now
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Articles List */}
      <div className="bg-base-100 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Learning Path Content</h2>
        {articles.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No articles available in this learning path.</p>
        ) : (
          <div className="space-y-4">
            {articles.map((article, index) => {
              const isCompleted = pathProgress?.completedArticleIds.includes(article._id);
              return (
                <div 
                  key={article._id} 
                  className={`border rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                    isCompleted ? 'bg-green-50 border-green-200' : 'bg-white'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200'
                    }`}>
                      {isCompleted ? '✓' : index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold">{article.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {article.summary || 'No summary available'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link 
                      to={`/articleDetails/${article._id}`} 
                      className="btn btn-sm btn-outline"
                    >
                      {isCompleted ? 'Review' : 'Read'}
                    </Link>
                    {pathProgress && !isCompleted && (
                      <button 
                        onClick={() => handleMarkComplete(article._id)}
                        className="btn btn-sm btn-primary"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPathDetails;