import { Band } from "@/app/types/Band";

export const bandsData: Band[] = [
  {
    id: 1,
    name: "โลโซ (LOSO)",
    genre: "Rock",
    image: "/images/band/15181673_1311085792256589_1313898178526602859_n.jpg",
    members: [
      { id: 1, name: "เสกสรรค์ ศุขพิมาย", role: "นักร้องนำ" },
      { id: 2, name: "กิตติศักดิ์ โคตรคำ", role: "กลอง" },
      { id: 3, name: "อภิรัฐ สุขจิตร์", role: "เบส" },
    ],
  },
  {
    id: 2,
    name: "ปู พงษ์สิทธิ์ คำภีร์ (วงคำภีร์)",
    genre: "เพลงเพื่อชีวิต",
    image: "/images/band/ahr0cdovl3aylmlzyw5vb2suy29tl2pvlzavdwqvndc4lzizote1otcvmje1ntkxmdbfmtaxntu5mtqzmda3mdi0mzdfmzyuanbn.jpg",
    members: [
      { id: 1, name: "พงษ์สิทธิ์ คำภีร์", role: "นักร้องนำ" },
      { id: 2, name: "ศิวะพงษ์ ศรีปรีชาพัฒนะ", role: "กีตาร์" },
      { id: 3, name: "ยุทธ์ดนัย มั่งนิมิตร", role: "เบส" },
      { id: 4, name: "อุดร ทีนะกุล", role: "กลอง" },
    ],
  },
  {
    id: 3,
    name: "หินเหล็กไฟ (Stone Metal Fire)",
    genre: "Rock",
    image: "/images/band/S__30582888.jpg",
    members: [
      { id: 1, name: " ปฐมพงศ์ สมบัติพิบูลย์", role: "นักร้องนำ" },
      { id: 2, name: "จักรรินทร์ ดวงมณีรัตนชัย ", role: "กีตาร์" },
      { id: 3, name: "นำพล ขจรพิมานมาศ ", role: "กีตาร์" },
      { id: 4, name: " ณรงค์ ศิริสารสุนทร ", role: "เบส" },
      { id: 5, name: "ดำรงสิทธิ์ ศรีนาค ", role: "กลอง" },
    ],
  },
];