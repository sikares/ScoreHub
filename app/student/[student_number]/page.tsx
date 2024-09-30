'use client';
import { useParams } from 'next/navigation';
import StudentNav from '@/app/components/StudentNav';
import StudentCard from '@/app/components/StudentCard';

export default function Page() {
  const { student_number } = useParams();

  return (
    <div>
      <StudentNav />
      <StudentCard studentNumber={student_number} />
    </div>
  );
}
