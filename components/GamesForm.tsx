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
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="title">ชื่อเกม</label>
        <input
          id="title"
          name="title"
          type="text"
          value={draft.title}
          onChange={handleChange}
        />
        {errors.title && <p>{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="hours">จำนวนชั่วโมงที่เล่น</label>
        <input
          id="hours"
          name="hours"
          type="number"
          value={draft.hours}
          onChange={handleChange}
        />
        {errors.hours && <p>{errors.hours}</p>}
      </div>

      <div>
        <label htmlFor="platform">แพลตฟอร์ม</label>
        <input
          id="platform"
          name="platform"
          type="text"
          value={draft.platform}
          onChange={handleChange}
        />
        {errors.platform && <p>{errors.platform}</p>}
      </div>

      <div>
        <label htmlFor="status">สถานะ</label>
        <select id="status" name="status" value={draft.status} onChange={handleChange}>
          <option value="">-- เลือกสถานะ --</option>
          <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
          <option value="กำลังเล่น">กำลังเล่น</option>
          <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
        </select>
        {errors.status && <p>{errors.status}</p>}
      </div>

      <button type="submit">บันทึก</button>
      {initialGame && (
        <button type="button" onClick={onCancel}>
          ยกเลิก
        </button>
      )}
    </form>
  );
}