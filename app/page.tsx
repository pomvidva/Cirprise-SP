"use client";

import { useState } from "react";
import ProjectCard from "@/components/ui/Project_card";
import SearchBar from "@/components/ui/SearchBar";

// Temporary sample data — later this comes from the backend.
const sampleProjects = [
  {
    id: 1,
    taskType: "Online task",
    title: "Research Study",
    description:
      "We look forward to having you participate! Only the following devices are permitted for this study: Computer",
    amount: 10,
    currency: "USD",
    duration: "10 min",
    date: "Jul 14, 2026",
  },
  {
    id: 2,
    taskType: "Online task",
    title: "Mobile App Feedback",
    description:
      "Share your thoughts on a new shopping app. Only the following devices are permitted: Smartphone",
    amount: 25,
    currency: "USD",
    duration: "20 min",
    date: "Jul 15, 2026",
  },
  {
    id: 3,
    taskType: "Interview",
    title: "UX Research Interview",
    description:
      "A short one-on-one interview about your daily browsing habits. Video call required.",
    amount: 60,
    currency: "USD",
    duration: "45 min",
    date: "Jul 18, 2026",
  },
];

export default function ProjectsPage() {
  // State: what the user has typed, and the toggle value.
  const [search, setSearch] = useState("");
  const [eligibleOnly, setEligibleOnly] = useState(false);

  // Filter the list by the search text (matches title or description).
  const filteredProjects = sampleProjects.filter((project) => {
    const query = search.toLowerCase();
    return (
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query)
    );
  });

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Search + filter row */}
        <div className="mb-6">
          <SearchBar
            searchValue={search}
            onSearchChange={setSearch}
            eligibleOnly={eligibleOnly}
            onEligibleToggle={setEligibleOnly}
            onFilterClick={() => console.log("Filter clicked")}
            onSortClick={() => console.log("Sort clicked")}
          />
        </div>

        <h1 className="mb-6 text-xl font-bold text-gray-900">
          Available projects
        </h1>

        {/* Project list */}
        <div className="space-y-4">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                taskType={project.taskType}
                title={project.title}
                description={project.description}
                amount={project.amount}
                currency={project.currency}
                duration={project.duration}
                date={project.date}
                onNotInterested={() =>
                  console.log("Not interested:", project.title)
                }
              />
            ))
          ) : (
            <p className="py-12 text-center text-sm text-gray-500">
              No projects match your search.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}