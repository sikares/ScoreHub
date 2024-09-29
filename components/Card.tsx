"use client";
import data from "@/data/data";
import Entry from "./Entry";

interface Student {
  id: number;
  image: string;
  student_number: number;
  name: string;
  ratings: number;
}

function createEntry(student: Student) {
  return (
    <Entry 
      key={student.id}
      image={student.image}
      student_number={student.student_number}
      name={student.name}
      ratings={student.ratings}
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
    <div className="flex flex-wrap justify-center my-10">
      {filteredData.map(createEntry)}
    </div>
  );
}
