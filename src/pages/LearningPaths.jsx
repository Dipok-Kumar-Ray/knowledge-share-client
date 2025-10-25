import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router';

const LearningPaths = () => {
  const { user } = useContext(AuthContext);
  const [learningPaths, setLearningPaths] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all learning paths
    fetch(`${import.meta.env.VITE_API_URL}/learning-paths`)
      .then(res => res.json())
      .then(data => {
        setLearningPaths(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching learning paths:', error);
        setLoading(false);
      });

    // Fetch user progress if logged in
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/user/progress/${user.email}`)
        .then(res => res.json())
        .then(data => {
          // Create a map of pathId to progress for easy lookup
          const progressMap = {};
          data.enrolledPaths?.forEach(pathId => {
            progressMap[pathId] = { enrolled: true };
          });
          setUserProgress(progressMap);
        })
        .catch(error => {
          console.error('Error fetching user progress:', error);
        });
    }
  }, [user]);

  const handleEnroll = (pathId) => {
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
      // Update local state
      setUserProgress(prev => ({
        ...prev,
        [pathId]: { enrolled: true }
      }));
      alert('Successfully enrolled in learning path!');
    })
    .catch(error => {
      console.error('Error enrolling in learning path:', error);
      alert('Failed to enroll in learning path');
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Adaptive Learning Paths</h1>
      <p className="text-center mb-8 text-gray-600">
        Discover curated learning paths designed to guide you through articles and tutorials based on your skill level and interests.
      </p>

      {learningPaths.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No learning paths available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningPaths.map(path => (
            <div key={path._id} className="bg-base-100 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="badge badge-outline mb-2">
                      {path.difficulty}
                    </span>
                    <h2 className="text-xl font-bold">{path.title}</h2>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{path.description}</p>
                <div className="flex justify-between text-sm text-gray-500 mb-6">
                  <span>{path.articleSequence?.length || 0} articles</span>
                  <span>{path.estimatedHours || 0} hours</span>
                </div>
                <div className="flex gap-2">
                  {userProgress[path._id]?.enrolled ? (
                    <Link to={`/learning-path/${path._id}`} className="btn btn-primary flex-1">
                      Continue Learning
                    </Link>
                  ) : (
                    <button 
                      onClick={() => handleEnroll(path._id)} 
                      className="btn btn-primary flex-1"
                    >
                      Enroll Now
                    </button>
                  )}
                  <Link to={`/learning-path/${path._id}`} className="btn btn-outline flex-1">
                    Preview
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningPaths;