"use client";
import data from "../data/data";
import Entry from "./Entry";

interface Student {
  id: number;
  image: string;
  student_number: number;
  name: string;
  score: number;
}

function createEntry(student: Student) {
  return (
    <Entry 
      key={student.id}
      image={student.image}
      student_number={student.student_number}
      name={student.name}
      score={student.score}
    />
  );
}

interface CardProps {
  searchQuery: string;
}

export default function Card({ searchQuery }: CardProps) {
  const filteredData = data.filter((student) =>
    student.student_number.toString().includes(searchQuery) || 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-wrap justify-center pt-20 md:pt-24">
      <h3 className="w-full font-bold text-2xl text-center mb-4 text-gray-800 sm:text-3xl">Student</h3>
      {filteredData.map(createEntry)}
    </div>
  );
}