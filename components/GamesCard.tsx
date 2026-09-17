import type { Games } from "@/app/types/Game";
import Link from "next/link";

type GamesCardProps = {
  game: Games;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onChangeStatus: (id: string, newStatus: string) => void;
};

export default function GamesCard({
  game,
  isFavorite,
  onToggleFavorite,
  onEdit,
  onDelete,
  onChangeStatus,
}: GamesCardProps) {
  return (
    <article className="modern-card">
      <div className="modern-card-top-bar" />

      <div className="flex justify-between items-start mb-3 pt-1">
        <h2>
          <Link
            href={`/games/${game.id}`}
            className="text-xl font-extrabold text-slate-800 hover:text-indigo-600 transition-colors"
          >
            {game.title}
          </Link>
        </h2>

        <button
          type="button"
          onClick={() => onToggleFavorite(String(game.id))}
          className={`btn-fav-modern ${isFavorite ? "active" : ""}`}
        >
          {isFavorite ? "❤️ รายการโปรด" : "🤍 เพิ่มในรายการโปรด"}
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="badge-item badge-blue">🎮 {game.platform}</span>
        <span className="badge-item badge-purple">⏱️ {game.hours} ชม.</span>
      </div>

      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            สถานะ:
          </span>
          <select
            value={game.status}
            onChange={(e) => onChangeStatus(String(game.id), e.target.value)}
            className="status-select-modern"
          >
            <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
            <option value="กำลังเล่น">กำลังเล่น</option>
            <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(String(game.id))}
            className="btn-edit-modern"
          >
            ✏️ แก้ไข
          </button>
          <button
            type="button"
            onClick={() => onDelete(String(game.id))}
            className="btn-delete-modern"
          >
            🗑️ ลบ
          </button>
        </div>
      </div>
    </article>
  );
}