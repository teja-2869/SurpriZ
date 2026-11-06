import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Download,
  Share2,
  QrCode,
  MessageCircle,
  Mail,
  Send,
  Eye,
  Edit,
  FolderHeart,
  ExternalLink
} from 'lucide-react';
import { Gift } from '../../types/gift';
import { sound } from '../../utils/soundEngine';
import { fireConfettiExplosion } from '../../utils/confettiEngine';
import { QRModal } from '../shared/QRModal';

interface GiftSharingProps {
  gift: Gift;
  onOpenRecipient: () => void;
  onEditBlueprint: () => void;
  onOpenGallery: () => void;
}

export const GiftSharingView: React.FC<GiftSharingProps> = ({
  gift,
  onOpenRecipient,
  onEditBlueprint,
  onOpenGallery
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  const displayUrl = `surpriz.me/${gift.slug}`;
  const inviteSnippet = `Hey ${gift.recipient.name}! ${gift.sender.name} prepared a magical digital birthday unboxing for you. Visit ${displayUrl} (Passcode: ${gift.security.secretKey}) 💖`;

  const handleCopyLink = () => {
    sound.playSparkle();
    navigator.clipboard?.writeText(`https://${displayUrl}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    sound.playSparkle();
    navigator.clipboard?.writeText(gift.security.secretKey);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopySnippet = () => {
    sound.playSparkle();
    navigator.clipboard?.writeText(inviteSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Top Celebration Badge */}
      <div className="relative mb-3">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 flex items-center justify-center text-3xl shadow-md border-2 border-white">
          🎁
        </div>
        <span className="absolute -top-1 -right-4 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
          🎉 Confetti Ready!
        </span>
        <span className="absolute -bottom-1 -left-2 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
          🔒 Vault Sealed
        </span>
      </div>

      <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wider">
        CAPSULE CREATED SUCCESSFULLY
      </span>

      <h2 className="font-display text-4xl sm:text-5xl font-bold text-center text-[#2D232E] mt-1 mb-2 tracking-tight">
        Your surprise is ready! 🎉
      </h2>

      <p className="text-sm sm:text-base text-[#6D5D6E] text-center max-w-lg mb-8 leading-relaxed">
        {gift.recipient.name}'s 25th birthday parcel is sealed and waiting in the vault. Send it with love and witness the joy unfold!
      </p>

      {/* Grid of Sharing Cards matching Stitch 15 */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-6">
          {/* Direct Keepsake URL Card */}
          <div className="bg-white p-6 rounded-3xl border border-[#EFE5DE] shadow-sm flex flex-col gap-3 relative">
            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full self-start">
              🔗 PRIVATE RECIPIENT LINK
            </span>

            <span className="text-xs font-bold text-[#2D232E]">Direct Keepsake URL</span>

            <div className="flex items-center justify-between p-3 bg-[#FAF5FF] rounded-2xl border border-purple-200">
              <span className="text-sm font-bold text-purple-900 font-mono flex items-center gap-2 truncate">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                {displayUrl}
              </span>

              <button
                type="button"
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-xl bg-[#6B5B95] hover:bg-[#584880] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors shrink-0"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedLink ? 'Copied!' : 'Copy Link'}
              </button>
            </div>

            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              🔒 Protected by password barrier & recipient verification
            </span>
          </div>

          {/* Secret Key & Parcel Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Secret Access Key */}
            <div className="bg-white p-5 rounded-3xl border border-[#EFE5DE] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-500">🔑 Secret Access Key</span>
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                    Passcode
                  </span>
                </div>
                <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="font-mono text-xl font-bold tracking-wider text-slate-900">
                    {gift.security.secretKey}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="p-1 text-slate-500 hover:text-purple-700"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">
                Recipient will be prompted before the parcel unwraps.
              </p>
            </div>

            {/* Parcel Status */}
            <div className="bg-white p-5 rounded-3xl border border-[#EFE5DE] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-500">📦 Parcel Status</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm">
                    ♡
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#2D232E]">Scheduled & Active</h5>
                    <span className="text-[10px] text-slate-400">Never expires • High res archival</span>
                  </div>
                </div>
              </div>

              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-3">
                <div className="w-full h-full bg-[#8B5CF6]" />
              </div>
            </div>
          </div>

          {/* One-Click Dispatch Buttons */}
          <div className="bg-white p-6 rounded-3xl border border-[#EFE5DE] shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#2D232E] flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-purple-600" /> One-Click Dispatch
              </h4>
              <span className="text-[10px] font-mono text-slate-400">Instant Social Deliver</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playSparkle();
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(inviteSnippet)}`, '_blank');
                }}
                className="py-2.5 px-3 rounded-2xl bg-[#E8F8F0] hover:bg-[#D1F2E2] text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" /> WhatsApp
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playSparkle();
                  window.open(`sms:?body=${encodeURIComponent(inviteSnippet)}`, '_blank');
                }}
                className="py-2.5 px-3 rounded-2xl bg-[#FAF5FF] hover:bg-purple-100 text-purple-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Share2 className="w-4 h-4 text-purple-600" /> iMessage / SMS
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playSparkle();
                  window.open(
                    `mailto:?subject=${encodeURIComponent(
                      `A magical birthday surprise from ${gift.sender.name}!`
                    )}&body=${encodeURIComponent(inviteSnippet)}`,
                    '_blank'
                  );
                }}
                className="py-2.5 px-3 rounded-2xl bg-[#FFF5F8] hover:bg-pink-100 text-pink-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Mail className="w-4 h-4 text-pink-600" /> Email Card
              </button>
            </div>

            {/* Invite Message Snippet */}
            <div className="p-3 bg-[#FBF7F4] rounded-2xl border border-[#EFE5DE] text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-slate-400">Invite Message Snippet</span>
                <button
                  type="button"
                  onClick={handleCopySnippet}
                  className="text-[11px] font-bold text-purple-700 hover:underline flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  {copiedSnippet ? 'Copied!' : 'Copy snippet'}
                </button>
              </div>
              <p className="text-slate-700 italic font-mono text-[11px] leading-relaxed">
                "{inviteSnippet}"
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols) matching Stitch 15 */}
        <div className="md:col-span-5 flex flex-col gap-6">
          {/* Physical Scan Card */}
          <div className="bg-white p-6 rounded-3xl border border-[#EFE5DE] shadow-sm flex flex-col items-center text-center">
            <div className="w-full flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#2D232E] flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-purple-600" /> PHYSICAL SCAN CARD
              </span>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                Printable
              </span>
            </div>

            {/* QR Mockup */}
            <div
              onClick={() => setShowQRModal(true)}
              className="w-48 h-48 bg-[#FAF5FF] p-3 rounded-2xl border-2 border-dashed border-purple-200 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform relative group shadow-inner"
            >
              <div className="w-36 h-36 bg-white p-2 rounded-xl shadow-xs border border-slate-200 flex items-center justify-center relative">
                <QrCode className="w-full h-full text-purple-950" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-xl">🎁</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                sound.playSparkle();
                setShowQRModal(true);
              }}
              className="mt-6 w-full py-3 rounded-2xl bg-[#6B5B95] hover:bg-[#584880] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download QR Keepsake Card 📱</span>
            </button>

            <span className="text-[11px] text-slate-400 mt-2">
              Tuck into an envelope or print as a physical postcard.
            </span>
          </div>

          {/* Pro Gifting Tip */}
          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-sm shrink-0">
              💡
            </div>
            <div>
              <h5 className="text-xs font-bold text-amber-950">Pro Gifting Tip</h5>
              <p className="text-[11px] text-amber-900 leading-relaxed mt-0.5">
                Send the password 10 minutes after the link to build excitement and playful anticipation!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Need Adjustments Banner matching Stitch 15 bottom */}
      <div className="mt-10 w-full max-w-5xl bg-white p-5 rounded-3xl border border-[#EFE5DE] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
            ⚙️
          </div>
          <div>
            <h5 className="text-xs font-bold text-[#2D232E]">Need adjustments?</h5>
            <p className="text-[11px] text-[#8C7A87]">
              You can preview the live experience or modify multimedia items anytime.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              sound.playBoxOpen();
              onOpenRecipient();
            }}
            className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> Test Recipient View
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playSparkle();
              onEditBlueprint();
            }}
            className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Edit className="w-3.5 h-3.5" /> Edit Blueprint
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playSparkle();
              onOpenGallery();
            }}
            className="px-5 py-2 rounded-full bg-[#6B5B95] hover:bg-[#584880] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <FolderHeart className="w-3.5 h-3.5" /> My Gift Box Gallery
          </button>
        </div>
      </div>

      {/* QR Modal */}
      <QRModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        giftUrl={`https://${displayUrl}`}
        passcode={gift.security.secretKey}
        recipientName={gift.recipient.name}
      />
    </div>
  );
};
