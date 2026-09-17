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
    <article className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all mb-4">
      <div className="flex items-start justify-between gap-2 mb-3">
        <h2 className="text-xl font-bold text-blue-600 hover:underline">
          <Link href={`/games/${game.id}`}>{game.title}</Link>
        </h2>
        
        {/* ✅ ปรับเป็นปุ่มข้อความรายการโปรดแบบเรียบง่าย */}
        <button
          type="button"
          onClick={() => onToggleFavorite(String(game.id))}
          className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${
            isFavorite
              ? "bg-red-50 text-red-600 border-red-200"
              : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
          }`}
        >
          {isFavorite ? "❤️ รายการโปรด" : "🤍 เพิ่มเป็นรายการโปรด"}
        </button>
      </div>

      <div className="space-y-1 text-sm text-gray-700 mb-4">
        <p>🎮 แพลตฟอร์ม: {game.platform}</p>
        <p>⏱️ เวลาเล่น: {game.hours} ชม.</p>
      </div>

      <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">สถานะ:</span>
          <select
            value={game.status}
            onChange={(e) => onChangeStatus(String(game.id), e.target.value)}
            className="text-sm border rounded px-2 py-1 outline-none cursor-pointer"
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
            className="px-3 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            แก้ไข
          </button>
          <button
            type="button"
            onClick={() => onDelete(String(game.id))}
            className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded transition-colors"
          >
            ลบ
          </button>
        </div>
      </div>
    </article>
  );
}