import Image from "next/image";
import { Band } from "@/app/types/Band";

type BandCardProps = {
  band: Band;
};

export default function BandCard({ band }: BandCardProps) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px", marginBottom: "16px" }}>
      <Image
        src={band.image}
        alt={band.name}
        width={300}
        height={200}
        style={{ objectFit: "cover", borderRadius: "6px" }}
      />
      <h2>{band.name}</h2>
      <p>แนวเพลง: {band.genre}</p>
      
      <h3>สมาชิกในวง:</h3>
      <ul>
        {band.members.map((member) => (
          <li key={member.id}>
            {member.name} ({member.role})
          </li>
        ))}
      </ul>
    </div>
  );
}