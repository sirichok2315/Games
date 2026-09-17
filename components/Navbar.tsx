//navbar  home/courses/about/contact
import Link from "next/link";

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link href="/courses">หลักสูตร</Link></li>
                <li><Link href="/about">เกี่ยวกับเรา</Link></li>
                <li><Link href="/games">Game</Link></li>
            </ul>
        </nav>
    );
}