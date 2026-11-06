import React, { useState } from 'react';
import {
  X,
  Type,
  Check,
  Sparkles,
  Heart,
  Calendar,
  Lock,
  Smile,
  Cake,
  User
} from 'lucide-react';
import { Gift } from '../../types/gift';
import { sound } from '../../utils/soundEngine';
import { useToast } from './ToastNotification';

interface GlobalTextEditModalProps {
  isOpen: boolean;
  gift: Gift;
  onClose: () => void;
  onSave: (updated: Partial<Gift>) => void;
}

export const GlobalTextEditModal: React.FC<GlobalTextEditModalProps> = ({
  isOpen,
  gift,
  onClose,
  onSave
}) => {
  const { showToast } = useToast();

  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'names' | 'birthday' | 'security'>('names');

  // Names & Titles
  const [recipientName, setRecipientName] = useState(gift.recipient.name);
  const [petName, setPetName] = useState(gift.recipient.petName || '');
  const [bannerHeading, setBannerHeading] = useState(gift.recipient.bannerHeading);
  const [senderName, setSenderName] = useState(gift.sender.name);
  const [relationship, setRelationship] = useState(gift.sender.relationship);

  // Birthday Info
  const [age, setAge] = useState(gift.birthday?.age ?? gift.recipient?.milestoneAge ?? 25);
  const [dateStr, setDateStr] = useState(
    gift.birthday?.date || `${gift.recipient?.birthMonth || 'October'} ${gift.recipient?.birthDay || 14}, ${gift.recipient?.birthYear || 1999}`
  );
  const [zodiac, setZodiac] = useState(gift.birthday?.zodiacSign || 'Libra ♎');
  const [birthStone, setBirthStone] = useState(gift.birthday?.birthStone || 'Opal');
  const [birthFlower, setBirthFlower] = useState(gift.birthday?.birthFlower || 'Marigold');

  // Security
  const [secretKey, setSecretKey] = useState(gift.security.secretKey);
  const [passwordHint, setPasswordHint] = useState(gift.security.passwordHint);

  const handleSave = () => {
    sound.playWaxPop();
    const updated: Partial<Gift> = {
      recipient: {
        ...gift.recipient,
        name: recipientName.trim() || 'Precious Friend',
        petName: petName.trim(),
        bannerHeading: bannerHeading.trim() || `Happy ${age}th Birthday!`
      },
      sender: {
        ...gift.sender,
        name: senderName.trim() || 'Your Loved One',
        relationship
      },
      birthday: {
        ...gift.birthday,
        age: Number(age) || 25,
        date: dateStr,
        zodiacSign: zodiac,
        birthStone,
        birthFlower
      },
      security: {
        ...gift.security,
        secretKey: secretKey.trim().toUpperCase() || 'MAYA2024',
        passwordHint: (passwordHint || '').trim()
      }
    };

    onSave(updated);
    showToast('All Text Synchronized', 'Updated names, birthday details, and titles!', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FFFDFB] w-full max-w-2xl rounded-3xl shadow-2xl border border-purple-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100 bg-[#FAF5FF]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-rose-500 text-white flex items-center justify-center shadow-xs">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wider">
                Quick Text Replacement Studio
              </span>
              <h3 className="font-display text-lg font-bold text-[#2D232E]">
                Edit All Gift Text, Names & Milestone Info
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playWaxPop();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center shadow-xs cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab strip */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-white border-b border-slate-100 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('names')}
            className={`px-3.5 py-1.5 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'names'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <User className="w-3.5 h-3.5" /> Names & Relationship
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('birthday')}
            className={`px-3.5 py-1.5 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'birthday'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Cake className="w-3.5 h-3.5" /> Birthday & Milestone
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`px-3.5 py-1.5 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'security'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Lock className="w-3.5 h-3.5" /> Password & Clue
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === 'names' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Recipient Full Name
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Maya Rose"
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Cute Pet Name / Nickname
                  </label>
                  <input
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="e.g. Little Bear 🐻"
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Parcel Header / Top Banner Text
                </label>
                <input
                  type="text"
                  value={bannerHeading}
                  onChange={(e) => setBannerHeading(e.target.value)}
                  placeholder="e.g. Happy 25th Birthday, Maya! 🎈"
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Sender Name(s) / Gifting Crew
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Clara & The Gang"
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Relationship
                  </label>
                  <input
                    type="text"
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    placeholder="e.g. Inseparable Best Friends"
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'birthday' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1">
                    <Cake className="w-3.5 h-3.5 text-purple-600" /> Milestone Age
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-purple-600" /> Birthday Date
                  </label>
                  <input
                    type="text"
                    value={dateStr}
                    onChange={(e) => setDateStr(e.target.value)}
                    placeholder="e.g. October 28, 2024"
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Zodiac Sign
                  </label>
                  <input
                    type="text"
                    value={zodiac}
                    onChange={(e) => setZodiac(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Birth Stone
                  </label>
                  <input
                    type="text"
                    value={birthStone}
                    onChange={(e) => setBirthStone(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Birth Flower
                  </label>
                  <input
                    type="text"
                    value={birthFlower}
                    onChange={(e) => setBirthFlower(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-purple-600" /> Recipient Secret Passcode
                </label>
                <input
                  type="text"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value.toUpperCase())}
                  placeholder="e.g. MAYA2024"
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 font-mono text-sm font-bold tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  The recipient must enter this key on the wax seal gate to unwrap their parcel.
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Password Clue / Riddle
                </label>
                <textarea
                  rows={2}
                  value={passwordHint}
                  onChange={(e) => setPasswordHint(e.target.value)}
                  placeholder="e.g. Your first name in all caps + this milestone year!"
                  className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Check className="w-4 h-4" /> Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
};
