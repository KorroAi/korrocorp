export default function Footer() {
  return (
    <footer className="py-10 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-3 text-sm text-body/60">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
          <a href="/login" className="hover:text-accent transition-colors font-medium">Sign In</a>
          <span className="text-body/20 hidden sm:inline">|</span>
          <a href="/research" className="hover:text-accent transition-colors">Research</a>
          <span className="text-body/20 hidden sm:inline">|</span>
          <a href="/korromarket" className="hover:text-accent transition-colors">Marketplace</a>
          <span className="text-body/20 hidden sm:inline">|</span>
          <a href="/legal" className="hover:text-accent transition-colors">Legal</a>
          <span className="text-body/20 hidden sm:inline">|</span>
          <a href="https://discord.gg/RSBHHjxnYt" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">Discord</a>
          <span className="text-body/20 hidden sm:inline">|</span>
          <a href="mailto:contact.korro@gmail.com" className="hover:text-ink transition-colors break-all">contact.korro@gmail.com</a>
        </div>
        <div className="flex flex-wrap gap-1 sm:gap-2 justify-center text-xs text-body/40">
          <span>&copy; {new Date().getFullYear()} Korrocorp.</span>
          <span className="hidden sm:inline">All rights reserved.</span>
          <span>Built by AI. Shipped by KORRO.</span>
        </div>
      </div>
    </footer>
  );
}
