import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className="bg-primary p-4 text-white text-center josefin-font">
  Copyright © 2026 Imaigal Trust. All Rights Reserved. | Design and Developed 
  <span className="inline-flex items-center gap-1 ml-1">
    By <Link 
    href="https://proz.in/"
    target="_blank"      
  rel="noopener noreferrer" 
 >ProZ Solutions LLP</Link>
  </span>.
</div>
  );
}