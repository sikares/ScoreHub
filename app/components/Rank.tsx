import { useState } from 'react';
import data from '../data/data';

interface RankProps {
  studentNumber?: string;
}

const MAX_RATING: number = 5;

export default function Rank({ studentNumber }: RankProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortCriteria, setSortCriteria] = useState<'score' | 'ratings'>('score');

  const filteredData = data.filter(student => 
    student.student_number.toString().includes(searchTerm) || 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.score.toString().includes(searchTerm)
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const valueA = sortCriteria === 'score' ? a.score : a.score / 20; 
    const valueB = sortCriteria === 'score' ? b.score : b.score / 20;

    return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [criteria, order] = e.target.value.split('-');
    setSortCriteria(criteria as 'score' | 'ratings');
    setSortOrder(order as 'asc' | 'desc');
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="font-semibold text-2xl sm:text-3xl py-5 text-center">Ranking</h3>
      <div className="container space-y-4 pb-6 px-2 sm:px-0">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 mx-5">
          <input 
            type="search" 
            className="rounded-md border border-input px-3 py-2 w-full sm:w-96 mb-3 sm:mb-0" 
            placeholder="Search by name, number, or score..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <select 
            className="rounded-md border border-input h-9 px-3 w-full sm:w-auto" 
            onChange={handleSortChange} 
            value={`${sortCriteria}-${sortOrder}`}
          >
            <option value="score-asc">Sort by Score: Ascending</option>
            <option value="score-desc">Sort by Score: Descending</option>
          </select>
        </div>
        <div className="rounded-lg border bg-background shadow-lg mx-5">
          <div className="w-full overflow-auto">
            <table className="min-w-full table-auto text-sm sm:text-md">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Number</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Ratings</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Score</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {sortedData.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center">No data available</td>
                  </tr>
                ) : (
                  sortedData.map((student) => {
                    const derivedRating = student.score / 20;
                    const fullStars = Math.floor(derivedRating);
                    const fractionalPart = derivedRating - fullStars;
                    const hasFractionalStar = fractionalPart > 0;

                    return (
                      <tr key={student.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4">{student.student_number}</td>
                        <td className="p-4">{student.name}</td>
                        <td className="p-4">
                          <div className="flex items-center">
                            {[...Array(fullStars)].map((_, index) => (
                              <svg
                                key={`full-${index}`}
                                className="h-4 w-4 text-yellow-400" 
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                              </svg>
                            ))}
                            {hasFractionalStar && (
                              <svg
                                key={`fractional-${student.id}`}
                                className="h-4 w-4 text-yellow-400" 
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <defs>
                                  <linearGradient id={`grad-${student.id}`} x1="0%" y1="0%">
                                    <stop offset={`${fractionalPart * 100}%`} style={{ stopColor: '#FBBF24', stopOpacity: 1 }} />
                                    <stop offset={`${fractionalPart * 100}%`} style={{ stopColor: '#E5E7EB', stopOpacity: 1 }} />
                                  </linearGradient>
                                </defs>
                                <path 
                                  d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" 
                                  fill={`url(#grad-${student.id})`} 
                                />
                              </svg>
                            )}
                            {[...Array(MAX_RATING - fullStars - (hasFractionalStar ? 1 : 0))].map((_, index) => (
                              <svg
                                key={`empty-${index}`}
                                className="h-4 w-4 text-gray-300"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                              </svg>
                            ))}
                            <span className="ml-2 text-gray-700 font-semibold">{derivedRating.toFixed(1)}/{MAX_RATING}</span>
                          </div>
                        </td>
                        <td className="p-4">{student.score}/100</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
