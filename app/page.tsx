// import Image from "next/image";

// export default function Home() {
//   const siteName: string = "CSMJU Website";
//   const courseCount: number = 3;
//   const isOpen: boolean = true;
//   const topics: string[] = [
//     "HTML",
//     "CSS",
//     "TypeScript",
//     "Next.js",
//   ];
//   type Course = {
//     id: number;
//     code: string;
//     title: string;
//     credits: number;
//     isOpen: boolean;
//   };
//   const courses: Course[] = [
//     {
//       id: 1,
//       code: "10301231",
//       title: "Web Technology",
//       credits: 3,
//       isOpen: true,
//     },
//     {
//       id: 2,
//       code: "10301232",
//       title: "Database Systems",
//       credits: 3,
//       isOpen: false,
//     },
//   ];

//   return (
//     <main>
//       <h1>{siteName}</h1>
//       <p>จำนวนรายวิชา: {courseCount}</p>
//       <p>สถานะระบบ: {isOpen ? "เปิด" : "ปิด"}</p>
//       <ul>
//         {topics.map((topic) => (
//           <li key={topic}>{topic}</li>
//         ))}
//       </ul>
//       {courses.map((course, index) => (
//         <article key={course.id}>
//           <h2>{index+1}.{course.title}</h2>
//           <p>รหัสวิชา: {course.code}</p>
//           <p>{course.credits} หน่วยกิต</p>
//           <p>{course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}</p>
//         </article>
//       ))}

//     </main>
//   );
// }
import { gamesData } from "@/data/GameData";
import GamesExplorer from "@/components/GamesExplorer";

export default function Home() {
  return (
    <main className="p-6">
      <GamesExplorer initialGames={gamesData} />
    </main>
  );
}