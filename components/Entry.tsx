import Image from "next/image";

interface EntryProps {
  image: string;
  student_number: number;
  name: string;
  ratings: number;
}

const MAX_RATING = 5;

export default function Entry(props: EntryProps) {
  return (
    <div className="mx-10 my-5">
      <button 
        aria-label={`Student: ${props.name}, Number: ${props.student_number}`} 
        className="rounded-lg border shadow-lg flex items-center w-96 -translate-y-1 hover:scale-105 duration-300 transition-transform focus:outline-none"
      >
        <Image 
          src={props.image}
          alt="Image" 
          width={140}
          height={140}
          className="rounded-l-lg"
        />
        
        <div className="w-full p-4 flex flex-col">
          <p className="text-lg font-semibold">{props.student_number}</p>
          <p className="text-gray-700">{props.name}</p>
          
          <div className="flex items-center justify-center">
            {[...Array(MAX_RATING)].map((_, index) => (
              <svg
                key={index}
                className={`h-5 w-5 ${index < props.ratings ? 'text-yellow-400' : 'text-gray-300'}`} 
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
              </svg>
            ))}
            <span className="ml-2 text-gray-700 font-semibold">{props.ratings}/{MAX_RATING}</span> {/* Use ratings here */}
          </div>
        </div>
      </button>
    </div>
  );
}
