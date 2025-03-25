import Link from "next/link";

import { ArrowBigRightDash } from 'lucide-react'

export default function Home() {
  return (
    <div>
      <div className='flex items-center gap-1.5'>
        <span><ArrowBigRightDash/></span>
        <Link href='/projects'>All projects</Link>
      </div>
    </div>
  );
}
