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
    <div>
      {/* แสดง Derived State */}
      <div className="p-2 bg-gray-100 mb-4">
        <strong>จำนวนชั่วโมงรวมของเกมที่ยังไม่ได้เริ่ม:</strong> {pendingHoursTotal} ชั่วโมง
      </div>

      {/* ช่องค้นหาและตัวกรองสถานะ */}
      <div className="flex gap-2 mb-4">
        <input
          type="search"
          placeholder="ค้นหาชื่อเกมหรือแพลตฟอร์ม"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ทั้งหมด">-- ทุกสถานะ --</option>
          <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
          <option value="กำลังเล่น">กำลังเล่น</option>
          <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
        </select>
      </div>

      {/* Pop-up / Modal ยืนยันก่อนลบ */}
      {deletingId && (
        <div className="p-4 border border-red-500 bg-red-50 mb-4">
          <p>คุณต้องการลบรายการนี้ใช่หรือไม่?</p>
          <button type="button" onClick={confirmDelete}>ยืนยันลบ</button>
          <button type="button" onClick={() => setDeletingId(null)}>ยกเลิก</button>
        </div>
      )}

      {/* รายการเกม */}
      {visibleGames.length === 0 ? (
        <p>ไม่พบรายการเกมที่ตรงกับเงื่อนไข</p>
      ) : (
        <section>
          {visibleGames.map((game) => (
            <GamesCard
              key={game.id}
              game={game}
              isFavorite={favoriteIds.includes(String(game.id))}
              onToggleFavorite={handleToggleFavorite}
              onEdit={setEditingId}
              onDelete={(id) => setDeletingId(id)} // ตั้งค่า ID ที่จะลบเพื่อรอยืนยัน
              onChangeStatus={handleChangeStatus}
            />
          ))}
        </section>
      )}

      <h2>{editingId ? "แก้ไขรายการเกม" : "เพิ่มรายการเกมใหม่"}</h2>
      <GamesForm
        key={editingId ?? "new"}
        initialGame={editingGame}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />
    </div>
  );
}