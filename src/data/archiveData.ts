import type { FilmCategory, FilmItem } from './types';

const BASE_URL = import.meta.env.BASE_URL || '/';
const asset = (path: string) => `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

type ArchiveSeed = {
  id: string;
  title: string;
  category: FilmCategory;
  sourceUrl?: string;
  image: string;
  year?: string;
  author?: string;
  youtubeId?: string;
  videoPath?: string;
};

const seeds: ArchiveSeed[] = [
  { id: 'ngay-cua-cha', title: 'PHIM ÂM NHẠC CHO NGÀY CỦA CHA', category: 'short-film', sourceUrl: 'https://www.youtube.com/watch?v=PpZVVY70Bok', image: 'short-ngay-cua-cha.jpg', youtubeId: 'PpZVVY70Bok', author: 'Generali Vietnam' },
  { id: 'song-nhu-y-tet-2020', title: 'SỐNG NHƯ Ý — TẾT 2020', category: 'short-film', sourceUrl: 'https://www.youtube.com/watch?v=oRUbmW7UaQI', image: 'short-song-nhu-y-2020.jpg', year: '2020', youtubeId: 'oRUbmW7UaQI', author: 'Generali Vietnam' },
  { id: 'song-nhu-y-tet-2021', title: 'SỐNG NHƯ Ý — TẾT 2021', category: 'short-film', sourceUrl: 'https://www.youtube.com/watch?v=aKfPg0LN_2o&t=3s', image: 'short-song-nhu-y-2021.jpg', year: '2021', youtubeId: 'aKfPg0LN_2o', author: 'Generali Vietnam' },
  { id: 'chang-can-nhu-ai', title: 'CHẲNG CẦN NHƯ AI, CHỈ CẦN NHƯ Ý', category: 'short-film', sourceUrl: 'https://www.youtube.com/watch?v=9Sy3Nb7At-g', image: 'short-chi-can-nhu-y.jpg', youtubeId: '9Sy3Nb7At-g', author: 'Generali Vietnam' },
  { id: 'tua-vao-nhau', title: 'TỰA VÀO NHAU CHO ĐỜI NHƯ Ý', category: 'short-film', sourceUrl: 'https://www.youtube.com/watch?v=lOXr746d0MY', image: 'short-tua-vao-nhau.jpg', youtubeId: 'lOXr746d0MY', author: 'Generali Vietnam' },
  { id: 'cung-con-kham-pha', title: 'CÙNG CON KHÁM PHÁ MỌI ƯỚC MƠ', category: 'short-film', sourceUrl: 'https://www.youtube.com/watch?v=OqYap_DSxNc', image: 'short-cung-con-kham-pha.jpg', youtubeId: 'OqYap_DSxNc', author: 'TH Official Channel' },
  { id: 'hoa-hong-no-muon', title: 'HOA HỒNG NỞ MUỘN', category: 'short-film', sourceUrl: 'https://www.youtube.com/watch?v=jZui_9c6UO8', image: 'short-hoa-hong-no-muon.jpg', year: '2022', youtubeId: 'jZui_9c6UO8', author: 'Ensure Gold Vietnam' },
  { id: 'me-ve-voi-con', title: 'MẸ VỀ VỚI CON', category: 'short-film', sourceUrl: 'https://www.youtube.com/watch?v=E6slLdeexSM', image: 'short-me-ve-voi-con.jpg', year: '2023', youtubeId: 'E6slLdeexSM', author: 'Ensure Gold Vietnam' },

  { id: 'hack-tet-mon-ngon', title: 'HACK TẾT — MÓN NGON LÀM GỌN', category: 'tvc', sourceUrl: 'https://www.youtube.com/watch?v=o1fJXQAl6cs', image: 'tvc-hack-tet-mon-ngon.jpg', year: '2023', youtubeId: 'o1fJXQAl6cs', author: 'Miu Lê Official' },
  { id: 'hack-tet-truyen-thong', title: 'HACK TẾT — MÓN TRUYỀN THỐNG, SỐNG HIỆN ĐẠI', category: 'tvc', sourceUrl: 'https://www.youtube.com/watch?v=l2ZkuSeBp_I', image: 'tvc-hack-tet-truyen-thong.jpg', year: '2023', youtubeId: 'l2ZkuSeBp_I', author: 'Miu Lê Official' },
  { id: 'vi-tuoi-toi-chon', title: 'VỊ TƯƠI TÔI CHỌN', category: 'tvc', sourceUrl: 'https://www.youtube.com/watch?v=2ct1Vfd3ss4', image: 'tvc-vi-tuoi-toi-chon.jpg', youtubeId: '2ct1Vfd3ss4', author: 'Barona' },
  { id: 'nivea-silver-protect', title: 'NIVEA MEN SILVER PROTECT', category: 'tvc', sourceUrl: 'https://www.youtube.com/watch?v=XlP1VJ1wTfE', image: 'tvc-nivea-silver-protect.jpg', youtubeId: 'XlP1VJ1wTfE', author: 'NIVEA MEN Vietnam' },
  { id: 'vita-dau-tu-nhu-y', title: 'VITA — ĐẦU TƯ NHƯ Ý', category: 'tvc', sourceUrl: 'https://www.youtube.com/watch?v=n_LU8pyX_cQ', image: 'tvc-vita-dau-tu-nhu-y.jpg', youtubeId: 'n_LU8pyX_cQ', author: 'Generali Vietnam' },
  { id: 'khat-vong-viet-nam', title: 'KHÁT VỌNG VÌ MỘT VIỆT NAM MAI SAU', category: 'tvc', sourceUrl: 'https://www.youtube.com/watch?v=RYXggnG8alo', image: 'tvc-khat-vong-viet-nam.jpg', youtubeId: 'RYXggnG8alo', author: 'One Mount' },
  { id: 'hay-yeu-nhau-di', title: 'HÃY YÊU NHAU ĐI CHO ĐỜI NHƯ Ý', category: 'tvc', sourceUrl: 'https://www.youtube.com/watch?v=T0eUu5ILzx0', image: 'tvc-hay-yeu-nhau-di.jpg', youtubeId: 'T0eUu5ILzx0', author: 'Generali Vietnam' },
  { id: 'song-nhu-y-bumper', title: 'SỐNG NHƯ Ý — BUMPER ADS', category: 'tvc', sourceUrl: 'https://www.youtube.com/watch?v=pXUtNmJS4vs', image: 'tvc-song-nhu-y-bumper.jpg', youtubeId: 'pXUtNmJS4vs', author: '30 Pictures' },

  { id: 'bay-ngot-ngao-house-rules', title: 'BẪY NGỌT NGÀO — HOUSE RULES', category: 'house-rule', sourceUrl: 'https://www.youtube.com/watch?v=ibLDjoFT8zk', image: 'house-rule-bay-ngot-ngao.jpg', year: '2022', youtubeId: 'ibLDjoFT8zk', author: 'CJ ENM Vietnam' },
  { id: 'bo-gia-house-rule', title: 'BỐ GIÀ — HOUSE RULE', category: 'house-rule', sourceUrl: 'https://www.youtube.com/watch?v=omw7O1X4CNA', image: 'house-rule-bo-gia.jpg', year: '2021', youtubeId: 'omw7O1X4CNA', author: 'Galaxy Studio' },

  { id: 'all-eyes-on-us', title: 'ALL EYES ON US', category: 'mv', sourceUrl: 'https://www.youtube.com/watch?v=nxTzWhDwv_Y', image: 'mv-all-eyes-on-us.jpg', year: '2025', youtubeId: 'nxTzWhDwv_Y', author: 'Vie Channel' },
  { id: 'muc-ha-vo-nhan', title: 'MỤC HẠ VÔ NHÂN', category: 'mv', sourceUrl: 'https://www.youtube.com/watch?v=FikdKWos-NQ', image: 'mv-muc-ha-vo-nhan.jpg', youtubeId: 'FikdKWos-NQ', author: 'SOOBIN · Binz · NSND Huỳnh Tú' },
  { id: 'yeu-thuong-tiep-noi', title: 'YÊU THƯƠNG TIẾP NỐI', category: 'mv', sourceUrl: 'https://www.youtube.com/watch?v=8fXOfDX2RZQ', image: 'mv-yeu-thuong-tiep-noi.jpg', year: '2022', youtubeId: '8fXOfDX2RZQ', author: 'Mỹ Tâm · Phan Mạnh Quỳnh · ZaloPay' },

  { id: 'ai-film-260710', title: 'AI FILM — 260710', category: 'ai-film', image: 'ai-film-poster.svg', year: '2026', videoPath: '/videos/ai-film.mp4', author: 'Lê Đặng Đài Trang' },
];

const categoryGenre: Record<FilmCategory, string> = {
  movie: 'Feature Film',
  'short-film': 'Short Film',
  tvc: 'Commercial Film',
  'house-rule': 'House Rule',
  mv: 'Music Video',
  'ai-film': 'AI Film',
};

export const archiveFilms: FilmItem[] = seeds.map((item) => ({
  id: item.id,
  index: '',
  title: item.title,
  category: item.category,
  year: item.year ?? 'Archive',
  role: 'Production',
  genre: categoryGenre[item.category],
  duration: item.videoPath ? '50 Sec' : 'Watch online',
  aspectRatio: item.videoPath ? '3:4 Vertical' : '16:9',
  thumbnail: asset(`/images/${item.image}`),
  youtubeUrl: item.youtubeId ? item.sourceUrl : undefined,
  sourceUrl: item.sourceUrl,
  videoUrl: item.youtubeId ? `https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=0` : item.videoPath ? asset(item.videoPath) : undefined,
  mediaType: item.videoPath ? 'local-video' : 'youtube',
  logline: `${item.title} — a selected work from the filmmaking archive.`,
  synopsis: `Official work presented by ${item.author ?? 'the production team'}. Open the original source to watch the complete film and production details.`,
  director: item.author ?? 'Production team',
  cast: 'See official credits',
  credits: [],
  tools: [],
  laurel: item.author,
}));
