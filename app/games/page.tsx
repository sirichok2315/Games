import { gamesData } from "@/data/GameData";
import GamesExplorer from "@/components/GamesExplorer";

export default function GamesPage() {
  return <GamesExplorer initialGames={gamesData} />;
}