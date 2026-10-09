export interface FilmProject {
  id: string;
  index: string;
  title: string;
  englishTitle?: string;
  year: string;
  category: string;
  role: string;
  duration: string;
  aspectRatio: string;
  locations: string;
  shortDescription: string;
  fullSynopsis: string;
  director: string;
  castAndCrew: string;
  posterImage: string;
  videoUrl: string;
  youtubeId?: string;
  producerNote?: string;
  highlights: string[];
}

export interface ExperienceItem {
  period: string;
  year: string;
  role: string;
  production: string;
  category: string;
  description: string;
  accomplishment: string;
  highlightWords?: string[];
}

export interface EducationItem {
  institution: string;
  vietnameseName: string;
  specialty: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const PORTFOLIO_DATA = {
  creator: {
    name: "LÊ ĐẶNG ĐÀI TRANG",
    birthDate: "15. 10. 1991",
    role: "Filmmaker & Film Producer",
    location: "Ho Chi Minh City, Vietnam",
    phone: "0935 958 358",
    phoneDisplay: "+84 935 958 358",
    email: "ledangdaitrang@gmail.com",
    tagline: "EVERY FRAME TELLS A STORY.",
    supportingTagline: "Filmmaker. Visual Storyteller. Creative Thinker.",
  },

  heroStories: [
    {
      label: "STORY 01",
      title: "Story About Me",
      description:
        "Born on 15.10.1991 in Vietnam, cinema has been the beating pulse of my life. Driven by an innate curiosity to capture raw human vulnerability on 35mm and digital canvases.",
    },
    {
      label: "STORY 02",
      title: "Story About Film",
      description:
        "Films are living organisms where every light ray, shadow, and silence holds meaning. Not just entertainment, but the profound bridge between inner thought and audience heartbeats.",
    },
    {
      label: "STORY 03",
      title: "Story About Dream",
      description:
        "To craft cinematic works that bridge Vietnamese cultural soul with international film craftsmanship — taking stories from Saigon alleys to Hokkaido sunflower fields and beyond.",
    },
  ],

  philosophy: {
    chapter: "CHAPTER II",
    label: "INTRODUCTION & PHILOSOPHY",
    headline: "MORE THAN WHAT MEETS THE EYE.",
    quote:
      "Since I was young, I've been deeply moved by films that touched my heart, which is why I decided to pursue this passion and make it my career path.",
    mainText:
      "For me, filmmaking is not just a job; it's a journey of transforming ideas in my mind and on paper into vivid, emotional films. It's the connection between creativity and emotion, ensuring that each film can touch the audience's heart.",
    continuationText:
      "I continue this journey, constantly seeking new stories to tell through the language of cinema, to bring a wide range of emotions to viewers and share these stories with as many people as possible.",
  },

  aboutProfile: {
    education: [
      {
        institution: "The Stage - Movie University Of Ho Chi Minh City",
        vietnameseName: "Trường Đại học Sân khấu - Điện ảnh TP.HCM",
        specialty: "Film Directing & Production Arts",
        description:
          "Professional grounding in cinematic storytelling, scriptwriting, dramatic structure, and classical film direction.",
      },
      {
        institution: "Hong Bang International University",
        vietnameseName: "Đại học Quốc tế Hồng Bàng",
        specialty: "Visual Media & Creative Production",
        description:
          "Comprehensive foundation in media project coordination, creative design, and communication arts.",
      },
    ],

    languages: [
      { language: "Vietnamese", level: "Native Proficiency", note: "Mother tongue, poetic scriptwriting & local dialogue nuance" },
      { language: "English", level: "Working Proficiency (Basic)", note: "International crew communication & location coordination" },
    ],

    skills: [
      { name: "Script Writing", category: "Pre-Production", desc: "Story development, emotional narrative arcs & screenplays" },
      { name: "Filming & Directing", category: "Production", desc: "Cinematography, framing, lighting design & talent coordination" },
      { name: "Photography & Stills", category: "Visuals", desc: "High-contrast editorial stills, unit photography & lookbooks" },
      { name: "Film Editing", category: "Post-Production", desc: "Rhythm, pacing, dramatic montage & color workflow" },
      { name: "3D Drawing with Maya", category: "Visual Arts", desc: "Spatial concept modeling, pre-visualization & set design" },
      { name: "Drone Operation (Flycam)", category: "Aerial Cinema", desc: "Dynamic aerial vistas, cinematic crane & tracking maneuvers" },
      { name: "Drawing & Storyboarding", category: "Conceptual", desc: "Hand-drawn shot-by-shot storyboards & scene blocking" },
    ],

    passportCountries: [
      { name: "USA", note: "Cultural exploration & visual research" },
      { name: "Japan", note: "Feature film production in Hokkaido & Tokyo" },
      { name: "China", note: "Cinematic architecture & location scouting" },
      { name: "Malaysia", note: "Regional co-production logistics" },
      { name: "Indonesia", note: "Island landscape cinematography" },
      { name: "Thailand", note: "Post-production & creative film networks" },
      { name: "Cambodia", note: "Heritage documentation & regional travels" },
    ],

    hobbies: [
      {
        title: "Reading",
        items: "Books, Manga & Graphic Novels",
        note: "Cultivating narrative inspiration, visual pacing, and multi-layered character arcs.",
      },
      {
        title: "Sports",
        items: "Badminton & Swimming",
        note: "Physical endurance, rapid reflexes, and calm focus required for demanding production sets.",
      },
      {
        title: "Mind Games",
        items: "Chess & Strategic Poker",
        note: "Patience, tactical foresight, psychology, and probability management in decision-making.",
      },
      {
        title: "Traveling",
        items: "Cross-Border Scouting",
        note: "Immersing in diverse cultures, atmospheres, textures, and untold human tales.",
      },
    ],
  },

  projects: [
    {
      id: "nham-mat-thay-mua-he",
      index: "01",
      title: "Nhắm Mắt Thấy Mùa Hè",
      englishTitle: "Summer In Closed Eyes",
      year: "2018",
      category: "Feature Film / Indie Romance",
      role: "Producer & Production Team",
      duration: "98 min",
      aspectRatio: "2.39:1 Anamorphic",
      locations: "Higashikawa, Hokkaido (Japan) & Da Lat (Vietnam)",
      shortDescription:
        "An internationally acclaimed independent feature shot amidst the sun-drenched sunflower fields of Hokkaido, exploring memory, quiet love, and emotional healing.",
      fullSynopsis:
        "Shot on location in the picturesque photography town of Higashikawa in Hokkaido, Japan, 'Nhắm Mắt Thấy Mùa Hè' follows Ha, a young Vietnamese woman who travels to Japan in search of her estranged father. There she crosses paths with Akira, an introspective Japanese photographer. Together, they embark on a delicate emotional journey where language boundaries dissolve in the quiet beauty of sunflower fields and unspoken longing.",
      director: "Cao Thúy Nhi",
      castAndCrew: "Phương Anh Đào, Takafumi Akutsu, Soul Story",
      posterImage: "/images/nham-mat-thay-mua-he.jpg",
      videoUrl: "https://www.youtube.com/watch?v=1FGBzS6q2-M",
      youtubeId: "1FGBzS6q2-M",
      producerNote:
        "Ghi hình tại thị trấn nhiếp ảnh Higashikawa (Hokkaido) là thử thách logistics khổng lồ khi phải phối hợp nhịp nhàng giữa hai ekip Việt - Nhật, căn đúng mùa hoa hướng dương nở rộ trong tiết trời se lạnh.",
      highlights: [
        "Filmed entirely on location in Hokkaido, Japan",
        "Official selection across multiple international film showcases",
        "Golden Kite Award nominee for Best Cinematography & Actress",
      ],
    },
    {
      id: "troi-sang-roi-ta-ngu-di-thoi",
      index: "02",
      title: "Trời Sáng Rồi Ta Ngủ Đi Thôi",
      englishTitle: "Good Morning and Good Night",
      year: "2019",
      category: "Feature Film / Musical Romance",
      role: "Producer / Production Coordinator",
      duration: "102 min",
      aspectRatio: "16:9 35mm Aesthetic",
      locations: "Saigon (Ho Chi Minh City), Vietnam",
      shortDescription:
        "A poetic nocturnal odyssey through the whispering alleys of Saigon, chronicling two indie musicians confronting art, adulthood, and their vulnerable hearts before dawn.",
      fullSynopsis:
        "Set entirely across one single, transformative night in Saigon, the film follows Vinh, a struggling indie songwriter contemplating giving up music, and Anh, a spirited girl carrying secret emotional scars. Drifting through quiet streets on an old yellow scooter with an acoustic guitar strapped over shoulders, their midnight conversations blossom into an intimate love letter to youth and Saigon's hidden soul.",
      director: "Chung Chí Công",
      castAndCrew: "Hà Quốc Hoàng, Trần Lê Thúy Vy, Phạm Hải Âu",
      posterImage: "/images/troi-sang-roi.jpg",
      videoUrl: "https://www.youtube.com/watch?v=F0fR1Q11X28",
      youtubeId: "F0fR1Q11X28",
      producerNote:
        "Những đêm quay trắng từ 10h đêm đến 5h sáng quanh các ngõ hẻm Sài Gòn, giữ cho không gian tĩnh lặng tuyệt đối để thu âm mộc tiếng guitar và giọng hát live của hai diễn viên.",
      highlights: [
        "100% night shoots capturing authentic vintage Saigon ambiance",
        "Celebrated original soundtrack featuring prominent Vietnamese indie artists",
        "Cult critical acclaim for its raw, unfiltered cinematic naturalism",
      ],
    },
    {
      id: "saigon-trong-con-mua",
      index: "03",
      title: "Sài Gòn Trong Cơn Mưa",
      englishTitle: "Saigon in the Rain",
      year: "2020",
      category: "Feature Film / Urban Melodrama",
      role: "Producer / Production Team",
      duration: "105 min",
      aspectRatio: "2.39:1 CinemaScope",
      locations: "Ho Chi Minh City, Vietnam",
      shortDescription:
        "Under relentless tropical monsoons, two idealistic young dreamers find warmth in each other while navigating the painful trade-offs of artistic passion and harsh realities.",
      fullSynopsis:
        "Vu, an introverted singer-songwriter from Hanoi, meets May, an ambitious and practical Saigon woman, under a sudden downpour at a street shelter. As the monsoon seasons roll across the city, their relationship flourishes alongside the struggles of building a livelihood in a fast-paced metropolis. The film paints an evocative, rain-soaked portrait of youth balancing dreams with practical compromises.",
      director: "Lê Minh Hoàng",
      castAndCrew: "Avin Lu, Hồ Thu Anh, Vũ Hoài Nam",
      posterImage: "/images/saigon-trong-con-mua.jpg",
      videoUrl: "https://www.youtube.com/watch?v=7uV8-wU77vI",
      youtubeId: "7uV8-wU77vI",
      producerNote:
        "Dàn dựng hệ thống giàn mưa nhân tạo quy mô lớn giữa lòng thành phố, kết hợp ánh sáng đèn neon và ống kính anamorphic để tạo nên chất thơ điện ảnh đặc trưng của mùa mưa phương Nam.",
      highlights: [
        "3 Nominations at the 22nd Vietnam Film Festival (Golden Lotus)",
        "Stunning monsoon rain practical effects and rich neon color grading",
        "Featured on Netflix and international film distribution channels",
      ],
    },
    {
      id: "trai-tim-quai-vat",
      index: "04",
      title: "Trái Tim Quái Vật",
      englishTitle: "The Monster Heart",
      year: "2020",
      category: "Feature Film / Psychological Crime Noir",
      role: "Producer / Production Unit",
      duration: "90 min",
      aspectRatio: "2.39:1 Widescreen",
      locations: "Weathered Saigon Tenements, Vietnam",
      shortDescription:
        "A claustrophobic whodunit psychological thriller set inside a decaying apartment building, probing the dark corners of guilt, deception, and maternal desperation.",
      fullSynopsis:
        "When an infamous young resident is found brutally murdered inside an old, dimly lit tenement block in Saigon, single mother Khanh becomes the prime suspect. As an investigation unfolds in the shadowy maze of rusted corridors and flickering staircases, the chilling true nature of everyone in the building is laid bare.",
      director: "Tạ Nguyên Hiệp",
      castAndCrew: "Hoàng Thùy Linh, B Trần, Hứa Vĩ Văn, Quang Huy (WePro)",
      posterImage: "/images/trai-tim-quai-vat.jpg",
      videoUrl: "https://www.youtube.com/watch?v=kYJ0hT9w_1M",
      youtubeId: "kYJ0hT9w_1M",
      producerNote:
        "Hợp tác sản xuất cùng nhà sản xuất Quang Huy (WePro), bối cảnh chung cư cũ chật hẹp đòi hỏi kỹ thuật set design và ánh sáng chiaroscuro tinh vi để tạo không khí ngột ngạt, hồi hộp.",
      highlights: [
        "Gripping neo-noir aesthetic with moody chiaroscuro lighting",
        "Complex multi-character murder mystery narrative structure",
        "Produced in partnership with prestigious studio WePro",
      ],
    },
    {
      id: "giao-lo-8675",
      index: "05",
      title: "Giao Lộ 8675",
      englishTitle: "Intersection 8675",
      year: "2023",
      category: "Feature Film / Anthology & Action-Heritage",
      role: "Producer / Production Management",
      duration: "108 min",
      aspectRatio: "2.39:1 CinemaScope",
      locations: "Binh Dinh, Bac Giang, Ho Chi Minh City",
      shortDescription:
        "An ambitious cinematic anthology traversing Vietnam's majestic landscapes — from ancient martial arts cradles to sun-drenched coastal passes and vibrant metropolitan crossroads.",
      fullSynopsis:
        "Featuring three distinct yet spiritually connected tales of young characters standing at crucial crossroads in their lives. From an undefeated MMA fighter traveling to the cradle of traditional Vietnamese martial arts in Binh Dinh, to an unexpected friendship formed along sweeping coastal highways, 'Giao Lộ 8675' celebrates cultural heritage, courage, and self-discovery.",
      director: "Tân DS",
      castAndCrew: "Isaac, Rocker Nguyễn, Lợi Trần, Emma Lê, La Thành",
      posterImage: "/images/giao-lo-8675.jpg",
      videoUrl: "https://www.youtube.com/watch?v=QZ8k0jH7l34",
      youtubeId: "QZ8k0jH7l34",
      producerNote:
        "Dự án di chuyển xuyên suốt 3 tỉnh thành lớn, điều phối flycam góc rộng và các pha cascadeur võ thuật Bình Định thực tế trên địa hình đèo dốc hiểm trở.",
      highlights: [
        "Filmed on location across three major provinces of Vietnam",
        "High-octane action choreography blended with scenic cultural landscapes",
        "Extensive logistical execution managing stunt teams and multi-unit photography",
      ],
    },
  ],

  experiences: [
    {
      period: "2022 — 2023",
      year: "2023",
      role: "Production Producer & Logistics Management",
      production: "GIAO LỘ 8675 (INTERSECTION 8675)",
      category: "Feature Anthology Film",
      description:
        "Led cross-provincial production operations across Ho Chi Minh City, Binh Dinh, and Bac Giang. Managed multi-unit filming schedules, specialized martial arts stunt coordination, and complex highway permits.",
      accomplishment:
        "Successfully delivered a multi-million dollar production on time across high-risk locations and challenging remote topography.",
      highlightWords: ["Cross-provincial", "Stunt coordination", "Production operations"],
    },
    {
      period: "2020",
      year: "2020",
      role: "Production Team & Set Coordinator",
      production: "SÀI GÒN TRONG CƠN MƯA & TRÁI TIM QUÁI VẬT",
      category: "Urban Drama & Crime Noir Features",
      description:
        "Executed simultaneous dual-feature production responsibilities: oversaw complex artificial monsoon rain rigs across live Saigon traffic for 'Sài Gòn Trong Cơn Mưa', and managed claustrophobic tenement stages for 'Trái Tim Quái Vật'.",
      accomplishment:
        "Coordinated with veteran producer Quang Huy (WePro) and emerging indie directors; maintained zero set disruption during intensive rainfall schedules.",
      highlightWords: ["Monsoon rigs", "WePro partnership", "Tenement stage design"],
    },
    {
      period: "2019",
      year: "2019",
      role: "Production Coordinator",
      production: "TRỜI SÁNG RỒI TA NGỦ ĐI THÔI",
      category: "Indie Musical Feature",
      description:
        "Orchestrated 20+ all-night filming locations across Saigon. Managed guerrilla night-shooting protocols, mobile sound recording synchronization with live acoustic musicians, and vintage vehicle transport.",
      accomplishment:
        "Established an intimate, disturbance-free shooting environment that allowed non-professional lead actors to deliver naturalistic, raw emotional performances.",
      highlightWords: ["All-night shoots", "Acoustic live sound", "Nocturnal Saigon"],
    },
    {
      period: "2017 — 2018",
      year: "2018",
      role: "Producer & Production Lead",
      production: "NHẮM MẮT THẤY MÙA HÈ (SUMMER IN CLOSED EYES)",
      category: "International Indie Feature",
      description:
        "Spearheaded international production logistics in Higashikawa, Hokkaido, Japan. Coordinated cross-cultural bilingual crew (Japanese & Vietnamese), local permits, seasonal weather tracking for sunflower blooming, and international equipment customs.",
      accomplishment:
        "Pioneered a milestone Vietnamese independent film production in Japan that earned both commercial breakout success and prestigious critical accolades.",
      highlightWords: ["Hokkaido production", "Bilingual crew", "Sunflower blooming schedule"],
    },
    {
      period: "2015 — 2017",
      year: "2017",
      role: "Independent Filmmaker & Aerial Cinematographer",
      production: "REGIONAL SHORT FILMS, MUSIC VIDEOS & COMMERCIALS",
      category: "Independent Production & Aerial Cinema",
      description:
        "Directed and filmed experimental short narratives, commercial visual campaigns, and aerial cinematography across Southeast Asia (Thailand, Malaysia, Indonesia, Cambodia) and the United States.",
      accomplishment:
        "Mastered advanced Flycam drone flight cinematography, 3D pre-visualization in Maya, and DaVinci Resolve color pipelines.",
      highlightWords: ["Aerial cinematography", "DaVinci Resolve", "Southeast Asian scouting"],
    },
    {
      period: "2010 — 2014",
      year: "2014",
      role: "Directing & Production Student",
      production: "THE STAGE - MOVIE UNIVERSITY OF HO CHI MINH CITY & HONG BANG UNIV",
      category: "Academic Foundation & Early Short Films",
      description:
        "Completed rigorous formal academic training in film directing, screenplay composition, dramatic theory, and creative project execution. Directed award-winning student short films.",
      accomplishment:
        "Graduated with top marks in graduation directing project; built lifelong relationships with Vietnam's rising generation of indie cinematic visionaries.",
      highlightWords: ["The Stage - Movie University", "Screenplay theory", "Indie foundations"],
    },
  ],

  contact: {
    chapter: "CHAPTER 04",
    label: "FINAL FRAME",
    heading: "LET'S MAKE SOMETHING MEANINGFUL.",
    subheading: "Every great film begins with an honest conversation.",
    location: "Ho Chi Minh City, Vietnam",
    phone: "0935 958 358",
    email: "ledangdaitrang@gmail.com",
    socials: [
      { name: "Email", url: "mailto:ledangdaitrang@gmail.com", label: "ledangdaitrang@gmail.com" },
      { name: "Direct Phone", url: "tel:0935958358", label: "(+84) 0935 958 358" },
      { name: "Vimeo", url: "https://vimeo.com", label: "vimeo.com/daitrang" },
      { name: "YouTube", url: "https://youtube.com", label: "youtube.com/@daitrangfilm" },
      { name: "IMDb", url: "https://imdb.com", label: "imdb.com/name/nm-daitrang" },
    ],
  },
};
