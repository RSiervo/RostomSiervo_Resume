
export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  description: string;
}

export interface Reference {
  name: string;
  position: string;
  phone: string;
  email: string;
}

export interface ResumeData {
  name: string;
  title: string;
  profilePicture?: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  references: Reference[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
