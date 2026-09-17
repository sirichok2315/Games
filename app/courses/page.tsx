import { courses } from "@/data/courses";
import CourseExplorer from "@/components/CourseExplorer";

export default function Courses() {
  return (
    <>
      <CourseExplorer initialCourses={courses} />
    </>
  );
}