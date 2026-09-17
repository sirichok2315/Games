"use client";

import { useState, type ChangeEvent } from "react";
import type { Games } from "@/app/types/Game";
import GamesCard from "@/components/GamesCard";
import GamesForm, { type GameDraft } from "@/components/GamesForm";

type GamesExplorerProps = {
  initialGames: Games[];
};

export default function GamesExplorer({ initialGames }: GamesExplorerProps) {
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด"); // ✅ State สำหรับตัวกรองสถานะ
  const [deletingId, setDeletingId] = useState<string | null>(null); // ✅ State เก็บ ID ที่รอการยืนยันลบ
  const [games, setGames] = useState<Games[]>(initialGames || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // ✅ 1. คำนวณ Derived State: ชั่วโมงรวมของเกมที่ "ยังไม่เริ่ม"
  const pendingHoursTotal = games
    .filter((game) => game.status === "ยังไม่เริ่ม")
    .reduce((sum, game) => sum + Number(game.hours), 0);

  // ✅ 2. ฟังก์ชันเปลี่ยนสถานะโดยตรง
  function handleChangeStatus(id: string, newStatus: string) {
    setGames((prev) =>
      prev.map((game) =>
        String(game.id) === id ? { ...game, status: newStatus } : game
      )
    );
  }

  // ✅ 3. ฟังก์ชันยืนยันการลบ
  function confirmDelete() {
    if (deletingId) {
      setGames((prev) => prev.filter((game) => String(game.id) !== deletingId));
      setDeletingId(null);
    }
  }

  // CRUD Functions เดิม
  function handleCreate(draft: GameDraft) {
    const newGame: Games = {
      id: Date.now(),
      title: draft.title.trim(),
      hours: Number(draft.hours),
      platform: draft.platform.trim(),
      status: draft.status.trim(),
    };
    setGames((prev) => [...prev, newGame]);
  }

  function handleUpdate(id: string, draft: GameDraft) {
    setGames((prev) =>
      prev.map((game) =>
        String(game.id) === id
          ? {
            ...game,
            title: draft.title.trim(),
            hours: Number(draft.hours),
            platform: draft.platform.trim(),
            status: draft.status.trim(),
          }
          : game
      )
    );
    setEditingId(null);
  }

  function handleSave(draft: GameDraft) {
    if (editingId === null) {
      handleCreate(draft);
    } else {
      handleUpdate(editingId, draft);
    }
  }

  function handleToggleFavorite(id: string) {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  }

  // ✅ 4. ตัวกรองค้นหา + กรองตามสถานะพร้อมกัน
  const searchText = keyword.trim().toLowerCase();
  const visibleGames = games.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchText) ||
      game.platform.toLowerCase().includes(searchText);
    const matchesStatus =
      statusFilter === "ทั้งหมด" || game.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const editingGame = games.find((game) => String(game.id) === editingId);

  return (
    <div className="space-y-6">
      {/* สรุปชั่วโมง และ ช่องค้นหา/ตัวกรอง */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <span className="text-sm font-semibold text-slate-600">
            จำนวนชั่วโมงรวมของเกมที่ยังไม่ได้เริ่ม
          </span>
          <span className="text-base font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            ⏱️ {pendingHoursTotal} ชั่วโมง
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="search"
            placeholder="🔍 ค้นหาชื่อเกมหรือแพลตฟอร์ม..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="form-input flex-1 mb-0!"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select sm:w-48 mb-0!"
          >
            <option value="ทั้งหมด">-- ทุกสถานะ --</option>
            <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
            <option value="กำลังเล่น">กำลังเล่น</option>
            <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
          </select>
        </div>
      </div>

      {/* Pop-up / Modal ยืนยันก่อนลบ */}
      {deletingId && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between">
          <p className="text-sm font-semibold text-rose-700">คุณต้องการลบรายการนี้ใช่หรือไม่?</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={confirmDelete}
              className="px-3 py-1 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors"
            >
              ยืนยันลบ
            </button>
            <button
              type="button"
              onClick={() => setDeletingId(null)}
              className="px-3 py-1 text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      )}

      {/* รายการเกม */}
      {visibleGames.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80">
          <p className="text-slate-400 font-medium">ไม่พบรายการเกมที่ตรงกับเงื่อนไข</p>
        </div>
      ) : (
        <section className="space-y-4">
          {visibleGames.map((game) => (
            <GamesCard
              key={game.id}
              game={game}
              isFavorite={favoriteIds.includes(String(game.id))}
              onToggleFavorite={handleToggleFavorite}
              onEdit={setEditingId}
              onDelete={(id) => setDeletingId(id)}
              onChangeStatus={handleChangeStatus}
            />
          ))}
        </section>
      )}

      {/* ฟอร์มเพิ่ม/แก้ไข */}
      <GamesForm
        key={editingId ?? "new"}
        initialGame={editingGame}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />
    </div>
  );
}