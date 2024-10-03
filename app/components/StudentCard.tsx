'use client';
import Image from "next/image";
import { useState } from "react";
import data from "../data/data";
import Link from "next/link";

interface StudentCardProps {
  studentNumber: string;
}

const MAX_RATING: number = 5;

export default function StudentCard({ studentNumber }: StudentCardProps) {
  const student = data.find(student => student.student_number.toString() === studentNumber);

  const [score, setScore] = useState(student ? student.score : "");
  const [derivedRating, setDerivedRating] = useState(student ? student.score / 20 : 0);

  const fullStars = Math.floor(derivedRating);
  const fractionalPart = derivedRating - fullStars;
  const hasFractionalStar = fractionalPart > 0;

  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setScore("");
    } else if (!isNaN(Number(value))) {
      setScore(Math.max(0, Math.min(Number(value), 100))); // Limit the score between 0 and 100
    }
  };

  const handleIncreaseScore = (increment: number) => {
    setScore(prevScore => {
      const newScore = Math.min(Math.max((prevScore === "" ? 0 : Number(prevScore)) + increment, 0), 100);
      setDerivedRating(newScore / 20); // Update derived rating
      return newScore;
    });
  };

  const handleSubmit = () => {
    if (score !== "") {
      setDerivedRating(Number(score) / 20);
    }
    // alert(`Score submitted: ${score}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen pt-20 relative">
      {student ? (
        <div key={student.id} className="rounded-xl border shadow-lg flex flex-col sm:flex-col sm:w-9/12 md:flex-row md:w-11/12 items-center h-5/6 w-10/12 lg:w-10/12 relative">
          <Link href="/" aria-label="Close" className="absolute top-4 right-4 z-10">
            <button className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 focus:outline-none">
              <svg className="h-6 w-6 sm:h-7 sm:w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </Link>

          <div className="relative w-full h-full sm:w-full md:w-9/12 lg:h-full lg:w-7/12 xl:w-6/12">
            <Image 
              src={student.image}
              alt={`Profile picture of ${student.name}`}
              layout="fill"
              objectFit="cover"
              className="rounded-t-xl md:rounded-b-xl"
            />
          </div>
          <div className="flex flex-col justify-start items-start p-4 sm:p-4 lg:p-10 w-full sm:w-10/12 lg:w-1/2 md:px-6">
            <p className="text-gray-700 p-2 text-lg sm:text-xl md:text-2xl md:py-2 lg:text-3xl lg:py-3 xl:text-4xl xl:py-4 font-semibold">{student.name}</p>
            <p className="text-gray-600 p-2 text-md sm:text-lg md:text-xl md:py-2 lg:text-2xl lg:py-3 xl:text-3xl xl:py-4 font-semibold">{student.th_name}</p>
            <p className="text-gray-700 p-2 text-md sm:text-md md:text-lg md:py-2 lg:text-xl lg:py-3 xl:text-2xl xl:py-4 font-semibold">{student.student_number}</p>
            
            <div className="flex items-center justify-center text-gray-700 text-md font-semibold px-2 xl:py-1">
              {[...Array(fullStars)].map((_, index) => (
                <svg
                  key={`full-${index}`}
                  className="h-5 w-5 text-yellow-400 lg:h-6 lg:w-6 xl:h-8 xl:w-8" 
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
                  className="h-5 w-5 text-yellow-400 lg:h-6 lg:w-6 xl:h-8 xl:w-8" 
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
                  className="h-5 w-5 text-gray-300 lg:h-6 lg:w-6 xl:h-8 xl:w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                </svg>
              ))}

              <span className="text-gray-600 p-2 text-md sm:text-md md:text-lg md:px-1 lg:text-xl xl:text-3xl font-semibold">{derivedRating.toFixed(1)}/{MAX_RATING}</span>
            </div>
            <p className="text-gray-600 p-2 text-md sm:text-md md:text-lg md:py-2 lg:text-xl lg:py-3 xl:text-2xl xl:py-4 font-semibold">Tel: {student.phone}</p>
            <p className="text-gray-600 p-2 text-md sm:text-md md:text-lg md:py-2 lg:text-xl lg:py-3 xl:text-2xl xl:py-4 font-semibold">E-mail: {student.email}</p>

            <div className="flex flex-col py-10 w-full items-center">
              <div className="flex items-center space-x-3 justify-center w-full">
                <button
                  onClick={() => handleIncreaseScore(-5)}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-2 w-10"
                >
                  -5
                </button>
                <button
                  onClick={() => handleIncreaseScore(-1)}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-2 w-10"
                >
                  -1
                </button>
                <input
                  type="number"
                  value={score}
                  onChange={handleScoreChange}
                  onKeyDown={handleKeyDown}
                  className="border rounded-lg p-2 text-lg outline-none w-28 text-center"
                  placeholder="0/100"
                />
                <button
                  onClick={() => handleIncreaseScore(1)}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 w-10"
                >
                  +1
                </button>
                <button
                  onClick={() => handleIncreaseScore(5)}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 w-10"
                >
                  +5
                </button>
              </div>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2 mt-4 w-80"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-gray-600 text-lg">Student not found.</div>
      )}
    </div>
  );
}
