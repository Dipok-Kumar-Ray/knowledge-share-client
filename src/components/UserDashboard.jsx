import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAppTheme } from '../hooks/useAppTheme';
import { Link } from 'react-router';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const { getColor } = useAppTheme();
  const [userData, setUserData] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      // Fetch user gamification data
      fetch(`${import.meta.env.VITE_API_URL}/user/profile/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setUserData(data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });

      // Fetch user statistics
      fetch(`${import.meta.env.VITE_API_URL}/user/stats/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setUserStats(data);
        })
        .catch(error => {
          console.error('Error fetching user stats:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate progress percentage for level
  const calculateLevelProgress = (points) => {
    const level = Math.floor(points / 100) + 1;
    const pointsInCurrentLevel = points % 100;
    const progressPercentage = (pointsInCurrentLevel / 100) * 100;
    return { level, pointsInCurrentLevel, progressPercentage };
  };

  const levelData = userData?.points ? calculateLevelProgress(userData.points) : { level: 1, pointsInCurrentLevel: 0, progressPercentage: 0 };

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content">Dashboard</h1>
          <p className="text-base-content/70">Welcome back, {user?.displayName || 'User'}</p>
        </div>

        {/* User Profile Card */}
        <div className="bg-base-100 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="avatar mb-4 md:mb-0 md:mr-6">
              <div className="w-24 rounded-full ring-4 ring-primary/20">
                <img 
                  src={user?.photoURL || "https://placehold.co/200x200"} 
                  alt="Profile" 
                  className="object-cover"
                />
              </div>
            </div>
            <div className="text-center md:text-left flex-grow">
              <h2 className="text-2xl font-bold text-base-content">{user?.displayName || 'User'}</h2>
              <p className="text-base-content/70 mb-4">{user?.email}</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-primary/10 rounded-lg px-4 py-2">
                  <p className="text-sm text-base-content/70">Level</p>
                  <p className="text-xl font-bold text-primary">{levelData.level}</p>
                </div>
                <div className="bg-secondary/10 rounded-lg px-4 py-2">
                  <p className="text-sm text-base-content/70">Points</p>
                  <p className="text-xl font-bold text-secondary">{userData?.points || 0}</p>
                </div>
                <div className="bg-accent/10 rounded-lg px-4 py-2">
                  <p className="text-sm text-base-content/70">Rank</p>
                  <p className="text-xl font-bold text-accent">#24</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0 w-full md:w-1/3">
              <div className="bg-base-200 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-base-content/80">Level {levelData.level} Progress</span>
                  <span className="text-sm font-medium text-base-content/80">{levelData.pointsInCurrentLevel}/100</span>
                </div>
                <div className="w-full bg-base-300 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${levelData.progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-base-content/60 mt-2">
                  {100 - levelData.pointsInCurrentLevel} points to reach Level {levelData.level + 1}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-base-100 rounded-xl shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-primary/10 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-base-content/70">Articles Published</p>
                <p className="text-2xl font-bold text-base-content">{userStats?.articles || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-base-100 rounded-xl shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-error/10 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-base-content/70">Likes Received</p>
                <p className="text-2xl font-bold text-base-content">{userStats?.likesReceived || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-base-100 rounded-xl shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-success/10 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-base-content/70">Comments Made</p>
                <p className="text-2xl font-bold text-base-content">{userStats?.comments || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-base-100 rounded-xl shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-warning/10 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-base-content/70">Completion</p>
                <p className="text-2xl font-bold text-base-content">85%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Badges and Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Badges Section */}
          <div className="bg-base-100 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-base-content">Your Badges</h2>
              <span className="text-sm text-base-content/60">{userData?.badges?.length || 0} earned</span>
            </div>
            
            {userData?.badges && userData.badges.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {userData.badges.map((badge, index) => (
                  <div key={index} className="flex flex-col items-center p-4 bg-base-200 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-center text-base-content">{badge}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-base-300 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-base-content/70 mb-4">You haven't earned any badges yet</p>
                <Link to="/allArticle" className="btn btn-primary btn-sm">
                  Start Earning
                </Link>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-base-100 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-base-content mb-6">Recent Activity</h2>
            
            {userData?.activities && userData.activities.length > 0 ? (
              <div className="space-y-4">
                {userData.activities.slice(0, 5).map((activity, index) => (
                  <div key={index} className="flex items-start p-3 bg-base-200 rounded-lg">
                    <div className="mr-3 mt-1">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-base-content">
                        {activity.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </p>
                      <p className="text-sm text-base-content/70">
                        {new Date(activity.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="badge badge-success">
                      +{activity.points} pts
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-base-300 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-base-content/70">No recent activity</p>
                <p className="text-sm text-base-content/60 mt-2">Start contributing to see your activity history</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-base-100 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-base-content mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/postArticles" className="btn btn-primary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Post Article
            </Link>
            <Link to="/myArticles" className="btn btn-outline flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              My Articles
            </Link>
            <Link to="/leaderboard" className="btn btn-outline flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Leaderboard
            </Link>
            <Link to="/allArticle" className="btn btn-outline flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;