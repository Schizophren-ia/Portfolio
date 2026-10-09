export interface FilmItem {
  id: string;
  index: string;
  title: string;
  year: string;
  role: string;
  genre: string;
  duration: string;
  aspectRatio: string;
  thumbnail: string;
  videoUrl: string;
  youtubeUrl?: string;
  logline: string;
  synopsis: string;
  director?: string;
  cast?: string;
  credits: { label: string; value: string }[];
  tools: string[];
  laurel?: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
}

export interface AwardItem {
  name: string;
  year: string;
  category: string;
  project: string;
}

export interface SocialItem {
  name: string;
  url: string;
  handle: string;
}

export interface EducationItem {
  institution: string;
  degree?: string;
  note?: string;
}

export interface HobbyItem {
  category: string;
  items: string;
  icon?: string;
}

export interface FilmmakerContent {
  profile: {
    firstName: string;
    lastName: string;
    fullName: string;
    role: string;
    tagline: string;
    dob: string;
    location: string;
    availability: string;
    email: string;
    phone: string;
    heroVideo: string;
    heroPoster: string;
    portraitImage: string;
    storyPillars: string[];
  };
  bio: {
    actLabel: string;
    heading: string;
    paragraphs: string[];
    highlightWords: string[];
  };
  aboutMeDetails: {
    education: EducationItem[];
    languages: string[];
    skills: string[];
    passport: string[];
    hobbies: HobbyItem[];
  };
  stats: {
    value: number;
    suffix: string;
    label: string;
    description: string;
  }[];
  skills: {
    disciplines: string[];
    tools: string[];
  };
  films: FilmItem[];
  experiences: ExperienceItem[];
  awards: AwardItem[];
  socials: SocialItem[];
  creditsClosing: {
    title: string;
    subtitle: string;
    directorText: string;
    cameraText: string;
    yearText: string;
  };
}
