import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  Trophy,
  BookOpen,
  Headphones,
  Star,
  RotateCcw,
  Save,
  CheckCircle2,
  XCircle,
  Music2,
  Video,
  Award,
  Sparkles,
  Heart,
  Smile
} from "lucide-react";

// ─────────────────────────────────────────────
// ASSET PATH CONSTANTS
// ─────────────────────────────────────────────
const AUDIO_DIR = "/assets/audio";   // → public/assets/audio/
const VIDEO_DIR = "/assets/video";   // → public/assets/video/

// ─────────────────────────────────────────────
// DATA HEWAN (TOTAL 10 HEWAN)
// ─────────────────────────────────────────────
const animalData = [
  {
    id: 1,
    nama: "Singa",
    emoji: "🦁",
    videoUrl: `${VIDEO_DIR}/lion.mp4`,
    audioUrl: `${AUDIO_DIR}/lion.mp3`,
    fact: "Singa adalah satu-satunya kucing besar yang hidup berkelompok — disebut pride!",
    color: "from-amber-400 via-orange-400 to-yellow-500",
    bgLight: "bg-amber-50",
    border: "border-amber-400",
    badge: "bg-amber-500",
    hoverColor: "hover:bg-amber-500",
    accentColor: "text-amber-600"
  },
  {
    id: 2,
    nama: "Gajah",
    emoji: "🐘",
    videoUrl: `${VIDEO_DIR}/elephant.mp4`,
    audioUrl: `${AUDIO_DIR}/elephant.mp3`,
    fact: "Gajah bisa mengingat jalur menuju sumber air selama puluhan tahun lho!",
    color: "from-sky-400 via-blue-400 to-indigo-500",
    bgLight: "bg-sky-50",
    border: "border-sky-400",
    badge: "bg-sky-500",
    hoverColor: "hover:bg-sky-500",
    accentColor: "text-sky-600"
  },
  {
    id: 3,
    nama: "Katak",
    emoji: "🐸",
    videoUrl: `${VIDEO_DIR}/frog.mp4`,
    audioUrl: `${AUDIO_DIR}/frog.mp3`,
    fact: "Katak menyerap air melalui kulit mereka — jadi mereka tidak perlu minum dengan mulut!",
    color: "from-emerald-400 via-green-400 to-teal-500",
    bgLight: "bg-emerald-50",
    border: "border-emerald-400",
    badge: "bg-emerald-500",
    hoverColor: "hover:bg-emerald-500",
    accentColor: "text-emerald-600"
  },
  {
    id: 4,
    nama: "Burung Hantu",
    emoji: "🦉",
    videoUrl: `${VIDEO_DIR}/owl.mp4`,
    audioUrl: `${AUDIO_DIR}/owl.mp3`,
    fact: "Burung hantu memiliki mata besar yang tidak bisa digerakkan, tapi kepala mereka bisa berputar 270 derajat!",
    color: "from-yellow-600 via-amber-600 to-orange-700",
    bgLight: "bg-amber-50",
    border: "border-amber-500",
    badge: "bg-amber-600",
    hoverColor: "hover:bg-amber-600",
    accentColor: "text-amber-700"
  },
  {
    id: 5,
    nama: "Lumba-lumba",
    emoji: "🐬",
    videoUrl: `${VIDEO_DIR}/dolphin.mp4`,
    audioUrl: `${AUDIO_DIR}/dolphin.mp3`,
    fact: "Lumba-lumba berkomunikasi satu sama lain menggunakan siulan nama unik mereka sendiri!",
    color: "from-cyan-400 via-teal-400 to-blue-500",
    bgLight: "bg-cyan-50",
    border: "border-cyan-400",
    badge: "bg-cyan-500",
    hoverColor: "hover:bg-cyan-500",
    accentColor: "text-cyan-600"
  },
  {
    id: 6,
    nama: "Serigala",
    emoji: "🐺",
    videoUrl: `${VIDEO_DIR}/wolf.mp4`,
    audioUrl: `${AUDIO_DIR}/wolf.mp3`,
    fact: "Lolongan serigala sangat keras dan nyaring, suaranya bisa terdengar sampai jarak 16 kilometer!",
    color: "from-slate-400 via-indigo-400 to-purple-600",
    bgLight: "bg-indigo-50",
    border: "border-indigo-400",
    badge: "bg-indigo-500",
    hoverColor: "hover:bg-indigo-500",
    accentColor: "text-indigo-600"
  },
  {
    id: 7,
    nama: "Berang-berang",
    emoji: "🦫",
    videoUrl: `${VIDEO_DIR}/berang-berang.mp4`,
    audioUrl: `${AUDIO_DIR}/berang-berang.mp3`,
    fact: "Berang-berang adalah insinyur alam rajin! Mereka menumpuk kayu untuk membuat bendungan di sungai.",
    color: "from-orange-400 via-amber-500 to-yellow-600",
    bgLight: "bg-orange-50",
    border: "border-orange-400",
    badge: "bg-orange-600",
    hoverColor: "hover:bg-orange-500",
    accentColor: "text-orange-600"
  },
  {
    id: 8,
    nama: "Anjing",
    emoji: "🐶",
    videoUrl: `${VIDEO_DIR}/anjing.mp4`,
    audioUrl: `${AUDIO_DIR}/anjing.mp3`,
    fact: "Setiap hidung anjing memiliki pola garis unik yang berbeda-beda, persis seperti sidik jari manusia!",
    color: "from-yellow-400 via-amber-400 to-orange-500",
    bgLight: "bg-yellow-50",
    border: "border-yellow-400",
    badge: "bg-yellow-500",
    hoverColor: "hover:bg-yellow-500",
    accentColor: "text-yellow-600"
  },
  {
    id: 9,
    nama: "Kucing",
    emoji: "🐱",
    videoUrl: `${VIDEO_DIR}/kucing.mp4`,
    audioUrl: `${AUDIO_DIR}/kucing.mp3`,
    fact: "Kucing adalah tukang tidur yang hebat! Mereka tidur selama 70% dari seluruh hidup mereka.",
    color: "from-pink-400 via-rose-400 to-red-500",
    bgLight: "bg-pink-50",
    border: "border-pink-400",
    badge: "bg-pink-500",
    hoverColor: "hover:bg-pink-500",
    accentColor: "text-pink-600"
  },
  {
    id: 10,
    nama: "Monyet",
    emoji: "🐒",
    videoUrl: `${VIDEO_DIR}/monyet.mp4`,
    audioUrl: `${AUDIO_DIR}/monyet.mp3`,
    fact: "Monyet sangat pintar bersosialisasi dan menggunakan puluhan suara berbeda untuk mengobrol!",
    color: "from-lime-400 via-green-400 to-emerald-500",
    bgLight: "bg-lime-50",
    border: "border-lime-400",
    badge: "bg-lime-500",
    hoverColor: "hover:bg-lime-500",
    accentColor: "text-lime-600"
  }
];

