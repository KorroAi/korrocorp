import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LegalPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-24">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold text-[#2D3436] mb-2">Legal</h1>
        <p className="text-sm text-[#636E72] mb-12">Last updated: July 18, 2026</p>

        <section className="mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#2D3436] mb-4">1. Intellectual Property</h2>
          <div className="space-y-3 text-[#636E72] leading-relaxed">
            <p>All content, software, algorithms, designs, text, graphics, logos, and code on this website and in our products are the exclusive intellectual property of <strong>Korrocorp</strong> and are protected by international copyright, trademark, and trade secret laws.</p>
            <p><strong>Korroresearch</strong>, <strong>Korromarket</strong>, <strong>Onklaud 5</strong>, <strong>Mue X</strong>, <strong>Drunk-Claude</strong>, and all associated technologies are proprietary systems owned and operated by Korrocorp.</p>
            <p>&copy; {new Date().getFullYear()} Korrocorp. All rights reserved.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#2D3436] mb-4">2. Software License</h2>
          <div className="space-y-3 text-[#636E72] leading-relaxed">
            <p>Our open-source repositories are distributed under the <strong>GNU Affero General Public License v3.0 (AGPL-3.0)</strong>. This license requires that any modified version of our software that is used to provide a service over a network must make the complete source code available to users of that service.</p>
            <p>The AGPL-3.0 license specifically protects against:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Using our code to build competing SaaS products without releasing source code</li>
              <li>Incorporating our technology into proprietary closed-source systems</li>
              <li>Distributing modified versions without preserving the same freedoms</li>
            </ul>
            <p>Full license text: <a href="https://www.gnu.org/licenses/agpl-3.0.html" className="text-[#FF6B35] underline" target="_blank" rel="noopener">GNU AGPL-3.0</a></p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#2D3436] mb-4">3. Terms of Service</h2>
          <div className="space-y-3 text-[#636E72] leading-relaxed">
            <p>By using Korroresearch, Korromarket, or any Korrocorp service, you agree to these terms:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>No scraping or automated access.</strong> You may not use bots, crawlers, or automated scripts to extract content, data, or functionality from our services without explicit written permission.</li>
              <li><strong>No reverse engineering.</strong> You may not decompile, reverse engineer, disassemble, or attempt to derive the source code of our proprietary systems.</li>
              <li><strong>No resale or redistribution.</strong> You may not resell, sublicense, rent, or lease access to our services or their outputs to third parties.</li>
              <li><strong>Generated content ownership.</strong> Content generated using Korroresearch belongs to you, provided it does not violate these terms or applicable law.</li>
              <li><strong>Fair use limits.</strong> We reserve the right to limit or terminate access for accounts that exceed reasonable usage patterns defined by your plan.</li>
              <li><strong>No illegal use.</strong> Our services may not be used to generate content that is fraudulent, defamatory, harassing, or otherwise illegal.</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#2D3436] mb-4">4. Privacy</h2>
          <div className="space-y-3 text-[#636E72] leading-relaxed">
            <p>We collect minimal data: email (for account management), usage counts (for plan limits), and Stripe-processed payment information (we never see your full card details).</p>
            <p>We do not sell, share, or monetize your data. Your papers, research, and generated content are never used to train models or shared with third parties.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#2D3436] mb-4">5. Liability</h2>
          <div className="space-y-3 text-[#636E72] leading-relaxed">
            <p>Our services are provided "as is" without warranty of any kind. Korrocorp is not liable for any damages arising from the use of our services, including but not limited to: errors in generated content, service interruptions, or data loss.</p>
            <p>Users are responsible for verifying the accuracy of AI-generated content before use in academic, professional, or legal contexts.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#2D3436] mb-4">6. Contact</h2>
          <p className="text-[#636E72] leading-relaxed">For legal inquiries, copyright claims, or permission requests: <a href="mailto:contact.korro@gmail.com" className="text-[#FF6B35] underline">contact.korro@gmail.com</a></p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
