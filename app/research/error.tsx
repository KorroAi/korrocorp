"use client";

export default function ResearchError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="font-display text-2xl font-bold text-[#2D3436] mb-2">Something went wrong</h1>
        <p className="text-sm text-[#636E72] mb-6">An unexpected error occurred while loading the research tool.</p>
        <button
          onClick={reset}
          className="font-display font-semibold text-sm bg-[#FF6B35] text-white px-6 py-3 rounded-xl hover:bg-[#E85D2C] transition"
        >
          Try again
        </button>
        <p className="mt-4 text-xs text-[#636E72]">
          If this keeps happening, please{" "}
          <a href="mailto:contact.korro@gmail.com" className="text-[#FF6B35] underline">contact us</a>.
        </p>
      </div>
    </main>
  );
}
