import React from 'react';
import { Gift, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#FFF9F5] border-t border-[#F3E8E2] py-8 px-4 md:px-8 mt-16 text-xs text-[#8C7A87]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Gift className="w-4 h-4 text-[#8B5CF6]" />
          <span>© 2024 SURPRIZ Keepsakes & Milestones. Crafted with playful warmth.</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 font-medium">
          <span className="hover:text-[#2D232E] cursor-pointer transition-colors">Unwrap Joy</span>
          <span className="hover:text-[#2D232E] cursor-pointer transition-colors">Keepsake Protection</span>
          <span className="hover:text-[#2D232E] cursor-pointer transition-colors">Care Concierge</span>
          <span className="hover:text-[#2D232E] cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-[#2D232E] cursor-pointer transition-colors">Terms</span>
          <span className="hover:text-[#2D232E] cursor-pointer transition-colors">Help Center</span>
        </div>
      </div>
    </footer>
  );
};
