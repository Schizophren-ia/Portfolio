import { filmmakerContent } from './content';
import { archiveFilms } from './archiveData';
import { journeyYears } from './journeyData';
import type { FilmItem, FilmmakerContent } from './types';
import { translateText } from '../i18n/translations';

const vi = (text: string) => translateText('vi', text);

const filmLoglines: Record<string, string> = {
  'nham-mat-thay-mua-he': 'Nhắm mắt thấy mùa hè là hành trình của cô gái tên Hạ (Summer), do Phương Anh Đào thủ vai. Câu chuyện bắt đầu khi Hạ đến thị trấn Higashikawa, Hokkaido, Nhật Bản để tìm cha mình (Công Ninh). Cô khám phá vùng đất phủ tuyết vào mùa hè, nơi cha đã sống suốt một thời gian dài, và tại đây cô gặp chàng trai Nhật Bản Akira (Takafumi Akutsu).',
  'troi-sang-roi-ta-ngu-di-thoi': 'Một nhạc sĩ indie tình cờ gặp một tài xế xe ôm tại Sài Gòn vào một buổi sáng đẹp trời. Họ quyết định dành trọn ngày để lang thang và hát những ca khúc về cuộc sống, những sai lầm đã qua và những ước mơ cháy bỏng trong tim.',
  'sai-gon-trong-con-mua': 'Dưới cơn mưa lất phất của Sài Gòn nhộn nhịp, một chàng nhạc sĩ mơ mộng và một cô gái thực tế, cứng cỏi tình cờ gặp gỡ rồi yêu nhau. Đối mặt với những khó khăn về kinh tế, xã hội, gia đình và tình cảm, họ vẫn chưa tìm được lời đáp cho câu hỏi của chính mình: làm thế nào để sống hạnh phúc?',
  'trai-tim-quai-vat': 'Cùng với người hàng xóm, một phụ nữ bị cáo buộc giết người tìm cách chứng minh mình vô tội.',
  'giao-lo-8675': 'Ba hành trình đan xen qua những vùng đất nên thơ đặt một võ sĩ, một người lữ hành và một nhạc sĩ trước những ngã rẽ quyết định số phận thực sự của họ.',
  'doi-gi-mo-di': 'Không bằng lòng với những gì đang có, một vị Chủ tịch phường mẫu mực, nguyên tắc, cả đời sống và hy sinh vì gia đình, vừa nghỉ hưu đã khao khát mở một chiếc xe xăm hình lưu động. Không được người thân ủng hộ, ông bỏ nhà ra đi và tình cờ gặp một thợ xăm Gen Z bốc đồng, nóng nảy — người sẽ giúp ông thực hiện giấc mơ thời trẻ. Hai con người khác biệt về tuổi tác lẫn tính cách, gắn với nhau bởi món nợ nhưng chẳng mấy hòa hợp, liệu có thể cùng nhau làm nên chuyện?',
  'vu-dieu-tinh-yeu': 'Một phim ngắn khám phá tình yêu và những cảm xúc chưa thành lời qua ngôn ngữ của vũ điệu.',
  'goi-noi-nho-vao-nhung-cuoc-goi': 'Một câu chuyện thương hiệu ngắn về việc giữ kết nối qua những cuộc gọi điện thoại.',
  'con-thuyen-cho-ca-uoc-mo': 'Một phim thương hiệu ngắn kể về ước mơ của những người phụ nữ mưu sinh trên biển.',
  'nguoi-nha-viettel-tammi': 'Câu chuyện gia đình về khoảng cách, sự quan tâm thường ngày và việc dành thời gian để kết nối lại với nhau.',
  'fun-sport-live-your-dream-world-cup-2022': 'Phim chiến dịch World Cup 2022 khuyến khích mọi người theo đuổi niềm đam mê bóng đá.',
};

