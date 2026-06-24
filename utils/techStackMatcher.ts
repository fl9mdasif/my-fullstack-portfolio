import { myTechStacksByCategory } from "@/constants";

// Flatten all items from all categories into a single array for matching
const allTechItems = myTechStacksByCategory.flatMap((group) => group.items);

/**
 * Matches a project technology with the user's tech stack
 * @param projectTech - Technology name from project (case insensitive, may include extensions)
 * @returns Object with iconURL and name if match found, null otherwise
 */
export const matchTechStack = (projectTech: string): { iconURL: string; name: string } | null => {
  if (!projectTech) return null;

  const normalizedProjectTech = projectTech
    .toLowerCase()
    .replace(/\.(js|ts|css|html|jsx|tsx)$/i, "")
    .replace(/\s+/g, "")
    .trim();

  const techVariations: Record<string, string[]> = {
    react: ["reactjs", "react.js", "reactnative"],
    next: ["nextjs", "next.js"],
    node: ["nodejs", "node.js"],
    express: ["expressjs", "express.js"],
    tailwind: ["tailwindcss", "tailwind.css"],
    typescript: ["ts"],
    javascript: ["js"],
    mongodb: ["mongo"],
    mongoose: ["mongoose"],
    redux: ["reduxtoolkit", "redux-toolkit"],
    prisma: ["prismaorm"],
    postgresql: ["postgres"],
  };

  for (const tech of allTechItems) {
    const normalizedTechName = tech.name
      .toLowerCase()
      .replace(/\.(js|ts|css|html|jsx|tsx)$/i, "")
      .replace(/\s+/g, "")
      .trim();

    // Exact or partial match
    if (
      normalizedProjectTech === normalizedTechName ||
      normalizedTechName.includes(normalizedProjectTech) ||
      normalizedProjectTech.includes(normalizedTechName)
    ) {
      return { iconURL: tech.iconURL, name: tech.name };
    }

    // Variation match
    for (const [baseTech, variations] of Object.entries(techVariations)) {
      if (
        variations.includes(normalizedProjectTech) &&
        normalizedTechName === baseTech
      ) {
        return { iconURL: tech.iconURL, name: tech.name };
      }
    }
  }

  return null;
};

/**
 * Get tech stack icons for an array of project technologies
 * @param projectTechs - Array of technology names from project
 * @returns Array of matched tech stack objects with icons
 */
export const getTechStackIcons = (
  projectTechs: string[]
): Array<{ iconURL: string; name: string }> => {
  if (!Array.isArray(projectTechs)) return [];

  return projectTechs
    .map((tech) => matchTechStack(tech))
    .filter((match): match is { iconURL: string; name: string } => match !== null);
};

/**
 * Clean text by removing newlines and normalizing whitespace
 * @param text - Text to clean
 * @returns Cleaned text suitable for paragraph display
 */
export const cleanDescription = (text: string): string => {
  if (!text) return "";
  return text
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};