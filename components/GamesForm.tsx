"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import type { Games } from "@/app/types/Game";

export type GameDraft = {
  title: string;
  hours: string;
  platform: string;
  status: string;
};

const emptyDraft: GameDraft = {
  title: "",
  hours: "",
  platform: "",
  status: "",
};

type GamesFormProps = {
  initialGame?: Games;
  onSave: (draft: GameDraft) => void;
  onCancel: () => void;
};

function toDraft(game?: Games): GameDraft {
  if (!game) return emptyDraft;
  return {
    title: game.title,
    hours: String(game.hours),
    platform: game.platform,
    status: game.status,
  };
}

type FormErrors = Partial<Record<keyof GameDraft, string>>;

export default function GamesForm({ initialGame, onSave, onCancel }: GamesFormProps) {
  const [draft, setDraft] = useState<GameDraft>(toDraft(initialGame));
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(value: GameDraft): FormErrors {
    const nextErrors: FormErrors = {};
    if (value.title.trim() === "") nextErrors.title = "กรุณาระบุชื่อเกม";

    const hours = Number(value.hours);
    if (!Number.isInteger(hours) || hours <= 0) {
      nextErrors.hours = "ชั่วโมงต้องเป็นจำนวนเต็มบวก";
    }

    if (value.platform.trim() === "") nextErrors.platform = "กรุณาระบุแพลตฟอร์ม";
    if (value.status.trim() === "") nextErrors.status = "กรุณาระบุสถานะการเล่น";

    return nextErrors;
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  return (
    <div className="form-card">
      <h3 className="text-xl font-extrabold text-slate-800 mb-5 flex items-center gap-2">
        {initialGame ? "✏️ แก้ไขข้อมูลเกม" : "🎮 เพิ่มรายการเกมใหม่"}
      </h3>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="form-group">
          <label htmlFor="title" className="form-label">ชื่อเกม</label>
          <input
            id="title"
            name="title"
            type="text"
            value={draft.title}
            onChange={handleChange}
            className="form-input"
            placeholder="เช่น Ragnarok Online, PUBG"
          />
          {errors.title && <p className="text-xs text-rose-500 font-medium mt-1">{errors.title}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="hours" className="form-label">จำนวนชั่วโมงที่เล่น</label>
          <input
            id="hours"
            name="hours"
            type="number"
            value={draft.hours}
            onChange={handleChange}
            className="form-input"
            placeholder="เช่น 100"
          />
          {errors.hours && <p className="text-xs text-rose-500 font-medium mt-1">{errors.hours}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="platform" className="form-label">แพลตฟอร์ม</label>
          <input
            id="platform"
            name="platform"
            type="text"
            value={draft.platform}
            onChange={handleChange}
            className="form-input"
            placeholder="เช่น PC, Mobile, PlayStation"
          />
          {errors.platform && <p className="text-xs text-rose-500 font-medium mt-1">{errors.platform}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="status" className="form-label">สถานะ</label>
          <select id="status" name="status" value={draft.status} onChange={handleChange} className="form-select">
            <option value="">-- เลือกสถานะ --</option>
            <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
            <option value="กำลังเล่น">กำลังเล่น</option>
            <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
          </select>
          {errors.status && <p className="text-xs text-rose-500 font-medium mt-1">{errors.status}</p>}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button type="submit" className="btn-submit">
            💾 บันทึกข้อมูล
          </button>
          {initialGame && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              ยกเลิก
            </button>
          )}
        </div>
      </form>
    </div>
  );
}