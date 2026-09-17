import { notFound } from "next/navigation";
import { gamesData } from "@/data/GameData";
import type { Metadata } from "next";
import Game from "../page";

// 1. เพิ่มการกำหนด Type สำหรับ CoursePageProps
type CoursePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const game = gamesData.find((item) => String(item.id) === id);

  // สั่งให้แสดงหน้า 404 เมื่อไม่พบวิชา
  if (!game) {
    notFound();
  }

  return (
    <article>
      <h1>{game.title}</h1>
      <p>รหัสเกม {game.id}</p>
      <p>จำนวนชั่วโมง {game.hours}</p>
      <p>แพลตฟอร์ม {game.platform}</p>
    </article>
  );
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const game = gamesData.find((item) => String(item.id) === id);

  if (!game) {
    return {
      title: "Game Not Found",
    };
  }

  return {
    title: game.title,
  };
}