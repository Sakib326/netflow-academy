"use client";

import { useState } from "react";
import { FaBookOpen, FaCheckCircle, FaPlayCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const lessons = [
  {
    id: 1,
    title: "Introduction",
    items: [
      {
        id: "1-1",
        name: "Welcome & Overview",
        slug: "welcome-overview",
        video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
        completed: true,
      },
      {
        id: "1-2",
        name: "Course Structure",
        slug: "course-structure",
        video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        completed: false,
      },
      {
        id: "1-3",
        name: "Getting Started",
        slug: "getting-started",
        video: "https://www.youtube.com/watch?v=9bZkp7q19f0",
        completed: false,
      },
      {
        id: "1-4",
        name: "Setup & Installation",
        slug: "setup-installation",
        video: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
        completed: false,
      },
      {
        id: "1-5",
        name: "Basic Concepts",
        slug: "basic-concepts",
        video: "https://www.youtube.com/watch?v=l482T0yNkeo",
        completed: false,
      },
      {
        id: "1-6",
        name: "First Project",
        slug: "first-project",
        video: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
        completed: false,
      },
      {
        id: "1-7",
        name: "Understanding UI",
        slug: "understanding-ui",
        video: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
        completed: false,
      },
      {
        id: "1-8",
        name: "Navigation Basics",
        slug: "navigation-basics",
        video: "https://www.youtube.com/watch?v=6Dh-RL__uN4",
        completed: false,
      },
      {
        id: "1-9",
        name: "Common Mistakes",
        slug: "common-mistakes",
        video: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
        completed: false,
      },
      {
        id: "1-10",
        name: "Summary & Next Steps",
        slug: "summary-next-steps",
        video: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    title: "Advanced Concepts",
    items: [
      {
        id: "2-1",
        name: "Deep Dive into Components",
        slug: "deep-dive-components",
        video: "https://www.youtube.com/watch?v=1roy4o4tqQM",
        completed: false,
      },
      {
        id: "2-2",
        name: "State Management",
        slug: "state-management",
        video: "https://www.youtube.com/watch?v=HgzGwKwLmgM",
        completed: false,
      },
      {
        id: "2-3",
        name: "Routing Techniques",
        slug: "routing-techniques",
        video: "https://www.youtube.com/watch?v=kXYiU_JCYtU",
        completed: false,
      },
      {
        id: "2-4",
        name: "Forms & Validation",
        slug: "forms-validation",
        video: "https://www.youtube.com/watch?v=CevxZvSJLk8",
        completed: false,
      },
      {
        id: "2-5",
        name: "API Integration",
        slug: "api-integration",
        video: "https://www.youtube.com/watch?v=uelHwf8o7_U",
        completed: false,
      },
      {
        id: "2-6",
        name: "Error Handling",
        slug: "error-handling",
        video: "https://www.youtube.com/watch?v=09R8_2nJtjg",
        completed: false,
      },
      {
        id: "2-7",
        name: "Performance Optimization",
        slug: "performance-optimization",
        video: "https://www.youtube.com/watch?v=RgKAFK5djSk",
        completed: false,
      },
      {
        id: "2-8",
        name: "Testing Basics",
        slug: "testing-basics",
        video: "https://www.youtube.com/watch?v=OPf0YbXqDm0",
        completed: false,
      },
      {
        id: "2-9",
        name: "Deployment Strategies",
        slug: "deployment-strategies",
        video: "https://www.youtube.com/watch?v=60ItHLz5WEA",
        completed: false,
      },
      {
        id: "2-10",
        name: "Final Project",
        slug: "final-project",
        video: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
        completed: false,
      },
    ],
  },
  {
    id: 3,
    title: "Intermediate Techniques",
    items: [
      {
        id: "3-1",
        name: "State & Props Deep Dive",
        slug: "state-props-deep-dive",
        video: "https://www.youtube.com/watch?v=2vjPBrBU-TM",
        completed: false,
      },
      {
        id: "3-2",
        name: "Component Lifecycle",
        slug: "component-lifecycle",
        video: "https://www.youtube.com/watch?v=04854XqcfCY",
        completed: false,
      },
      {
        id: "3-3",
        name: "Context API Usage",
        slug: "context-api-usage",
        video: "https://www.youtube.com/watch?v=KQ6zr6kCPj8",
        completed: false,
      },
      {
        id: "3-4",
        name: "Hooks in Depth",
        slug: "hooks-in-depth",
        video: "https://www.youtube.com/watch?v=OPf0YbXqDm0",
        completed: false,
      },
      {
        id: "3-5",
        name: "Conditional Rendering",
        slug: "conditional-rendering",
        video: "https://www.youtube.com/watch?v=6_b7RDuLwcI",
        completed: false,
      },
      {
        id: "3-6",
        name: "Lists & Keys",
        slug: "lists-keys",
        video: "https://www.youtube.com/watch?v=U9BwWKXjVaI",
        completed: false,
      },
      {
        id: "3-7",
        name: "Event Handling",
        slug: "event-handling",
        video: "https://www.youtube.com/watch?v=SlPhMPnQ58k",
        completed: false,
      },
      {
        id: "3-8",
        name: "Styling Components",
        slug: "styling-components",
        video: "https://www.youtube.com/watch?v=CevxZvSJLk8",
        completed: false,
      },
      {
        id: "3-9",
        name: "Higher Order Components",
        slug: "higher-order-components",
        video: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
        completed: false,
      },
      {
        id: "3-10",
        name: "Render Props Pattern",
        slug: "render-props-pattern",
        video: "https://www.youtube.com/watch?v=fRh_vgS2dFE",
        completed: false,
      },
    ],
  },
  {
    id: 4,
    title: "Expert Practices",
    items: [
      {
        id: "4-1",
        name: "Performance Optimization",
        slug: "performance-optimization-expert",
        video: "https://www.youtube.com/watch?v=hT_nvWreIhg",
        completed: false,
      },
      {
        id: "4-2",
        name: "Code Splitting",
        slug: "code-splitting",
        video: "https://www.youtube.com/watch?v=YykjpeuMNEk",
        completed: false,
      },
      {
        id: "4-3",
        name: "Lazy Loading Components",
        slug: "lazy-loading-components",
        video: "https://www.youtube.com/watch?v=60ItHLz5WEA",
        completed: false,
      },
      {
        id: "4-4",
        name: "Memoization Techniques",
        slug: "memoization-techniques",
        video: "https://www.youtube.com/watch?v=3AtDnEC4zak",
        completed: false,
      },
      {
        id: "4-5",
        name: "Custom Hooks",
        slug: "custom-hooks",
        video: "https://www.youtube.com/watch?v=uelHwf8o7_U",
        completed: false,
      },
      {
        id: "4-6",
        name: "Error Boundaries",
        slug: "error-boundaries",
        video: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
        completed: false,
      },
      {
        id: "4-7",
        name: "Advanced Routing",
        slug: "advanced-routing",
        video: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
        completed: false,
      },
      {
        id: "4-8",
        name: "Server-Side Rendering",
        slug: "server-side-rendering",
        video: "https://www.youtube.com/watch?v=9bZkp7q19f0",
        completed: false,
      },
      {
        id: "4-9",
        name: "Static Site Generation",
        slug: "static-site-generation",
        video: "https://www.youtube.com/watch?v=l482T0yNkeo",
        completed: false,
      },
      {
        id: "4-10",
        name: "Security Best Practices",
        slug: "security-best-practices",
        video: "https://www.youtube.com/watch?v=6Dh-RL__uN4",
        completed: false,
      },
    ],
  },
];

const LessionSidebar = () => {
  // allow multiple sections open → array of IDs
  const [openSections, setOpenSections] = useState<number[]>([1]);

  const toggleSection = (id: number) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <aside className="tw:w-full tw:bg-white tw:shadow-md tw:min-h-[85vh]">
      <h2 className="tw:text-lg tw:font-semibold tw:flex tw:items-center tw:gap-2 tw:mb-4 tw:p-3">
        <FaBookOpen /> Course Content
      </h2>

      <ul className="">
        {lessons.map((section) => {
          const isOpen = openSections.includes(section.id);
          return (
            <li
              key={section.id}
              className="tw:bg-[#EFF1F6] tw:border-b tw:border-white"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="tw:w-full tw:flex tw:items-center tw:justify-between tw:p-3 tw:text-left tw:font-medium hover:tw:bg-gray-100"
              >
                {section.title}
                <FiChevronDown
                  className={`tw:transition-transform ${
                    isOpen ? "tw:rotate-180" : ""
                  }`}
                />
              </button>

              {/* Animated Accordion */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.ul
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="tw:pl-6 tw:pr-2 tw:pb-2 tw:space-y-2 tw:overflow-hidden"
                  >
                    {section.items.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="tw:flex tw:items-center tw:gap-2 tw:text-md hover:tw:text-indigo-600 tw:cursor-pointer"
                      >
                        {lesson.completed ? (
                          <FaCheckCircle className="tw:text-green-500" />
                        ) : (
                          <FaPlayCircle className="tw:text-gray-400" />
                        )}
                        <Link
                          href={`/courses/english-for-workplace/lessons/${lesson?.slug}`}
                        >
                          {" "}
                          {lesson.name}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default LessionSidebar;
