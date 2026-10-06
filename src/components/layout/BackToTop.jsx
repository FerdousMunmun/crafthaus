"use client";

export default function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center border border-[#dedbd4] bg-[#f8f7f4] text-lg text-[#24302b] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#b8895b] hover:text-white"
    >
      ↑
    </button>
  );
}