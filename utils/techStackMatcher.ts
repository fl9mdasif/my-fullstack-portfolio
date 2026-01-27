import { myTechStacks } from "@/constants";

/**
 * Matches a project technology with the user's tech stack
 * @param projectTech - Technology name from project (case insensitive, may include extensions)
 * @returns Object with iconURL and name if match found, null otherwise
 */
export const matchTechStack = (projectTech: string): { iconURL: string; name: string } | null => {
  if (!projectTech) return null;

  // Normalize the project tech name: lowercase, remove extensions, trim
  const normalizedProjectTech = projectTech
    .toLowerCase()
    .replace(/\.(js|ts|css|html|jsx|tsx)$/i, '') // Remove common extensions
    .replace(/\s+/g, '') // Remove spaces
    .trim();

  // Find matching tech stack
  for (const tech of myTechStacks) {
    // Normalize the tech stack name
    const normalizedTechName = tech.name
      .toLowerCase()
      .replace(/\.(js|ts|css|html|jsx|tsx)$/i, '') // Remove extensions
      .replace(/\s+/g, '') // Remove spaces
      .trim();

    // Check for exact match or partial match
    if (normalizedProjectTech === normalizedTechName ||
        normalizedTechName.includes(normalizedProjectTech) ||
        normalizedProjectTech.includes(normalizedTechName)) {
      return {
        iconURL: tech.iconURL,
        name: tech.name
      };
    }

    // Special cases for common variations
    const techVariations: Record<string, string[]> = {
      'react': ['reactjs', 'react.js', 'reactjs', 'reactnative', 'reactnative'],
      'next': ['nextjs', 'next.js', 'nextjs'],
      'node': ['nodejs', 'node.js', 'nodejs'],
      'express': ['expressjs', 'express.js', 'expressjs'],
      'tailwind': ['tailwindcss', 'tailwind.css', 'tailwindcss'],
      'typescript': ['ts', 'typescript'],
      'javascript': ['js', 'javascript'],
      'mongodb': ['mongo', 'mongodb', 'mongoose'],
      'redux': ['redux', 'reduxtoolkit', 'redux-toolkit'],
      'prisma': ['prisma'],
      'firebase': ['firebase'],
      'mysql': ['mysql'],
      'postgresql': ['postgres', 'postgresql']
    };

    // Check if the normalized project tech matches any variation
    for (const [baseTech, variations] of Object.entries(techVariations)) {
      if (variations.includes(normalizedProjectTech) && normalizedTechName === baseTech) {
        return {
          iconURL: tech.iconURL,
          name: tech.name
        };
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
export const getTechStackIcons = (projectTechs: string[]): Array<{ iconURL: string; name: string }> => {
  if (!Array.isArray(projectTechs)) return [];

  return projectTechs
    .map(tech => matchTechStack(tech))
    .filter((match): match is { iconURL: string; name: string } => match !== null);
};