'use client';
import Image from "next/image";
import data from "../data/data";

interface StudentCardProps {
  studentNumber: string;
}

export default function StudentCard({ studentNumber }: StudentCardProps) {
  const student = data.find(student => student.student_number.toString() === studentNumber);

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
            <p className="text-gray-600 p-2 text-md sm:text-md md:text-xl lg:text-xl xl:text-2xl font-semibold">Ratings: {student.ratings}</p>
            <p className="text-gray-600 p-2 text-md sm:text-md md:text-xl lg:text-xl xl:text-2xl font-semibold">Score: {student.score}/100</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-3xl">Student not found.</p>
      )}
    </div>
  );
}
