'use client';
import { useParams } from 'next/navigation';
import StudentNav from '@/app/components/StudentNav';
import Rank from '../components/Rank';

export default function Page() {
  const { student_number } = useParams();

  const studentNumber = Array.isArray(student_number) ? student_number[0] : student_number;

  return (
    <div>
      <StudentNav />
      <Rank studentNumber={studentNumber} />
    </div>
  );
}
