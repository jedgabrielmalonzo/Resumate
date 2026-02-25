export interface ResumeTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  sections: string[];
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'classic',
    name: 'Classic Resume',
    category: 'General',
    description: 'A clean, traditional resume template suitable for most entry-level jobs.',
    sections: ['Contact Information', 'Objective', 'Education', 'Experience', 'Skills', 'References'],
  },
  {
    id: 'modern',
    name: 'Modern Resume',
    category: 'General',
    description: 'A modern template with a focus on skills and achievements, ideal for recent graduates.',
    sections: ['Contact Information', 'Summary', 'Skills', 'Education', 'Projects', 'Experience'],
  },
  {
    id: 'it',
    name: 'IT Graduate Resume',
    category: 'IT',
    description: 'A template tailored for IT or Computer Science graduates, highlighting technical skills and projects.',
    sections: ['Contact Information', 'Profile', 'Technical Skills', 'Education', 'Projects', 'Experience', 'Certifications'],
  },
];
