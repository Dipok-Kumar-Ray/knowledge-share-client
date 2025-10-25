import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAppTheme } from '../hooks/useAppTheme';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';

const Leaderboard = () => {
  const { theme } = useTheme();
  const { getColor } = useAppTheme();

  // Fetch leaderboard data with TanStack Query
  const { data: leaderboard = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/leaderboard`);
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <p className="text-error">Error loading leaderboard. Please try again later.</p>
          <button className="btn btn-primary mt-4" onClick={refetch}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">Leaderboard</h1>
          <p className="text-base-content/70">Top contributors in the EduHive community</p>
        </div>

        <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-base-200">
                  <th className="text-left py-4 px-6 font-semibold text-base-content/80">Rank</th>
                  <th className="text-left py-4 px-6 font-semibold text-base-content/80">User</th>
                  <th className="text-left py-4 px-6 font-semibold text-base-content/80">Points</th>
                  <th className="text-left py-4 px-6 font-semibold text-base-content/80">Level</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user, index) => (
                  <tr 
                    key={user._id} 
                    className="border-b border-base-300 hover:bg-base-200 transition-colors"
                  >
                    <td className="py-4 px-6">
                      {index === 0 && <span className="badge badge-gold text-lg">🥇 #1</span>}
                      {index === 1 && <span className="badge badge-silver text-lg">🥈 #2</span>}
                      {index === 2 && <span className="badge badge-bronze text-lg">🥉 #3</span>}
                      {index > 2 && <span className="badge badge-ghost badge-lg">#{index + 1}</span>}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-10 h-10">
                            <img 
                              src={user.photoURL || "https://placehold.co/100x100"} 
                              alt="Avatar" 
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-base-content">
                            {user.displayName || user.email.split('@')[0]}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-lg text-secondary">
                        {user.points || 0}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="badge badge-primary badge-outline">
                        Level {user.level || 1}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {leaderboard.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-base-300 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-base-content mb-2">No users on the leaderboard yet</h3>
              <p className="text-base-content/70 mb-6">Start contributing to see your name here!</p>
              <Link to="/allArticle" className="btn btn-primary">
                Browse Articles
              </Link>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link to="/dashboard" className="btn btn-outline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;