// ─────────────────────────────────────────────
// LOCAL STORAGE HELPERS
// ─────────────────────────────────────────────
const LS_KEY = "animalKingdomScores";

function getScores() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveScore(entry) {
  const existing = getScores();
  existing.push(entry);
  existing.sort((a, b) => b.score - a.score);
  localStorage.setItem(LS_KEY, JSON.stringify(existing.slice(0, 10))); // simpan top 10 saja
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestion(animals, correctAnimal) {
  const others = shuffle(animals.filter((a) => a.id !== correctAnimal.id)).slice(0, 3);
  return shuffle([correctAnimal, ...others]);
}

// ─────────────────────────────────────────────
// CUSTOM AUDIO HOOK
// ─────────────────────────────────────────────
function useAnimalAudio() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  const playAudio = useCallback((url) => {
    setError(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.onplay = () => setPlaying(true);
    audio.onended = () => setPlaying(false);
    audio.onerror = () => {
      setPlaying(false);
      setError(true);
      setTimeout(() => setError(false), 2500);
    };
    audio.play().catch(() => {
      setPlaying(false);
      setError(true);
      setTimeout(() => setError(false), 2500);
    });
  }, []);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    setPlaying(false);
  }, []);

  useEffect(() => () => stopAudio(), [stopAudio]);

  return { playing, error, playAudio, stopAudio };
}

