import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Play,
  Home,
  RotateCcw,
  Star,
} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

const foodData = {
  中式: [
    {
      name: "牛肉麵",
      emoji: "🍜",
      image:
        "https://images.unsplash.com/photo-1504669887860-f6d4cc3feb4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxiZWVmJTIwbm9vZGxlJTIwc291cCUyMHRhaXdhbmVzZXxlbnwxfHx8fDE3NzYwNjI3MjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "滷肉飯",
      emoji: "🍚",
      image:
        "https://images.unsplash.com/photo-1682496178083-74db4a32e473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFpc2VkJTIwcG9yayUyMHJpY2UlMjB0YWl3YW5lc2V8ZW58MXx8fHwxNzc2MDYyNzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "蔥油餅",
      emoji: "🫓",
      image:
        "https://images.unsplash.com/photo-1704383682314-92dd38542a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FsbGlvbiUyMHBhbmNha2V8ZW58MXx8fHwxNzc2MDYyNzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "炒飯",
      emoji: "🍛",
      image:
        "https://images.unsplash.com/photo-1646340916384-9845d7686e2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMHJpY2UlMjBhc2lhbnxlbnwxfHx8fDE3NzYwNjI3MjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "雞排便當",
      emoji: "🍱",
      image:
        "https://images.unsplash.com/photo-1705134880090-5e4497bf3202?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWl3YW5lc2UlMjBmcmllZCUyMGNoaWNrZW4lMjBiZW50b3xlbnwxfHx8fDE3NzYwNjI3MjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ],
  泰式: [
    {
      name: "打拋豬飯",
      emoji: "🍳",
      image:
        "https://images.unsplash.com/photo-1652615389989-fa324011f9c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx0aGFpJTIwYmFzaWwlMjBwb3JrJTIwcmljZXxlbnwxfHx8fDE3NzYwNjI3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "月亮蝦餅",
      emoji: "🦐",
      image:
        "https://images.unsplash.com/photo-1766566959672-257837bc6c76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx0aGFpJTIwc2hyaW1wJTIwY2FrZXxlbnwxfHx8fDE3NzYwNjI3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "泰式綠咖哩",
      emoji: "🍛",
      image:
        "https://images.unsplash.com/photo-1707056924965-2c687206af67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGN1cnJ5JTIwdGhhaXxlbnwxfHx8fDE3NzYwNjI3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "冬蔭功",
      emoji: "🍲",
      image:
        "https://images.unsplash.com/photo-1628430043175-0e8820df47c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b20lMjB5dW0lMjBzb3VwJTIwdGhhaXxlbnwxfHx8fDE3NzYwNjI3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "泰式炒河粉",
      emoji: "🍲",
      image:
        "https://images.unsplash.com/photo-1757845301698-da07924946a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwYWQlMjB0aGFpJTIwbm9vZGxlc3xlbnwxfHx8fDE3NzYwNjI3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ],
  日式: [
    {
      name: "壽司",
      emoji: "🍣",
      image:
        "https://images.unsplash.com/photo-1730325559618-940c72290ef0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGphcGFuZXNlfGVufDF8fHx8MTc3NjA2Mjc0OHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "拉麵",
      emoji: "🍜",
      image:
        "https://images.unsplash.com/photo-1625189657893-f8fd7b45a901?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW1lbiUyMGphcGFuZXNlfGVufDF8fHx8MTc3NjA2Mjc0OHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "丼飯",
      emoji: "🍛",
      image:
        "https://images.unsplash.com/photo-1761064864527-d428a88cd4f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxkb25idXJpJTIwcmljZSUyMGJvd2wlMjBqYXBhbmVzZXxlbnwxfHx8fDE3NzYwNjE5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "關東煮",
      emoji: "🍢",
      image:
        "https://images.unsplash.com/photo-1612492084463-6058e597df6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxvZGVuJTIwamFwYW5lc2V8ZW58MXx8fHwxNzc2MDYyNzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "烏龍麵",
      emoji: "🥢",
      image:
        "https://images.unsplash.com/photo-1700323861852-069271b695b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1ZG9uJTIwbm9vZGxlcyUyMGphcGFuZXNlfGVufDF8fHx8MTc3NjA2Mjc1NHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ],
  韓式: [
    {
      name: "韓式炸雞",
      emoji: "🍗",
      image:
        "https://images.unsplash.com/photo-1709164632728-8a943456dd0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxrb3JlYW4lMjBmcmllZCUyMGNoaWNrZW58ZW58MXx8fHwxNzc2MDYyNzU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "石鍋拌飯",
      emoji: "🥘",
      image:
        "https://images.unsplash.com/photo-1590301157890-4810ed352733?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxiaWJpbWJhcCUyMGtvcmVhbnxlbnwxfHx8fDE3NzYwNjI3NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "部隊鍋",
      emoji: "🍲",
      image:
        "https://images.unsplash.com/photo-1607502493639-ea518c5ac080?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRhZSUyMGpqaWdhZSUyMGFybXklMjBzdGV3JTIwa29yZWFufGVufDF8fHx8MTc3NjA2Mjc1NXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "韓式烤肉",
      emoji: "🥩",
      image:
        "https://images.unsplash.com/photo-1632558610168-8377309e34c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBiYnF8ZW58MXx8fHwxNzc2MDYyNzU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "辣炒年糕",
      emoji: "🌶️",
      image:
        "https://images.unsplash.com/photo-1679581083909-daf9604102ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dGVva2Jva2tpJTIwa29yZWFuJTIwcmljZSUyMGNha2V8ZW58MXx8fHwxNzc2MDYyNzYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ],
};

const restaurantData = {
  牛肉麵: [
    { name: "老張牛肉麵", price: "NT$150", rating: "4.8" },
    { name: "永康牛肉麵", price: "NT$180", rating: "4.7" },
    { name: "皇家牛肉麵", price: "NT$140", rating: "4.6" },
    { name: "阿財牛肉麵", price: "NT$130", rating: "4.5" },
  ],

  滷肉飯: [
    { name: "阿財滷肉飯", price: "NT$60", rating: "4.8" },
    { name: "金峰滷肉飯", price: "NT$65", rating: "4.7" },
    { name: "鬍鬚張", price: "NT$75", rating: "4.6" },
    { name: "幸福滷肉飯", price: "NT$55", rating: "4.5" },
  ],

  蔥油餅: [
    { name: "老街蔥油餅", price: "NT$45", rating: "4.8" },
    { name: "阿伯蔥油餅", price: "NT$40", rating: "4.7" },
    { name: "香酥蔥油餅", price: "NT$50", rating: "4.6" },
    { name: "市場蔥油餅", price: "NT$35", rating: "4.5" },
  ],

  炒飯: [
    { name: "金牌炒飯", price: "NT$90", rating: "4.8" },
    { name: "阿華炒飯", price: "NT$85", rating: "4.7" },
    { name: "好味炒飯", price: "NT$100", rating: "4.6" },
    { name: "大碗炒飯", price: "NT$95", rating: "4.5" },
  ],

  雞排便當: [
    { name: "豪華便當", price: "NT$120", rating: "4.8" },
    { name: "幸福便當", price: "NT$110", rating: "4.7" },
    { name: "阿國便當", price: "NT$130", rating: "4.6" },
    { name: "香香便當", price: "NT$115", rating: "4.5" },
  ],

  打拋豬飯: [
    { name: "泰香館", price: "NT$120", rating: "4.8" },
    { name: "曼谷小館", price: "NT$130", rating: "4.7" },
    { name: "泰美味", price: "NT$125", rating: "4.6" },
    { name: "泰好吃", price: "NT$135", rating: "4.5" },
  ],

  月亮蝦餅: [
    { name: "泰蝦王", price: "NT$220", rating: "4.8" },
    { name: "月亮餐廳", price: "NT$240", rating: "4.7" },
    { name: "泰式料理屋", price: "NT$200", rating: "4.6" },
    { name: "曼谷廚房", price: "NT$230", rating: "4.5" },
  ],

  泰式綠咖哩: [
    { name: "泰綠咖哩館", price: "NT$180", rating: "4.8" },
    { name: "泰式小館", price: "NT$170", rating: "4.7" },
    { name: "曼谷風味", price: "NT$190", rating: "4.6" },
    { name: "泰香園", price: "NT$175", rating: "4.5" },
  ],

  冬蔭功: [
    { name: "泰湯屋", price: "NT$210", rating: "4.8" },
    { name: "曼谷廚房", price: "NT$220", rating: "4.7" },
    { name: "泰味館", price: "NT$200", rating: "4.6" },
    { name: "泰式食堂", price: "NT$230", rating: "4.5" },
  ],

  泰式炒河粉: [
    { name: "泰河粉館", price: "NT$140", rating: "4.8" },
    { name: "曼谷河粉", price: "NT$150", rating: "4.7" },
    { name: "泰式快炒", price: "NT$145", rating: "4.6" },
    { name: "泰美味餐廳", price: "NT$155", rating: "4.5" },
  ],

  壽司: [
    { name: "壽司郎", price: "NT$200", rating: "4.8" },
    { name: "藏壽司", price: "NT$220", rating: "4.7" },
    { name: "爭鮮", price: "NT$180", rating: "4.6" },
    { name: "和風壽司", price: "NT$250", rating: "4.5" },
  ],

  拉麵: [
    { name: "一蘭拉麵", price: "NT$320", rating: "4.8" },
    { name: "麵屋武藏", price: "NT$280", rating: "4.7" },
    { name: "豚將拉麵", price: "NT$180", rating: "4.6" },
    { name: "樂山拉麵", price: "NT$250", rating: "4.5" },
  ],

  丼飯: [
    { name: "和風丼飯", price: "NT$180", rating: "4.8" },
    { name: "吉野家", price: "NT$140", rating: "4.7" },
    { name: "食其家", price: "NT$150", rating: "4.6" },
    { name: "東京食堂", price: "NT$200", rating: "4.5" },
  ],

  關東煮: [
    { name: "關東煮本舖", price: "NT$120", rating: "4.8" },
    { name: "日式小館", price: "NT$110", rating: "4.7" },
    { name: "和風食堂", price: "NT$130", rating: "4.6" },
    { name: "東京料理", price: "NT$125", rating: "4.5" },
  ],

  烏龍麵: [
    { name: "讚岐烏龍麵", price: "NT$160", rating: "4.8" },
    { name: "丸龜製麵", price: "NT$180", rating: "4.7" },
    { name: "日式麵館", price: "NT$150", rating: "4.6" },
    { name: "和風烏龍", price: "NT$170", rating: "4.5" },
  ],

  韓式炸雞: [
    { name: "起家雞", price: "NT$250", rating: "4.8" },
    { name: "NENE CHICKEN", price: "NT$280", rating: "4.7" },
    { name: "bb.q CHICKEN", price: "NT$300", rating: "4.6" },
    { name: "韓雞村", price: "NT$260", rating: "4.5" },
  ],

  石鍋拌飯: [
    { name: "韓宮館", price: "NT$180", rating: "4.8" },
    { name: "首爾食堂", price: "NT$190", rating: "4.7" },
    { name: "韓味屋", price: "NT$200", rating: "4.6" },
    { name: "韓式料理館", price: "NT$170", rating: "4.5" },
  ],

  部隊鍋: [
    { name: "部隊鍋之家", price: "NT$260", rating: "4.8" },
    { name: "首爾鍋物", price: "NT$280", rating: "4.7" },
    { name: "韓鍋館", price: "NT$250", rating: "4.6" },
    { name: "韓味食堂", price: "NT$270", rating: "4.5" },
  ],

  韓式烤肉: [
    { name: "八色烤肉", price: "NT$450", rating: "4.8" },
    { name: "姜虎東白丁", price: "NT$500", rating: "4.7" },
    { name: "韓燒館", price: "NT$420", rating: "4.6" },
    { name: "首爾烤肉", price: "NT$480", rating: "4.5" },
  ],

  辣炒年糕: [
    { name: "韓式年糕屋", price: "NT$120", rating: "4.8" },
    { name: "首爾小吃", price: "NT$130", rating: "4.7" },
    { name: "韓味館", price: "NT$110", rating: "4.6" },
    { name: "韓食堂", price: "NT$125", rating: "4.5" },
  ],
};

const screenVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function PhoneFrame({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-sm rounded-[2.5rem] bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50 shadow-2xl border-8 border-zinc-900 overflow-hidden min-h-[760px] relative">
        <div className="h-7 bg-zinc-900 flex items-center justify-center">
          <div className="w-24 h-2 rounded-full bg-zinc-700" />
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function MainButton({
  icon: Icon,
  children,
  onClick,
  secondary = false,
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl px-4 py-4 flex items-center justify-center gap-2 font-semibold transition active:scale-95 shadow-md ${
        secondary
          ? "bg-white border border-orange-200 text-orange-500"
          : "bg-orange-500 text-white"
      }`}
    >
      {Icon ? <Icon className="w-5 h-5" /> : null}
      {children}
    </button>
  );
}

function CuisineCard({ title, selected, onClick, emoji }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-3xl p-4 text-left border-2 transition shadow-sm active:scale-95 ${
        selected
          ? "border-orange-500 bg-orange-50"
          : "border-zinc-100 bg-white"
      }`}
    >
      <div className="text-3xl mb-3">{emoji}</div>
      <div className="font-bold text-zinc-800">{title}</div>
      <div className="text-sm text-zinc-500 mt-1">點我選擇</div>
    </button>
  );
}

function Wheel({ items, spinning, resultIndex }) {
  const segmentAngle = 360 / items.length;
  const targetRotation = useMemo(() => {
    if (resultIndex === null) return 0;
    const centerAngle =
      resultIndex * segmentAngle + segmentAngle / 2;
    return 360 * 6 + (360 - centerAngle);
  }, [resultIndex, segmentAngle]);

  return (
    <div className="relative flex flex-col items-center justify-center mt-4">
      <div className="w-0 h-0 border-l-[18px] border-r-[18px] border-b-[28px] border-l-transparent border-r-transparent border-b-orange-500 z-20" />
      <motion.div
        animate={{
          rotate: spinning ? targetRotation : targetRotation,
        }}
        transition={{
          duration: spinning ? 3.5 : 0.4,
          ease: [0.17, 0.67, 0.15, 1],
        }}
        className="relative mt-[-2px] w-72 h-72 rounded-full border-[10px] border-orange-200 shadow-xl overflow-hidden"
        style={{
          background: `conic-gradient(
            #fb923c 0deg 72deg,
            #fdba74 72deg 144deg,
            #fed7aa 144deg 216deg,
            #fb923c 216deg 288deg,
            #fdba74 288deg 360deg
          )`,
        }}
      >
        {items.map((item, index) => {
          const angle = index * segmentAngle + segmentAngle / 2;
          return (
            <div
              key={item.name}
              className="absolute left-1/2 top-1/2 origin-center"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              }}
            >
              <div
                className="flex flex-col items-center gap-1"
                style={{
                  transform: `translateY(-98px) rotate(${-angle}deg)`,
                }}
              >
                <div className="text-2xl">{item.emoji}</div>
                <div className="text-xs font-bold text-zinc-800 bg-white/80 px-2 py-1 rounded-full">
                  {item.name}
                </div>
              </div>
            </div>
          );
        })}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white shadow-lg border-4 border-orange-300 flex items-center justify-center text-orange-500 font-black">
          GO
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedCuisine, setSelectedCuisine] =
    useState("中式");
  const [favorites, setFavorites] = useState([]);
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [resultIndex, setResultIndex] = useState(null);

  const currentItems = foodData[selectedCuisine];

  const handleSpin = () => {
    if (spinning) return;
    const index = Math.floor(
      Math.random() * currentItems.length,
    );
    setSpinning(true);
    setResult(null);
    setResultIndex(index);

    setTimeout(() => {
      const chosen = currentItems[index];
      setResult(chosen);
      setSpinning(false);
      setScreen("result");
    }, 3600);
  };

  const addFavorite = () => {
    if (!result) return;
    const exists = favorites.some(
      (item) => item.name === result.name,
    );
    if (!exists) {
      setFavorites([
        ...favorites,
        { ...result, type: selectedCuisine },
      ]);
    }
    setScreen("favorites");
  };

  return (
    <PhoneFrame>
      <div className="text-center mb-4">
        <h1 className="text-2xl font-extrabold text-zinc-900">
          今天想要吃什麼
        </h1>
      </div>

      <AnimatePresence mode="wait">
        {screen === "home" && (
          <motion.div
            key="home"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="pt-8 space-y-5"
          >
            <div className="bg-gradient-to-br from-orange-100 to-rose-100 rounded-3xl p-6 text-center shadow-sm">
              <div className="text-6xl mb-3">🍽️</div>
              <h2 className="text-2xl font-black text-zinc-800">
                今天吃什麼？
              </h2>
              <p className="text-sm text-zinc-500 mt-2">
                不知道要吃什麼時，交給轉盤幫你選。
              </p>
            </div>
            <MainButton
              icon={Play}
              onClick={() => setScreen("choose")}
            >
              開始選擇
            </MainButton>
            <MainButton
              icon={Heart}
              secondary
              onClick={() => setScreen("favorites")}
            >
              我的最愛
            </MainButton>
          </motion.div>
        )}

        {screen === "choose" && (
          <motion.div
            key="choose"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-5"
          >
            <div>
              <h2 className="text-xl font-black text-zinc-800">
                條件選擇
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                先選你今天想吃的料理類型
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <CuisineCard
                title="中式"
                emoji="🥢"
                selected={selectedCuisine === "中式"}
                onClick={() => setSelectedCuisine("中式")}
              />
              <CuisineCard
                title="泰式"
                emoji="🌶️"
                selected={selectedCuisine === "泰式"}
                onClick={() => setSelectedCuisine("泰式")}
              />
              <CuisineCard
                title="日式"
                emoji="🍣"
                selected={selectedCuisine === "日式"}
                onClick={() => setSelectedCuisine("日式")}
              />
              <CuisineCard
                title="韓式"
                emoji="🍲"
                selected={selectedCuisine === "韓式"}
                onClick={() => setSelectedCuisine("韓式")}
              />
            </div>
            <div className="bg-orange-50 rounded-2xl p-4 text-sm text-zinc-700">
              已選擇：
              <span className="font-bold text-orange-500">
                {selectedCuisine}
              </span>
            </div>
            <MainButton onClick={() => setScreen("wheel")}>
              進入轉盤
            </MainButton>
          </motion.div>
        )}

        {screen === "wheel" && (
          <motion.div
            key="wheel"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-4"
          >
            <div>
              <h2 className="text-xl font-black text-zinc-800">
                隨機選擇
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                目前類型:{selectedCuisine}
              </p>
            </div>
            <Wheel
              items={currentItems}
              spinning={spinning}
              resultIndex={resultIndex}
            />
            <div className="pt-3">
              <MainButton icon={Play} onClick={handleSpin}>
                開始
              </MainButton>
            </div>
            <button
              onClick={() => setScreen("choose")}
              className="w-full text-sm text-zinc-500 underline underline-offset-4"
            >
              返回重新選類型
            </button>
          </motion.div>
        )}

        {screen === "result" && result && (
          <motion.div
            key="result"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-4"
          >
            <div>
              <h2 className="text-xl font-black text-zinc-800">
                結果出爐
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                今天就吃這個吧！
              </p>
            </div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-3xl overflow-hidden bg-white shadow-lg border border-zinc-100"
            >
              <ImageWithFallback
                src={result.image}
                alt={result.name}
                className="w-full h-20 object-cover"
              />
              <div className="p-3 text-center">
                <div className="text-4xl mb-2">
                  {result.emoji}
                </div>
                <div className="text-2xl font-black text-zinc-800">
                  {result.name}
                </div>
                <div className="text-sm text-zinc-500 mt-1">
                  {selectedCuisine}料理推薦
                </div>
              </div>
            </motion.div>
            <MainButton
              icon={Star}
              onClick={() => setScreen("restaurant")}
            >
              推薦餐廳
            </MainButton>
            
            <MainButton
              icon={RotateCcw}
              onClick={() => setScreen("wheel")}
            >
              再選一次
            </MainButton>
            <MainButton
              icon={Heart}
              secondary
              onClick={addFavorite}
            >
              加入最愛
            </MainButton>
          </motion.div>
        )}

        {screen === "restaurant" && result && (
          <motion.div
           key="restaurant"
           variants={screenVariants}
           initial="initial"
           animate="animate"
           exit="exit"
           className="space-y-4"
         >
           <div>
             <h2 className="text-xl font-black text-zinc-800">
               推薦餐廳
             </h2>

             <p className="text-sm text-zinc-500 mt-1">
               {result.name} 推薦店家
             </p>
           </div>

           <div className="rounded-3xl overflow-hidden bg-white shadow-lg border border-zinc-100">
             <ImageWithFallback
               src={result.image}
               alt={result.name}
               className="w-full h-20 object-cover"
             />

             <div className="p-3 text-center">
               <div className="text-4xl mb-2">
                 {result.emoji}
               </div>

               <div className="text-2xl font-black text-zinc-800">
                 {result.name}
               </div>
             </div>
           </div>

           <div className="space-y-2 max-h-40 overflow-y-auto">
             {(restaurantData[result.name] || []).map(
               (restaurant, index) => (
                 <div
                   key={index}
                   className="rounded-2xl border border-orange-100 bg-orange-50 p-4"
                 >
                   <div className="font-bold text-zinc-800">
                     🍴 {restaurant.name}
                   </div>

                   <div className="text-sm text-zinc-500 mt-1">
                     💰 {restaurant.price}
                   </div>

                   <div className="text-sm text-yellow-500 mt-1">
                     ⭐ {restaurant.rating}
                   </div>
                 </div>
               )
             )}
           </div>

           <MainButton
             icon={RotateCcw}
             onClick={() => setScreen("result")}
           >
             返回結果頁
           </MainButton>

           <MainButton
             icon={Home}
             secondary
             onClick={() => setScreen("home")}
           > 
             返回首頁
           </MainButton>
         </motion.div>
       )}

        {screen === "favorites" && (
          <motion.div
            key="favorites"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-4"
          >
            <div>
              <h2 className="text-xl font-black text-zinc-800">
                我的最愛
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                收藏你想再吃一次的餐點
              </p>
            </div>
            <div className="space-y-3 max-h-[500px] overflow-auto pr-1">
              {favorites.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-orange-200 bg-orange-50 p-8 text-center">
                  <Star className="w-10 h-10 mx-auto text-orange-400 mb-3" />
                  <div className="font-bold text-zinc-700">
                    目前還沒有收藏
                  </div>
                  <div className="text-sm text-zinc-500 mt-1">
                    去轉盤選一個喜歡的餐點吧
                  </div>
                </div>
              ) : (
                favorites.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 rounded-2xl border border-zinc-100 p-3 shadow-sm"
                  >
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-2xl object-cover"
                    />
                    <div className="flex-1 text-left">
                      <div className="font-bold text-zinc-800">
                        {item.name}
                      </div>
                      <div className="text-sm text-zinc-500">
                        {item.type}
                      </div>
                    </div>
                    <Heart className="w-5 h-5 fill-orange-500 text-orange-500" />
                  </div>
                ))
              )}
            </div>
            <MainButton
              icon={Home}
              onClick={() => setScreen("home")}
            >
              返回首頁
            </MainButton>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-5 text-center text-xs text-zinc-400">
        包含：首頁 / 類型選擇 / 轉盤動畫 / 結果頁 / 最愛頁
      </div>
    </PhoneFrame>
  );
}