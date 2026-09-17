"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "@/app/types/course";
import CourseCard from "@/components/CourseCard";
import CourseForm from "@/components/CourseForm";

export type CourseDraft = {
    code: string;
    name: string;
    credit: string;
    instructor: string;
};

type CourseExplorerProps = {
    initialCourses: Course[];
};

export default function CourseExplorer({ initialCourses }: CourseExplorerProps) {
    const [keyword, setKeyword] = useState("");
    // 1. ใส่ initialCourses ให้เป็นค่าเริ่มต้น เพื่อไม่ให้เป็น undefined
    const [courses, setCourses] = useState<Course[]>(initialCourses || []);
    const [editingId, setEditingId] = useState<string | null>(null);

    // 2. ปรับ Type ของ favoriteIds ให้เป็น string[] ตามชนิด id ของ Course
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

    function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
        setKeyword(event.target.value);
    }

    function handleCreate(draft: CourseDraft) {
        const newCourse: Course = {
            id: crypto.randomUUID(),
            code: draft.code.trim(),
            name: draft.name.trim(),
            credit: Number(draft.credit),
            instructor: draft.instructor.trim(),
        };

        setCourses((prev) => [...prev, newCourse]);
    }

    function handleDelete(id: string) {
        setCourses((prev) => prev.filter((course) => course.id !== id));
    }

    function handleUpdate(id: string, draft: CourseDraft) {
        setCourses((prev) =>
            prev.map((course) =>
                course.id === id
                    ? {
                        ...course,
                        code: draft.code.trim(),
                        name: draft.name.trim(),
                        credit: Number(draft.credit),
                        instructor: draft.instructor.trim(),
                    }
                    : course
            )
        );

        setEditingId(null);
    }

    function handleSave(draft: CourseDraft) {
        if (editingId === null) {
            handleCreate(draft);
            return;
        }

        handleUpdate(editingId, draft);
    }

    function handleToggleFavorite(id: string) {
        setFavoriteIds((prevIds) =>
            prevIds.includes(id)
                ? prevIds.filter((favoriteId) => favoriteId !== id)
                : [...prevIds, id]
        );
    }

    const editingCourse = courses.find((course) => course.id === editingId);

    const searchText = keyword.trim().toLowerCase();
    const visibleCourses = courses.filter(
        (course) =>
            course.name.toLowerCase().includes(searchText) ||
            course.code.toLowerCase().includes(searchText)
    );

    return (
        <div>
            <input
                type="search"
                aria-label="ค้นหารายวิชา"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา"
            />

            {visibleCourses.length === 0 ? (
                <p>ไม่พบรายวิชาที่ตรงกับเงื่อนไข</p>
            ) : (
                <section>
                    {visibleCourses.map((course) => (
                        // 3. ส่ง isFavorite และ onToggleFavorite ครบถ้วน
                        <CourseCard
                            key={course.id}
                            course={course}
                            isFavorite={favoriteIds.includes(course.id)}
                            onToggleFavorite={handleToggleFavorite}
                            onEdit={setEditingId}
                            onDelete={handleDelete}
                        />
                    ))}
                </section>
            )}

            <CourseForm
                key={editingId ?? "new"}
                initialCourse={editingCourse}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
            />
        </div>
    );
}