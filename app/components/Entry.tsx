import Image from "next/image";
import Link from "next/link";

interface EntryProps {
  image: string;
  student_number: number;
  name: string;
  score: number;
}

const MAX_RATING: number = 5;

export default function Entry(props: EntryProps) {
  const derivedRating = props.score / 20;
  const fullStars = Math.floor(derivedRating);
  const fractionalPart = derivedRating - fullStars;
  const hasFractionalStar = fractionalPart > 0;

  return (
    <div className="mx-10 my-6 xl:my-7">
      <Link 
        href={`/student/${props.student_number}`} 
        aria-label={`Student: ${props.name}, Number: ${props.student_number}`} 
        className="rounded-lg border shadow-lg flex items-center w-96 -translate-y-1 hover:scale-105 duration-300 transition-transform focus:outline-none md:w-96"
      >
        <Image 
          src={props.image}
          alt={`Profile picture of ${props.name}`}
          width={140}
          height={140}
          className="rounded-l-lg"
        />
        
        <div className="w-full p-4 flex flex-col items-center">
          <p className="text-gray-700 text-md font-semibold py-1">{props.student_number}</p>
          <p className="text-gray-700 text-md font-semibold py-1">{props.name}</p>
          
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
                key={`fractional-${props.student_number}`}
                className="h-5 w-5 text-yellow-400" 
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <defs>
                  <linearGradient id={`grad-${props.student_number}`} x1="0%" y1="0%">
                    <stop offset={`${fractionalPart * 100}%`} style={{ stopColor: '#FBBF24', stopOpacity: 1 }} />
                    <stop offset={`${fractionalPart * 100}%`} style={{ stopColor: '#E5E7EB', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <path 
                  d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" 
                  fill={`url(#grad-${props.student_number})`} 
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

            <span className="ml-2 text-gray-700 font-semibold">{derivedRating.toFixed(1)}/{MAX_RATING}</span>
          </div>
          <p className="text-gray-700 text-md font-semibold py-1">Score: {props.score}/100</p>
        </div>
      </Link>
    </div>
  );
}