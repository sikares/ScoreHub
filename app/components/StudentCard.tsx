'use client';
import Image from "next/image";
import data from "../data/data";

interface StudentCardProps {
  studentNumber: string;
}

const MAX_RATING: number = 5;

export default function StudentCard({ studentNumber }: StudentCardProps) {
  const student = data.find(student => student.student_number.toString() === studentNumber);
  
  const derivedRating = student ? student.score / 20 : 0;
  const fullStars = Math.floor(derivedRating);
  const fractionalPart = derivedRating - fullStars;
  const hasFractionalStar = fractionalPart > 0;

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {student ? (
        <div key={student.id} className="rounded-xl border shadow-lg flex flex-col sm:flex-row items-center h-5/6 w-11/12 lg:w-1112">
          <div className="relative w-full h-full sm:w-8/12 md:w-9/12 lg:h-full lg:w-7/12 xl:w-7/12">
            <Image 
              src={student.image}
              alt={`Profile picture of ${student.name}`}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg sm:rounded-l-lg"
            />
          </div>
          <div className="flex flex-col justify-center items-center p-5 sm:p-8 lg:p-10 w-full sm:w-2/3 lg:w-1/2">
            <p className="text-gray-700 p-2 text-md sm:text-md md:text-xl lg:text-xl xl:text-2xl font-semibold">{student.student_number}</p>
            <p className="text-gray-700 p-2 text-md sm:text-md md:text-xl lg:text-xl xl:text-2xl font-semibold">{student.name}</p>
            <p className="text-gray-600 p-2 text-md sm:text-md md:text-xl lg:text-xl xl:text-2xl font-semibold">{student.th_name}</p>
            <p className="text-gray-600 p-2 text-md sm:text-md md:text-xl lg:text-xl xl:text-2xl font-semibold">Phone: {student.phone}</p>
            <p className="text-gray-600 p-2 text-md sm:text-md md:text-xl lg:text-xl xl:text-2xl font-semibold">Email: {student.email}</p>
            
            <div className="flex items-center justify-center text-gray-700 text-md font-semibold py-1">
              {[...Array(fullStars)].map((_, index) => (
                <svg
                  key={`full-${index}`}
                  className="h-5 w-5 text-yellow-400" 
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
                  className="h-5 w-5 text-yellow-400" 
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
                  className="h-5 w-5 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                </svg>
              ))}

              <span className="ml-2 text-gray-600 p-2 text-md sm:text-md md:text-xl lg:text-xl xl:text-2xl font-semibold">{derivedRating.toFixed(1)}/{MAX_RATING}</span>
            </div>

            <p className="text-gray-600 p-2 text-md sm:text-md md:text-xl lg:text-xl xl:text-2xl font-semibold">Score: {student.score}/100</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-3xl">Student not found.</p>
      )}
    </div>
  );
}