export function localizeFilm(film: FilmItem): FilmItem {
  return {
    ...film,
    year: vi(film.year),
    genre: vi(film.genre),
    duration: vi(film.duration).replace(/\bMin\b/g, 'phút').replace(/\bSec\b/g, 'giây'),
    aspectRatio: vi(film.aspectRatio),
    director: film.director ? vi(film.director) : undefined,
    cast: film.cast ? vi(film.cast) : undefined,
    logline: filmLoglines[film.id] ?? `${film.title} — một tác phẩm được tuyển chọn trong bộ sưu tập điện ảnh.`,
  };
}

// Shared IDs, assets, dates, sources and the untouched English data remain authoritative.
export const filmmakerContentVi: FilmmakerContent = {
  ...filmmakerContent,
  profile: {
    ...filmmakerContent.profile,
    role: vi(filmmakerContent.profile.role),
    tagline: vi(filmmakerContent.profile.tagline),
    location: vi(filmmakerContent.profile.location),
    availability: vi(filmmakerContent.profile.availability),
    storyPillars: filmmakerContent.profile.storyPillars.map(vi),
  },
  bio: {
    ...filmmakerContent.bio,
    actLabel: vi(filmmakerContent.bio.actLabel),
    heading: 'KẾT NỐI SÁNG TẠO VÀ CẢM XÚC SÂU SẮC',
    paragraphs: [
      'Từ khi còn nhỏ, tôi đã luôn xúc động trước những bộ phim chạm đến trái tim mình. Đó cũng là lý do tôi quyết định theo đuổi đam mê này và chọn điện ảnh làm con đường sự nghiệp.',
      'Với tôi, làm phim không chỉ là một công việc, mà còn là hành trình biến những ý tưởng trong tâm trí và trên trang giấy thành những thước phim sống động, giàu cảm xúc. Đó là sự kết nối giữa sáng tạo và cảm xúc, để mỗi bộ phim đều có thể chạm đến trái tim khán giả. Tôi tiếp tục hành trình ấy, không ngừng tìm kiếm những câu chuyện mới để kể bằng ngôn ngữ điện ảnh, mang đến nhiều cung bậc cảm xúc và chia sẻ chúng với càng nhiều người càng tốt.',
    ],
    highlightWords: ['xúc động', 'đam mê', 'sự nghiệp', 'hành trình', 'sáng tạo', 'cảm xúc', 'trái tim', 'điện ảnh'],
  },
  aboutMeDetails: {
    education: filmmakerContent.aboutMeDetails.education.map((item) => ({ ...item, institution: vi(item.institution), degree: item.degree ? vi(item.degree) : undefined, note: item.note ? vi(item.note) : undefined })),
    languages: filmmakerContent.aboutMeDetails.languages.map(vi),
    skills: filmmakerContent.aboutMeDetails.skills.map(vi),
    passport: filmmakerContent.aboutMeDetails.passport.map(vi),
    hobbies: filmmakerContent.aboutMeDetails.hobbies.map((item) => ({ ...item, category: vi(item.category), items: vi(item.items) })),
  },
  stats: filmmakerContent.stats.map((stat) => ({ ...stat, label: vi(stat.label), description: vi(stat.description) })),
  skills: {
    disciplines: filmmakerContent.skills.disciplines.map(vi),
    tools: filmmakerContent.skills.tools.map(vi),
  },
  films: filmmakerContent.films.map(localizeFilm),
  creditsClosing: {
    ...filmmakerContent.creditsClosing,
    title: 'CÙNG TẠO NÊN ĐIỀU KHÓ QUÊN',
    subtitle: filmmakerContent.profile.storyPillars.map(vi).join(' · '),
    directorText: 'NHÀ SẢN XUẤT: LÊ ĐẶNG ĐÀI TRANG',
    cameraText: 'TP. HỒ CHÍ MINH · VIỆT NAM',
    yearText: 'MMXXVI · TƯ LIỆU ĐIỆN ẢNH',
  },
};

export const archiveFilmsVi = archiveFilms.map(localizeFilm);
export const journeyYearsVi = journeyYears.map((entry) => ({
  ...entry,
  location: vi(entry.location),
  photos: entry.photos.map((photo) => ({ ...photo, alt: vi(photo.alt) })),
}));
