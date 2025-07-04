import { Home, FileText, Calculator, ClipboardList, Handshake, File } from "lucide-react";
import { useState } from "react";

const tabs = [
  { name: "Home", icon: Home },
  { name: "Deck Generator", icon: FileText },
  { name: "Estimator", icon: Calculator },
  { name: "RFI Creator", icon: ClipboardList },
  { name: "Handover", icon: Handshake },
];

export default function TopNavTabs() {
  const [active, setActive] = useState("Home");

  return (
    <div className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#FCFBFA]">
      {/* Left Tabs */}
      <div className="flex items-center space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActive(tab.name)}
            className={`flex items-center space-x-1 text-sm font-medium transition ${
              active === tab.name ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <tab.icon size={16} strokeWidth={1.5} />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Right BD Prospect */}
      <div className="flex items-center space-x-2 text-sm text-blue-600 font-medium">
        <File size={16} strokeWidth={1.5} />
        <a href="#" className="hover:underline truncate max-w-[240px]">
          BD Prospect Page (CubeSmart)
        </a>
      </div>
    </div>
  );
}
