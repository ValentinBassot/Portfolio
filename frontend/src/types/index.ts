export interface UserProfile {
  name: string;
  role: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'IA' | 'Cyber' | 'Data' | 'Web';
  technologies: string[];
  link?: string;
  image?: string;
}

export interface LinkedInPost {
  id: string;
  content: string;
  date: string;
  url: string;
  tags: string[];
}

export interface Technology {
  id: string;
  name: string;
  logoUrl: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: 'Meetup' | 'Hackathon' | 'Conference' | 'Experience' | 'Competition' | 'Volunteering';
}
