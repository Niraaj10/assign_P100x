


import BirthdayCalendar from "@/components/BirthdayCalendar";
import { Person } from "@/types/birthday";

const sampleData: Person[] = [
  { name: "Tyrion Lannister", birthday: "1978-12-02" },
  { name: "Cersei Lannister", birthday: "1975-11-30" },
  { name: "Daenerys Targaryen", birthday: "1991-11-24" },
  { name: "Arya Stark", birthday: "1996-11-25" },
  { name: "Jon Snow", birthday: "1989-12-03" },
  { name: "Sansa Stark", birthday: "1992-08-15" },
  { name: "Jorah Mormont", birthday: "1968-12-16" },
  { name: "Jaime Lannister", birthday: "1975-12-06" },
];

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Birthday Calendar</h1>
      <BirthdayCalendar initialPeople={sampleData} />
    </main>
  );
}
