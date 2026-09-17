"use client";

import { Course } from "@/app/types/course";
import { ChangeEvent, FormEvent, useState } from "react";

export type CourseDraft = {
    code: string;
    name: string;
    credit: string;
    instructor: string;
};

const emptyDraft: CourseDraft = {
    code: "",
    name: "",
    credit: "",
    instructor: "",
};

type CourseFormProps = {
    initialCourse?: Course;
    onSave: (draft: CourseDraft) => void;
    onCancel: () => void;
};

function toDraft(course?: Course): CourseDraft {
    if (!course) {
        return emptyDraft;
    }

    return {
        code: course.code,
        name: course.name,
        credit: String(course.credit),
        instructor: course.instructor,
    };
}

type FormErrors = Partial<Record<keyof CourseDraft, string>>;

export default function CourseForm({ initialCourse, onSave, onCancel }: CourseFormProps) {
    const [draft, setDraft] = useState<CourseDraft>(toDraft(initialCourse));
    const [errors, setErrors] = useState<FormErrors>({});

    function validate(value: CourseDraft): FormErrors {
        const nextErrors: FormErrors = {};

        if (value.code.trim() === "") {
            nextErrors.code = "กรุณาระบุรหัสวิชา";
        }

        if (value.name.trim() === "") {
            nextErrors.name = "กรุณาระบุชื่อวิชา";
        }

        const credit = Number(value.credit);
        if (!Number.isInteger(credit) || credit < 1 || credit > 6) {
            nextErrors.credit = "หน่วยกิตต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 6";
        }

        return nextErrors;
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setDraft((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const nextErrors = validate(draft);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        onSave(draft);
        setDraft(emptyDraft);
        setErrors({});
    }

    return (
        <div className="form-card">
            <h3 className="text-xl font-extrabold text-slate-800 mb-5 flex items-center gap-2">
                {initialCourse ? "✏️ แก้ไขวิชาเรียน" : "📚 เพิ่มวิชาเรียนใหม่"}
            </h3>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="form-group">
                    <label htmlFor="code" className="form-label">รหัสวิชา</label>
                    <input
                        id="code"
                        name="code"
                        type="text"
                        value={draft.code}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="เช่น CS101"
                        aria-invalid={!!errors.code}
                        aria-describedby={errors.code ? "code-error" : undefined}
                    />
                    {errors.code ? <p id="code-error" className="text-xs text-rose-500 font-medium mt-1">{errors.code}</p> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="name" className="form-label">ชื่อวิชา</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={draft.name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="เช่น Introduction to Computer Science"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name ? <p id="name-error" className="text-xs text-rose-500 font-medium mt-1">{errors.name}</p> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="credit" className="form-label">หน่วยกิต</label>
                    <input
                        id="credit"
                        name="credit"
                        type="number"
                        inputMode="numeric"
                        min="1"
                        max="6"
                        value={draft.credit}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="1 - 6"
                        aria-invalid={!!errors.credit}
                        aria-describedby={errors.credit ? "credit-error" : undefined}
                    />
                    {errors.credit ? <p id="credit-error" className="text-xs text-rose-500 font-medium mt-1">{errors.credit}</p> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="instructor" className="form-label">ผู้สอน</label>
                    <input
                        id="instructor"
                        name="instructor"
                        type="text"
                        value={draft.instructor}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="เช่น อ.สมชาย ใจดี"
                        aria-invalid={!!errors.instructor}
                        aria-describedby={errors.instructor ? "instructor-error" : undefined}
                    />
                    {errors.instructor ? <p id="instructor-error" className="text-xs text-rose-500 font-medium mt-1">{errors.instructor}</p> : null}
                </div>

                <div className="flex items-center gap-2 pt-2">
                    <button type="submit" className="btn-submit">
                        💾 บันทึกข้อมูล
                    </button>
                    {initialCourse ? (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                            ยกเลิก
                        </button>
                    ) : null}
                </div>
            </form>
        </div>
    );
}