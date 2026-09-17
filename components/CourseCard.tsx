import { Course } from "@/app/types/course";
import Link from "next/link";

type CourseCardProps = {
  course: Course;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function CourseCard({
  course,
  isFavorite,
  onToggleFavorite,
  onEdit,
  onDelete,
}: CourseCardProps) {
  return (
    <article className="modern-card self-start flex-1 min-w-70">
      <div className="modern-card-top-bar" />

      <div className="flex justify-between items-start mb-3 pt-1">
        <h2>
          <Link
            href={`/courses/${course.id}`}
            className="text-xl font-extrabold text-slate-800 hover:text-indigo-600 transition-colors"
          >
            {course.name}
          </Link>
        </h2>

        <button
          type="button"
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(course.id)}
          className={`btn-fav-modern ${isFavorite ? "active" : ""}`}
        >
          {isFavorite ? "❤️ รายการโปรด" : "🤍 เพิ่มในรายการโปรด"}
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="badge-item badge-slate">📘 รหัสวิชา: {course.code}</span>
        <span className="badge-item badge-blue">🎓 {course.credit} หน่วยกิต</span>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => onEdit(course.id)}
          className="btn-edit-modern"
        >
          ✏️ แก้ไข
        </button>
        <button
          type="button"
          onClick={() => onDelete(course.id)}
          className="btn-delete-modern"
        >
          🗑️ ลบ
        </button>
      </div>
    </article>
  );
}