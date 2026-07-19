import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

async function getGitHubStats() {
  try {
    const res = await fetch("https://api.github.com/users/KorroAi", {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "Korrocorp" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("GitHub API error");
    const data = await res.json();
    return { repos: data.public_repos || 9, followers: data.followers || 28 };
  } catch {
    return { repos: 9, followers: 28 };
  }
}

export default async function Home() {
  const gh = await getGitHubStats();
  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero repoCount={gh.repos} followerCount={gh.followers} />
      <Mission />
      <About />
      <Contact />
      <Newsletter />
      <Footer />
    </div>
  );
}
