import { notFound } from "next/navigation";
import { courses } from "@/data/courses";
import type { Metadata } from "next";

// 1. เพิ่มการกำหนด Type สำหรับ CoursePageProps
type CoursePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = courses.find((item) => item.id === id);

  // สั่งให้แสดงหน้า 404 เมื่อไม่พบวิชา
  if (!course) {
    notFound();
  }

  return (
    <article>
      <h1>{course.name}</h1>
      <p>รหัสวิชา {course.code}</p>
      <p>หน่วยกิต {course.credit}</p>
      <p>ผู้สอน {course.instructor}</p>
    </article>
  );
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const course = courses.find((item) => item.id === id);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: course.name,
  };
}