import type { FilmmakerContent } from './types';
export type { FilmItem, FilmmakerContent } from './types';

export const filmmakerContent: FilmmakerContent = {
  profile: {
    firstName: "LÊ ĐẶNG",
    lastName: "ĐÀI TRANG",
    fullName: "LÊ ĐẶNG ĐÀI TRANG",
    role: "Film Producer",
    tagline: "Connecting creativity and emotion — transforming paper into living cinema.",
    dob: "15. 10. 1991",
    location: "Ho Chi Minh City, Vietnam",
    availability: "Available for Film Productions & Creative Collaborations",
    email: "ledangdaitrang@gmail.com",
    phone: "0935 958 358",
    heroVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    heroPoster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2000&q=85",
    portraitImage: "/images/profile-portrait.jpg",
    storyPillars: [
      "Story about me",
      "Story about film",
      "Story about dream"
    ]
  },

  bio: {
    actLabel: "ACT I — INTRODUCTION",
    heading: "CONNECTING CREATIVITY AND DEEP EMOTION",
    paragraphs: [
      "Since I was young, I've been deeply moved by films that touched my heart, which is why I decided to pursue this passion and make it my career path.",
      "For me, filmmaking is not just a job; it's a journey of transforming ideas in my mind and on paper into vivid, emotional films. It's the connection between creativity and emotion, ensuring that each film can touch the audience's heart. I continue this journey, constantly seeking new stories to tell through the language of cinema, to bring a wide range of emotions to viewers and share these stories with as many people as possible."
    ],
    highlightWords: [
      "deeply moved",
      "pursue this passion",
      "career path",
      "journey of transforming ideas",
      "vivid, emotional films",
      "creativity and emotion",
      "touch the audience's heart",
      "language of cinema",
      "wide range of emotions"
    ]
  },

  aboutMeDetails: {
    education: [
      {
        institution: "The Stage - Movie University Of Ho Chi Minh City",
        degree: "Trường Đại học Sân khấu - Điện ảnh TP.HCM",
        note: "Specialized Film & Performing Arts Production"
      },
      {
        institution: "Hong Bang International University",
        degree: "Đại học Quốc tế Hồng Bàng",
        note: "Higher Education Degree"
      }
    ],
    languages: [
      "English (Basic)",
      "Vietnamese (Native)"
    ],
    skills: [
      "Script writing",
      "Filming",
      "Photography",
      "Film Editing",
      "3D Drawing with Maya",
      "Using a Drone (Flycam)",
      "Drawing"
    ],
    passport: [
      "USA",
      "Japan",
      "China",
      "Malaysia",
      "Indonesia",
      "Thailand",
      "Cambodia"
    ],
    hobbies: [
      {
        category: "Reading",
        items: "Books, Manga, & Cartoons",
        icon: "BookOpen"
      },
      {
        category: "Sports",
        items: "Badminton & Swimming",
        icon: "Activity"
      },
      {
        category: "Games",
        items: "Chess & Poker",
        icon: "Trophy"
      },
      {
        category: "Lifestyle",
        items: "Traveling & Exploring Cultures",
        icon: "Compass"
      }
    ]
  },

  stats: [
    { value: 5, suffix: "+", label: "Feature Films", description: "Produced & Production Team" },
    { value: 7, suffix: "", label: "Passport Countries", description: "International Experience" },
    { value: 10, suffix: "+", label: "Years of Passion", description: "Dedication to Cinema" },
    { value: 1991, suffix: "", label: "Born 15.10.1991", description: "Producer based in HCMC" },
  ],

  skills: {
    disciplines: [
      "Film Producing",
      "Script Writing",
      "Filming",
      "Photography",
      "Film Editing",
      "3D Drawing with Maya",
      "Using Drone (Flycam)",
      "Concept Drawing"
    ],
    tools: [
      "Autodesk Maya 3D",
      "Drone / Flycam Operations",
      "DaVinci Resolve",
      "Premiere Pro",
      "Cinema Camera Systems",
      "Production Budgeting & Scheduling"
    ]
  },

  films: [
    {
      id: "nham-mat-thay-mua-he",
      index: "01/05",
      title: "NHẮM MẮT THẤY MÙA HÈ",
      year: "2018",
      role: "Producer",
      genre: "Romance · Drama · Indie Feature",
      director: "Cao Bá Dung",
      cast: "Phương Anh Đào, Takafumi Akutsu",
      duration: "98 Min",
      aspectRatio: "2.39:1 CinemaScope",
      thumbnail: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1200&q=80",
      youtubeUrl: "https://www.youtube.com/watch?v=tlNtE3IW6bE",
      videoUrl: "https://www.youtube.com/embed/tlNtE3IW6bE?autoplay=1&mute=0",
      logline: "A young Vietnamese woman travels to the snowy, blooming landscapes of Higashikawa, Hokkaido, searching for her estranged father and discovering heartfelt love.",
      synopsis: "Shot on location in Hokkaido, Japan and Vietnam, 'Nhắm mắt thấy mùa hè' won widespread acclaim as one of the most aesthetically poignant independent films in modern Vietnamese cinema.",
      credits: [
        { label: "Role", value: "Producer / Production Team" },
        { label: "Filming Locations", value: "Higashikawa, Hokkaido (Japan) & Saigon" },
        { label: "Starring", value: "Phương Anh Đào, Takafumi Akutsu" },
        { label: "Release Year", value: "2018" }
      ],
      tools: ["ARRI Alexa", "Hokkaido Winter & Summer Expeditions", "Bilingual Production Crew"],
      laurel: "Audience Favorite · Japanese & Vietnamese Cultural Premiere"
    },
    {
      id: "troi-sang-roi-ta-ngu-di-thoi",
      index: "02/05",
      title: "TRỜI SÁNG RỒI TA NGỦ ĐI THÔI",
      year: "2019",
      role: "Producer",
      genre: "Indie Musical Drama · Youth Romance",
      director: "Chung Chí Công",
      cast: "Hà Quốc Hoàng, Trần Lê Thúy Vy",
      duration: "102 Min",
      aspectRatio: "1.85:1 Flat",
      thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
      youtubeUrl: "https://www.youtube.com/watch?v=pKE389nMnk8",
      videoUrl: "https://www.youtube.com/embed/pKE389nMnk8?autoplay=1&mute=0",
      logline: "Two wandering souls drift together through an intoxicating night in Saigon, serenading each other with acoustic songs, memories, and vulnerable confessions.",
      synopsis: "A lyrical love letter to Saigon's indie music scene and sleepless youth culture, celebrated for its authentic intimacy and soul-stirring original soundtrack.",
      credits: [
        { label: "Role", value: "Producer / Production Team" },
        { label: "Location", value: "Ho Chi Minh City, Vietnam" },
        { label: "Starring", value: "Hà Quốc Hoàng, Trần Lê Thúy Vy" },
        { label: "Release Year", value: "2019" }
      ],
      tools: ["Live Acoustic Audio Recording", "Nocturnal City Cinematography", "Indie Music Collaborations"],
      laurel: "Celebrated Vietnamese Indie Music Cinema"
    },
    {
      id: "sai-gon-trong-con-mua",
      index: "03/05",
      title: "SÀI GÒN TRONG CƠN MƯA",
      year: "2020",
      role: "Producer",
      genre: "Romance · Music · Youth Drama",
      director: "Lê Minh Hoàng",
      cast: "Avin Lu, Hồ Thu Anh",
      duration: "105 Min",
      aspectRatio: "2.39:1 CinemaScope",
      thumbnail: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1200&q=80",
      youtubeUrl: "https://www.youtube.com/watch?v=Eyju5ODfd-g",
      videoUrl: "https://www.youtube.com/embed/Eyju5ODfd-g?autoplay=1&mute=0",
      logline: "Two ambitious dreamers strive to stay true to their art and to each other under Saigon's relentless, poetic monsoon downpours.",
      synopsis: "Capturing the raw tension between creative aspirations and financial survival, this film portrays the heartbeat of Saigon through evocative rainy visuals and honest emotion.",
      credits: [
        { label: "Role", value: "Producer / Production Team" },
        { label: "Location", value: "Ho Chi Minh City, Vietnam" },
        { label: "Starring", value: "Avin Lu, Hồ Thu Anh" },
        { label: "Release Year", value: "2020" }
      ],
      tools: ["Rain FX & Monsoon Filming", "Sound Design & Original Score", "Urban Realism"],
      laurel: "Official Selection · New Asian Currents & Indie Screenings"
    },
    {
      id: "trai-tim-quai-vat",
      index: "04/05",
      title: "TRÁI TIM QUÁI VẬT",
      year: "2020",
      role: "Producer",
      genre: "Mystery · Psychological Thriller · Crime",
      director: "Tạ Nguyên Hiệp",
      cast: "Hoàng Thùy Linh, B Trần, Hứa Vĩ Văn, Quang Trung",
      duration: "88 Min",
      aspectRatio: "2.39:1 CinemaScope",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      youtubeUrl: "https://www.youtube.com/watch?v=qgVg0xh_ogQ",
      videoUrl: "https://www.youtube.com/embed/qgVg0xh_ogQ?autoplay=1&mute=0",
      logline: "A gruesome murder in an old, crowded tenement plunges a single mother into a treacherous maze of deception, police interrogation, and urban monsters.",
      synopsis: "Produced by WePro Entertainment, 'Trái tim quái vật' delivers a gritty neo-noir atmosphere, unraveling the hidden fractures of human psychology within Vietnam's tight-knit tenements.",
      credits: [
        { label: "Role", value: "Producer / Production Team" },
        { label: "Production House", value: "WePro Entertainment" },
        { label: "Starring", value: "Hoàng Thùy Linh, B Trần, Hứa Vĩ Văn" },
        { label: "Release Year", value: "2020" }
      ],
      tools: ["Tenement Apartment Staging", "Neo-Noir Lighting", "High-Stakes Crime Stunts"],
      laurel: "High-Profile Vietnamese Theatrical Thriller Release"
    },
    {
      id: "giao-lo-8675",
      index: "05/05",
      title: "GIAO LỘ 8675",
      year: "2023",
      role: "Producer",
      genre: "Anthology Adventure · Youth · Action",
      director: "Tân DS",
      cast: "Isaac, Rocker Nguyễn, Lợi Trần, Emma Lê, La Thành",
      duration: "105 Min",
      aspectRatio: "2.39:1 CinemaScope",
      thumbnail: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
      youtubeUrl: "https://www.youtube.com/watch?v=wrOLqdg54Bo",
      videoUrl: "https://www.youtube.com/embed/wrOLqdg54Bo?autoplay=1&mute=0",
      logline: "Three interwoven journeys across scenic landscapes challenge a martial artist, a traveler, and a musician to confront crossroads defining their true destiny.",
      synopsis: "A cinematic odyssey across Vietnam highlighting the martial arts heritage of Binh Dinh, bustling Saigon, and open roads of discovery.",
      credits: [
        { label: "Role", value: "Producer / Production Team" },
        { label: "Locations", value: "Bình Định, TP. Hồ Chí Minh & Regional Vietnam" },
        { label: "Starring", value: "Isaac, Rocker Nguyễn, Lợi Trần, Emma Lê" },
        { label: "Release Year", value: "2023" }
      ],
      tools: ["Martial Arts Choreography", "Multi-Location Drone Cinematography", "Panoramic Road Filmmaking"],
      laurel: "Theatrical Nationwide Release 2023"
    }
  ],

  experiences: [
    {
      period: "2018 — PRESENT",
      role: "Feature Film Producer & Production Coordinator",
      company: "Vietnamese Cinema & Indie Productions",
      location: "Ho Chi Minh City, Vietnam & International",
      description: "Managing full-cycle film production pipelines: turning scripts and concepts into vivid, emotional feature films. Coordinating cross-departmental teams, budgets, and international shoots.",
      achievements: [
        "Produced and contributed to 5 landmark Vietnamese cinema releases across diverse genres.",
        "Executed international multi-unit filming in Hokkaido, Japan for 'Nhắm mắt thấy mùa hè'.",
        "Managed on-set production operations, flycam/drone setups, and post-production workflows."
      ]
    },
    {
      period: "FILMING & PASSPORT",
      role: "Global Filming & Cultural Footprint",
      company: "International Travel & Expeditions",
      location: "USA · Japan · China · Malaysia · Indonesia · Thailand · Cambodia",
      description: "Hands-on experience navigating international film permits, cross-cultural crews, diverse geographies, and global visual storytelling.",
      achievements: [
        "Active passport footprint across 7 countries for research, production, and cultural inspiration.",
        "Bridging international cinema aesthetics with authentic Vietnamese cultural emotion."
      ]
    },
    {
      period: "ACADEMIC FOUNDATION",
      role: "Film & Performing Arts Education",
      company: "The Stage - Movie University Of Ho Chi Minh City",
      location: "TP. Hồ Chí Minh",
      description: "Graduated from Vietnam's prestigious cinema university (Trường Đại học Sân khấu - Điện ảnh TP.HCM) with formal training in film production, scriptwriting, and directing aesthetics.",
      achievements: [
        "Rigorous training in screenplay structure, film history, and cinema production leadership.",
        "Complementary university degree at Hong Bang International University."
      ]
    }
  ],

  awards: [
    { name: "Nhắm mắt thấy mùa hè", year: "2018", category: "Iconic Indie Feature", project: "Hokkaido & Vietnam Premiere" },
    { name: "Trời sáng rồi ta ngủ đi thôi", year: "2019", category: "Indie Musical Cinema", project: "Saigon Nocturne Acclaim" },
    { name: "Sài Gòn trong cơn mưa", year: "2020", category: "Official Selection & Acclaim", project: "Asian Cinema Screenings" },
    { name: "Trái tim quái vật", year: "2020", category: "Nationwide Theatrical Thriller", project: "WePro Entertainment" },
    { name: "Giao lộ 8675", year: "2023", category: "National Theatrical Release", project: "Anthology Road Film" },
  ],

  socials: [
    { name: "Email", url: "mailto:ledangdaitrang@gmail.com", handle: "ledangdaitrang@gmail.com" },
    { name: "Phone", url: "tel:0935958358", handle: "0935 958 358" },
    { name: "Facebook", url: "https://facebook.com", handle: "Lê Đặng Đài Trang" },
    { name: "Instagram", url: "https://instagram.com", handle: "@ledangdaitrang" }
  ],

  creditsClosing: {
    title: "LET'S MAKE SOMETHING UNFORGETTABLE",
    subtitle: "Story about me · Story about film · Story about dream",
    directorText: "PRODUCER: LÊ ĐẶNG ĐÀI TRANG",
    cameraText: "HO CHI MINH CITY · VIETNAM · 15.10.1991",
    yearText: "MMXXVI · CINEMA ARCHIVE"
  }
};

export default filmmakerContent;
