'use client'
import { useState, useEffect } from 'react'
import data from '../data/data'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface Student {
  id: number
  student_number: string
  name: string
  score: number
}

interface RankProps {
  studentNumber?: string
}

const MAX_RATING: number = 5

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function Rank({ studentNumber }: RankProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [sortCriteria, setSortCriteria] = useState<
    'score' | 'ratings' | 'student_number'
  >('student_number')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const filteredData = data.filter(
    (student) =>
      student.student_number.toString().includes(debouncedSearchTerm) ||
      student.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      student.score.toString().includes(debouncedSearchTerm)
  )

  const sortedData = [...filteredData].sort((a, b) => {
    let valueA, valueB

    if (sortCriteria === 'score') {
      valueA = a.score
      valueB = b.score
    } else if (sortCriteria === 'ratings') {
      valueA = a.score / 20
      valueB = b.score / 20
    } else {
      valueA = a.student_number
      valueB = b.student_number
    }

    return sortOrder === 'asc'
      ? valueA > valueB
        ? 1
        : -1
      : valueA < valueB
      ? 1
      : -1
  })

  const handleSortChange = (
    criteria: 'score' | 'ratings' | 'student_number',
    order: 'asc' | 'desc'
  ) => {
    setSortCriteria(criteria)
    setSortOrder(order)
    setIsDropdownOpen(false) // Close dropdown after selection
  }

  const exportToCSV = () => {
    const headers = ['Number', 'Name', 'Ratings', 'Score']
    const rows = sortedData.map((student) => {
      const derivedRating = (student.score / 20).toFixed(1)
      return [
        student.student_number,
        student.name,
        derivedRating,
        student.score,
      ]
    })

    let csvContent =
      'data:text/csv;charset=utf-8,' +
      headers.join(',') +
      '\n' +
      rows.map((e) => e.join(',')).join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    const currentDate = new Date().toISOString().split('T')[0]
    link.setAttribute('download', `student_rankings_${currentDate}.csv`)
    document.body.appendChild(link)

    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex flex-col items-center pt-16 sm:pt-18 md:pt-20">
      <h3 className="w-full font-bold text-2xl sm:text-3xl py-5 text-center text-gray-800">
        Ranking
      </h3>
      <div className="container space-y-4 pb-6 px-2 sm:px-0">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 mx-5">
          <input
            type="search"
            className="rounded-md border border-input px-3 py-2 w-full sm:w-96 mb-3 sm:mb-0 outline-none"
            placeholder="Search by name, number, or score..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="inline-flex justify-between w-56 px-3 py-2 text-sm font-semibold text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none sm:w-60 sm:ml-4"
              >
                Sort by{' '}
                {sortCriteria === 'student_number'
                  ? 'Number'
                  : sortCriteria === 'score'
                  ? 'Score'
                  : 'Ratings'}{' '}
                ({sortOrder === 'asc' ? 'Asc' : 'Des'})
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <button
                      onClick={() => handleSortChange('score', 'asc')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Sort by Score (Asc)
                    </button>
                    <button
                      onClick={() => handleSortChange('score', 'desc')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Sort by Score (Desc)
                    </button>
                    <button
                      onClick={() => handleSortChange('student_number', 'asc')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Sort by Number (Asc)
                    </button>
                    <button
                      onClick={() => handleSortChange('student_number', 'desc')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Sort by Number (Desc)
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={exportToCSV}
              className="text-white bg-green-500 rounded-md px-3 py-2 text-md font-medium hover:bg-green-600 w-96 sm:w-28"
            >
              Export CSV
            </button>
          </div>
        </div>
        <div className="rounded-lg border bg-background shadow-lg mx-5">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full table-auto text-sm sm:text-md">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                    Number
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                    Ratings
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {sortedData.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center">
                      No data available
                    </td>
                  </tr>
                ) : (
                  sortedData.map((student) => {
                    const derivedRating = (student.score / 20).toFixed(1)
                    const fullStars = Math.floor(Number(derivedRating))
                    const fractionalPart = Number(derivedRating) - fullStars
                    const hasFractionalStar = fractionalPart > 0

                    return (
                      <tr
                        key={student.id}
                        className="border-b transition-colors hover:bg-muted/50"
                      >
                        <td className="p-4">{student.student_number}</td>
                        <td className="p-4">{student.name}</td>
                        <td className="p-4">
                          <div className="flex items-center">
                            {[...Array(MAX_RATING)].map((_, index) => {
                              if (index < fullStars) {
                                return (
                                  <svg
                                    key={`full-${index}`}
                                    className="h-4 w-4 text-yellow-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M10 15l-6.16 3.24 1.18-6.87L0 6.74l7.03-1.02L10 0l2.97 5.72L20 6.74l-4.02 4.63 1.18 6.87z" />
                                  </svg>
                                )
                              } else if (
                                hasFractionalStar &&
                                index === fullStars
                              ) {
                                return (
                                  <svg
                                    key={`fractional-${index}`}
                                    className="h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                  >
                                    <defs>
                                      <linearGradient
                                        id={`grad-${student.id}`}
                                        x1="0%"
                                        y1="0%"
                                      >
                                        <stop
                                          offset={`${fractionalPart * 100}%`}
                                          style={{
                                            stopColor: '#FBBF24',
                                            stopOpacity: 1,
                                          }}
                                        />
                                        <stop
                                          offset={`${fractionalPart * 100}%`}
                                          style={{
                                            stopColor: '#E5E7EB',
                                            stopOpacity: 1,
                                          }}
                                        />
                                      </linearGradient>
                                    </defs>
                                    <path
                                      d="M10 15l-6.16 3.24 1.18-6.87L0 6.74l7.03-1.02L10 0l2.97 5.72L20 6.74l-4.02 4.63 1.18 6.87z"
                                      fill={`url(#grad-${student.id})`}
                                    />
                                  </svg>
                                )
                              } else {
                                return (
                                  <svg
                                    key={`empty-${index}`}
                                    className="h-4 w-4 text-gray-300"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M10 15l-6.16 3.24 1.18-6.87L0 6.74l7.03-1.02L10 0l2.97 5.72L20 6.74l-4.02 4.63 1.18 6.87z" />
                                  </svg>
                                )
                              }
                            })}
                            <span className="ml-2 text-sm text-gray-600">
                              {derivedRating}/5
                            </span>
                          </div>
                        </td>
                        <td className="p-4">{student.score}</td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}