// ─────────────────────────────────────────────
// ANIMAL MEDIA COMPONENT
// ─────────────────────────────────────────────
function AnimalMedia({ animal, className = "" }) {
  const [videoError, setVideoError] = useState(false);

  if (!videoError) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
        <video
          key={animal.videoUrl}
          src={animal.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoError(true)}
          className="w-full h-full object-cover rounded-2xl border-4 border-white shadow-inner"
          aria-label={`Video animasi ${animal.nama}`}
        />
        <span className="absolute top-3 right-3 flex items-center gap-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full shadow border border-yellow-300 animate-pulse">
          <Video size={12} strokeWidth={2.5} /> LIVE
        </span>
      </div>
    );
  }

  // Fallback: emoji jika video gagal loading
  return (
    <div className={`flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-200 rounded-2xl ${className}`}>
      <span className="text-[110px] sm:text-[130px] drop-shadow-md select-none leading-none animate-bounce-slow">
        {animal.emoji}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
// FLOATING BACKGROUND DECORATIONS
// ─────────────────────────────────────────────
function FloatingEmojis() {
  const items = ["🦁", "🐸", "🐘", "🦋", "🌸", "🌟", "🎈", "🍀", "🐱", "🐶", "✨", "🍎", "🐒", "🥥"];
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      {items.map((emoji, i) => (
        <span
          key={i}
          className="absolute text-3xl opacity-15 select-none"
          style={{
            left: `${(i * 12 + 7) % 94}%`,
            top: `${(i * 15 + 10) % 88}%`,
            animation: `bounce-slow ${3 + (i % 4)}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// NAVIGATION BAR
// ─────────────────────────────────────────────
function NavBar({ active, setActive }) {
  const tabs = [
    { id: "catalog",     label: "Katalog", icon: <BookOpen size={20} /> },
    { id: "quiz",        label: "Kuis",    icon: <Headphones size={20} /> },
    { id: "leaderboard", label: "Skor",    icon: <Trophy size={20} /> },
  ];
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b-4 border-emerald-400 shadow-md">
      <div className="max-w-3xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform" onClick={() => setActive("catalog")}>
          <span className="text-3xl animate-spin" style={{ animationDuration: '6s' }}>🌍</span>
          <span className="font-fredoka font-black text-2xl tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
            Animal Kingdom
          </span>
        </div>
        <div className="flex gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-fredoka font-bold text-sm transition-all duration-300 active:scale-95 shadow-sm
                ${active === t.id
                  ? "bg-emerald-500 text-white shadow-emerald-200 border-b-4 border-emerald-700 scale-105"
                  : "bg-white text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 hover:border-b-4 hover:border-emerald-300"
                }`}
            >
              {t.icon}
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────
// VIEW 1: CATALOG
// ─────────────────────────────────────────────
function Catalog() {
  const [index, setIndex] = useState(0);
  const { playing, error, playAudio, stopAudio } = useAnimalAudio();
  const animal = animalData[index];

  const prev = () => {
    stopAudio();
    setIndex((i) => (i - 1 + animalData.length) % animalData.length);
  };
  const next = () => {
    stopAudio();
    setIndex((i) => (i + 1) % animalData.length);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 gap-6 relative z-10">
      {/* Header */}
      <div className="text-center max-w-md animate-fade-in">
        <span className="bg-emerald-100 text-emerald-800 text-xs font-black uppercase px-3 py-1.5 rounded-full tracking-wider shadow-sm border border-emerald-200">
          🐾 Belajar Mengenal Hewan
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-emerald-800 mt-3 drop-shadow-sm font-fredoka">
          Dunia Hewan
        </h1>
        <p className="text-gray-500 font-bold text-sm mt-1 bg-white/50 inline-block px-3 py-1 rounded-full">
          Hewan ke-{index + 1} dari {animalData.length}
        </p>
      </div>

      {/* Main Container: TV Card + Navigation Arrows */}
      <div className="relative w-full max-w-md flex flex-col items-center animate-fade-in">
        
        {/* Animal Card */}
        <div
          className={`w-full rounded-3xl bg-gradient-to-br ${animal.color} p-2 shadow-2xl transition-all duration-500 transform`}
          key={animal.id}
        >
          <div className="bg-white rounded-2xl overflow-hidden p-3 shadow-inner">
            {/* TV Screen Container */}
            <div className={`relative h-52 sm:h-72 rounded-xl overflow-hidden bg-gradient-to-br ${animal.color} border-4 border-gray-100 shadow-md`}>
              <AnimalMedia animal={animal} className="w-full h-full" />
              
              {/* Dot Indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                {animalData.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { stopAudio(); setIndex(i); }}
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300
                      ${i === index ? "bg-yellow-400 scale-125 shadow border border-white" : "bg-white/60 hover:bg-white"}`}
                    aria-label={`Ke hewan ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Description Area */}
            <div className="p-3 sm:p-5 text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-3xl sm:text-4xl animate-bounce-slow">{animal.emoji}</span>
                <h2 className="text-2xl sm:text-3xl font-fredoka font-black text-gray-800 tracking-tight">
                  {animal.nama}
                </h2>
              </div>

              {/* Speech bubble / Fact box */}
              <div className="relative bg-yellow-50 border-2 border-dashed border-yellow-300 rounded-2xl p-4 mb-4 text-xs sm:text-base font-bold text-gray-700 leading-relaxed shadow-sm">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-300 text-yellow-900 text-xs font-black px-3 py-0.5 rounded-full uppercase">
                  💡 Tahukah Kamu?
                </div>
                <p className="mt-1">{animal.fact}</p>
              </div>

              {/* Sound Action Button */}
              <button
                onClick={() => playing ? stopAudio() : playAudio(animal.audioUrl)}
                className={`w-full flex items-center justify-center gap-3 py-3.5 sm:py-4 rounded-2xl font-fredoka font-black text-base sm:text-xl
                  transition-all duration-300 active:scale-95 shadow-md active:translate-y-1
                  ${error
                    ? "bg-rose-100 text-rose-600 border-2 border-rose-300"
                    : playing
                    ? "bg-amber-400 text-white border-b-4 border-amber-600 animate-pulse"
                    : "bg-emerald-500 text-white border-b-4 border-emerald-700 hover:bg-emerald-600 hover:shadow-emerald-200"
                  }`}
              >
                {error ? (
                  <><XCircle size={20} sm:size={24} strokeWidth={2.5} /> Audio belum siap</>
                ) : playing ? (
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5 mr-2">
                      <span className="sound-bar text-white"></span>
                      <span className="sound-bar text-white"></span>
                      <span className="sound-bar text-white"></span>
                      <span className="sound-bar text-white"></span>
                    </span>
                    <span>Hentikan Suara</span>
                  </div>
                ) : (
                  <><Volume2 size={20} sm:size={24} strokeWidth={2.5} /> Putar Suara {animal.nama}</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Controls (Floating Absolute on desktop/tablet, Flex Row underneath on mobile) */}
        <div className="flex sm:block items-center justify-between w-full mt-4 sm:mt-0 px-4 sm:px-0">
          {/* Left Control */}
          <button
            onClick={prev}
            className="sm:absolute sm:left-[-75px] md:sm:left-[-85px] sm:top-1/2 sm:-translate-y-1/2
              w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-lg border-b-4 border-gray-300 hover:border-emerald-500
              flex items-center justify-center text-emerald-600 hover:bg-emerald-500 hover:text-white
              transition-all duration-300 active:scale-95 hover:scale-110 active:border-b-0 z-30"
            aria-label="Hewan sebelumnya"
          >
            <ChevronLeft size={28} sm:size={36} strokeWidth={3.5} />
          </button>

          {/* Right Control */}
          <button
            onClick={next}
            className="sm:absolute sm:right-[-75px] md:sm:right-[-85px] sm:top-1/2 sm:-translate-y-1/2
              w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-lg border-b-4 border-gray-300 hover:border-emerald-500
              flex items-center justify-center text-emerald-600 hover:bg-emerald-500 hover:text-white
              transition-all duration-300 active:scale-95 hover:scale-110 active:border-b-0 z-30"
            aria-label="Hewan berikutnya"
          >
            <ChevronRight size={28} sm:size={36} strokeWidth={3.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// VIEW 2: QUIZ
// ─────────────────────────────────────────────
const TOTAL_QUESTIONS = 5;

function Quiz({ onFinish }) {
  const [questions] = useState(() => {
    const pool = shuffle(animalData).slice(0, TOTAL_QUESTIONS);
    return pool.map((correct) => ({
      correct,
      options: buildQuestion(animalData, correct),
    }));
  });

  const [qIndex, setQIndex]   = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore]     = useState(0);
  const { playing, error, playAudio, stopAudio } = useAnimalAudio();

  const current   = questions[qIndex];
  const answered  = selected !== null;
  const isCorrect = selected === current.correct.id;

  // Auto-play sound when question changes
  useEffect(() => {
    const timer = setTimeout(() => playAudio(current.correct.audioUrl), 550);
    return () => {
      clearTimeout(timer);
      stopAudio();
    };
  }, [qIndex, current.correct.audioUrl, playAudio, stopAudio]);

  const handleSelect = (animal) => {
    if (answered) return;
    setSelected(animal.id);
    if (animal.id === current.correct.id) {
      setScore((s) => s + 20);
    }
  };

  const handleNext = () => {
    stopAudio();
    if (qIndex + 1 >= TOTAL_QUESTIONS) {
      onFinish(score);
    } else {
      setSelected(null);
      setQIndex((i) => i + 1);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center px-4 py-8 gap-6 relative z-10 animate-fade-in">
      {/* Header Info */}
      <div className="w-full max-w-lg bg-white rounded-3xl p-5 shadow-xl border-b-4 border-emerald-400">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl sm:text-3xl font-fredoka font-black text-emerald-800">
            🎧 Tebak Suara!
          </h1>
          <div className="flex items-center gap-1.5 bg-yellow-400 text-yellow-950 font-black px-4 py-2 rounded-2xl text-sm shadow border border-yellow-300 animate-bounce-slow">
            <Star size={18} fill="currentColor" />
            <span>{score} Poin</span>
          </div>
        </div>
        
        {/* Playful Progress Bar */}
        <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-500"
            style={{ width: `${((qIndex + (answered ? 1 : 0)) / TOTAL_QUESTIONS) * 100}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-400 font-bold">Progress</span>
          <span className="text-xs text-emerald-700 font-black">
            Soal {qIndex + 1} / {TOTAL_QUESTIONS}
          </span>
        </div>
      </div>

      {/* Speaker / Replay Button Card */}
      <div className="w-full max-w-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-1.5 shadow-2xl">
        <div className="bg-white rounded-2.5xl p-6 text-center shadow-inner">
          <p className="text-gray-500 font-black text-sm mb-3">
            Dengarkan suara hewan berikut, lalu pilih jawabannya!
          </p>
          <button
            onClick={() => playing ? stopAudio() : playAudio(current.correct.audioUrl)}
            className={`w-full flex items-center justify-center gap-3 py-4.5 rounded-2xl font-fredoka font-black text-xl
              transition-all duration-300 active:scale-95 shadow-md active:translate-y-0.5
              ${error
                ? "bg-rose-100 text-rose-500 border-2 border-rose-300"
                : playing
                ? "bg-purple-500 text-white border-b-4 border-purple-800 animate-pulse"
                : "bg-indigo-500 text-white border-b-4 border-indigo-800 hover:bg-indigo-600 hover:shadow-indigo-200"
              }`}
          >
            {error ? (
              <><XCircle size={24} /> Audio gagal dimuat</>
            ) : playing ? (
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-0.5 mr-2">
                  <span className="sound-bar text-white"></span>
                  <span className="sound-bar text-white"></span>
                  <span className="sound-bar text-white"></span>
                  <span className="sound-bar text-white"></span>
                </span>
                <span>Mendengarkan…</span>
              </div>
            ) : (
              <><Volume2 size={24} strokeWidth={2.5} /> Putar Ulang Suara</>
            )}
          </button>
        </div>
      </div>

      {/* 2x2 Answer Grid */}
      <div className="w-full max-w-lg grid grid-cols-2 gap-4">
        {current.options.map((animal) => {
          const isThis  = selected === animal.id;
          const isRight = animal.id === current.correct.id;
          
          let cardStyle = "bg-white border-4 border-gray-200 hover:border-emerald-400 hover:shadow-xl hover:-translate-y-1 hover:rotate-1 active:scale-95 cursor-pointer";
          if (answered) {
            if (isRight) {
              cardStyle = "bg-emerald-50 border-4 border-emerald-500 scale-105 shadow-lg shadow-emerald-100 cursor-default animate-bounce-slow";
            } else if (isThis) {
              cardStyle = "bg-rose-50 border-4 border-rose-500 cursor-default opacity-90";
            } else {
              cardStyle = "bg-white border-4 border-gray-100 opacity-50 cursor-default";
            }
          }
          
          return (
            <button
              key={animal.id}
              onClick={() => handleSelect(animal)}
              disabled={answered}
              className={`rounded-3xl overflow-hidden p-2 transition-all duration-300 flex flex-col items-center ${cardStyle}`}
            >
              {/* Card Emojis Container */}
              <div className={`w-full h-32 sm:h-36 flex items-center justify-center rounded-2xl bg-gradient-to-br ${animal.color} shadow-inner`}>
                <span className="text-6xl sm:text-7xl leading-none drop-shadow-md select-none">{animal.emoji}</span>
              </div>
              
              <div className="py-3 px-2 flex items-center justify-center gap-1.5 w-full">
                <span className="font-fredoka font-black text-gray-800 text-base sm:text-lg tracking-tight">
                  {animal.nama}
                </span>
                {answered && isRight  && <CheckCircle2 size={20} className="text-emerald-600" strokeWidth={3} />}
                {answered && isThis && !isRight && <XCircle size={20} className="text-rose-600" strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback Toast & Next Button */}
      {answered && (
        <div className="w-full max-w-lg animate-fade-in-up">
          <div
            className={`rounded-2xl p-4 text-center mb-4 font-fredoka font-black text-lg border-2 shadow-sm
              ${isCorrect 
                ? "bg-emerald-100 text-emerald-800 border-emerald-300" 
                : "bg-rose-100 text-rose-800 border-rose-300"}`}
          >
            {isCorrect ? (
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="text-yellow-500 animate-spin" />
                <span>Luar Biasa! Kamu Benar (+20 poin)</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Smile className="text-rose-500" />
                <span>Oops! Itu adalah suara {current.correct.nama}!</span>
              </div>
            )}
          </div>
          
          <button
            onClick={handleNext}
            className="w-full py-4.5 rounded-2.5xl bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 text-white font-fredoka font-black
              text-xl shadow-lg shadow-emerald-100 border-b-6 border-emerald-700 hover:bg-emerald-600 hover:scale-102 active:scale-98 active:border-b-2 active:translate-y-1 transition-all duration-200
              flex items-center justify-center gap-2"
          >
            {qIndex + 1 >= TOTAL_QUESTIONS ? (
              <><Trophy size={24} strokeWidth={2.5} /> Lihat Hasil Akhir!</>
            ) : (
              <>Lanjut Soal Berikutnya <ChevronRight size={24} strokeWidth={3} /></>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// VIEW 3: LEADERBOARD
// ─────────────────────────────────────────────
function Leaderboard({ finalScore, onPlayAgain }) {
  const [name, setName]   = useState("");
  const [saved, setSaved] = useState(false);
  const [scores, setScores] = useState(getScores);

  const handleSave = () => {
    if (!name.trim()) return;
    const entry = {
      name:  name.trim(),
      score: finalScore ?? 0,
      date:  new Date().toLocaleDateString("id-ID"),
    };
    saveScore(entry);
    setScores(getScores());
    setSaved(true);
  };

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="min-h-[85vh] flex flex-col items-center px-4 py-8 gap-6 relative z-10 animate-fade-in">
      <h1 className="text-4xl font-black text-emerald-800 text-center font-fredoka drop-shadow-sm">
        🏆 Papan Peringkat
      </h1>

      {/* Score input card (only shows if quiz was just finished) */}
      {finalScore !== null && finalScore !== undefined && (
        <div className="w-full max-w-lg bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 rounded-3xl p-1.5 shadow-2xl border-b-6 border-orange-600">
          <div className="bg-white rounded-2.5xl p-6 text-center shadow-inner">
            <span className="text-5xl animate-bounce-slow inline-block mb-1">🎉</span>
            <p className="text-gray-500 font-black text-sm mb-1 uppercase tracking-wider">Kuis Selesai! Skor Kamu</p>
            <p className="text-7xl font-black text-orange-500 font-fredoka drop-shadow-sm mb-1">{finalScore}</p>
            <p className="text-gray-400 font-bold text-xs">Nilai maksimal: {TOTAL_QUESTIONS * 20} poin</p>

            {!saved ? (
              <div className="mt-5 flex flex-col gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  placeholder="Ketik namamu di sini…"
                  maxLength={16}
                  className="w-full border-4 border-orange-200 rounded-2xl px-4 py-3.5 text-center font-fredoka font-black
                    text-gray-800 text-xl focus:outline-none focus:border-orange-500 focus:ring-4
                    focus:ring-orange-100 placeholder-gray-300 transition-all shadow-sm"
                />
                <button
                  onClick={handleSave}
                  disabled={!name.trim()}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-yellow-500 text-white
                    font-fredoka font-black text-xl border-b-4 border-orange-700 shadow-md hover:scale-102 active:scale-98 active:border-b-0 active:translate-y-1
                    transition-all duration-200 flex items-center justify-center gap-2
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:translate-y-0 disabled:border-b-4"
                >
                  <Save size={22} strokeWidth={2.5} /> Simpan Skorku!
                </button>
              </div>
            ) : (
              <div className="mt-5 flex flex-col items-center gap-4 animate-fade-in">
                <div className="flex items-center gap-2 text-emerald-600 font-fredoka font-black text-xl bg-emerald-50 px-5 py-2.5 rounded-full border border-emerald-200">
                  <CheckCircle2 size={24} strokeWidth={3} /> Skor berhasil disimpan!
                </div>
                <button
                  onClick={onPlayAgain}
                  className="flex items-center justify-center gap-2 py-4 px-8 rounded-2.5xl bg-emerald-500 text-white font-fredoka font-black
                    text-xl border-b-4 border-emerald-700 shadow-md hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all"
                >
                  <RotateCcw size={22} strokeWidth={2.5} /> Main Kuis Lagi!
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* High Score List */}
      <div className="w-full max-w-lg bg-white rounded-3xl p-5 shadow-xl border-b-4 border-emerald-400">
        <h2 className="text-2xl font-fredoka font-black text-gray-800 mb-4 flex items-center gap-2">
          <Award size={26} className="text-yellow-500" strokeWidth={2.5} /> Pahlawan Rimba Teratas
        </h2>
        
        {scores.length === 0 ? (
          <div className="bg-emerald-50/50 rounded-2xl p-8 text-center text-gray-400 border-4 border-dashed border-emerald-100">
            <span className="text-5xl inline-block mb-3 animate-pulse">🎮</span>
            <p className="font-bold text-gray-500">Belum ada papan peringkat nih.</p>
            <p className="text-xs text-gray-400 mt-1">Ayo jadilah yang pertama bermain kuis!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {scores.map((entry, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 rounded-2xl px-4 py-3.5 border-2 transition-transform duration-200 hover:scale-102
                  ${i === 0 ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300"
                  : i === 1 ? "bg-gradient-to-r from-gray-50 to-slate-100 border-gray-300"
                  : i === 2 ? "bg-gradient-to-r from-orange-50 to-amber-100 border-orange-200"
                  : "bg-white border-gray-100"}`}
              >
                {/* Ranking Medals / Numbers */}
                <span className="text-3xl w-10 text-center flex-shrink-0 font-fredoka font-black text-gray-400">
                  {medals[i] ?? `${i + 1}`}
                </span>
                
                {/* Player details */}
                <div className="flex-1 min-w-0">
                  <p className="font-fredoka font-black text-gray-800 text-lg truncate flex items-center gap-1.5">
                    {entry.name}
                    {i === 0 && <Heart size={16} className="text-red-500 fill-current animate-pulse" />}
                  </p>
                  {entry.date && <p className="text-xs text-gray-400 font-bold">{entry.date}</p>}
                </div>
                
                {/* Player Score Badge */}
                <div className={`font-fredoka font-black text-2xl px-4 py-1.5 rounded-2xl border-b-4
                  ${i === 0 ? "bg-yellow-400 text-yellow-950 border-yellow-600 shadow-sm"
                  : i === 1 ? "bg-gray-300 text-gray-800 border-gray-500 shadow-sm"
                  : i === 2 ? "bg-orange-300 text-orange-950 border-orange-500 shadow-sm"
                  : "bg-emerald-100 text-emerald-800 border-emerald-300"}`}
                >
                  {entry.score}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Play Again Button (from default leaderboard page view) */}
        {scores.length > 0 && finalScore === undefined && (
          <button
            onClick={onPlayAgain}
            className="mt-5 w-full flex items-center justify-center gap-2 py-4.5 rounded-2.5xl
              bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 text-white font-fredoka font-black text-xl
              border-b-4 border-emerald-700 shadow-lg hover:scale-102 active:scale-98 transition-all duration-200"
          >
            <RotateCcw size={22} strokeWidth={2.5} /> Main Kuis Sekarang!
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ROOT APPLICATION COMPONENT
// ─────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab]     = useState("catalog");
  const [quizFinished, setQuizFinished] = useState(false);
  const [finalScore, setFinalScore]   = useState(null);
  const [quizKey, setQuizKey]         = useState(0);

  const handleQuizFinish = (score) => {
    setFinalScore(score);
    setQuizFinished(true);
    setActiveTab("leaderboard");
  };

  const handlePlayAgain = () => {
    setFinalScore(null);
    setQuizFinished(false);
    setQuizKey((k) => k + 1);
    setActiveTab("quiz");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "quiz" && quizFinished) {
      setFinalScore(null);
      setQuizFinished(false);
      setQuizKey((k) => k + 1);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 pb-12">
      {/* Playful Floating elements background */}
      <FloatingEmojis />
      
      {/* Content wrapper */}
      <div className="relative z-10">
        <NavBar active={activeTab} setActive={handleTabChange} />
        <main className="max-w-3xl mx-auto px-4 mt-4">
          {activeTab === "catalog" && <Catalog />}
          {activeTab === "quiz" && !quizFinished && (
            <Quiz key={quizKey} onFinish={handleQuizFinish} />
          )}
          {activeTab === "leaderboard" && (
            <Leaderboard
              finalScore={quizFinished ? finalScore : undefined}
              onPlayAgain={handlePlayAgain}
            />
          )}
        </main>
      </div>
    </div>
  );
}