import Nav from "@/components/layout/nav";

import ProjectsHero from "@/features/projects/projects";

export default async function Page() {
  return (
    <>
      <Nav />
      <main className="relative min-h-screen">
        <ProjectsHero />
      </main>
    </>
  );
}
