const baseUrl = import.meta.env.BASE_URL || '/';
const image = (filename: string) => baseUrl.replace(/\/$/, '') + '/images/journey/' + filename;

interface JourneyPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface JourneyYear {
  year: number;
  location: string;
  photos: JourneyPhoto[];
}

export const journeyPortrait = image('portrait.jpg');

export const journeyYears: JourneyYear[] = [
  {
    year: 2015,
    location: 'Thailand',
    photos: [{
      src: image('thailand-2015.png'),
      alt: 'Lê Đặng Đài Trang with pigeons in Thailand, 2015',
      width: 688,
      height: 800,
    }],
  },
  {
    year: 2017,
    location: 'Japan',
    photos: [{
      src: image('japan-2017.png'),
      alt: 'Lê Đặng Đài Trang beneath cherry blossoms in Japan, 2017',
      width: 688,
      height: 800,
    }],
  },
  {
    year: 2019,
    location: 'China',
    photos: [
      {
        src: image('china-2019-snow.png'),
        alt: 'Lê Đặng Đài Trang in the snow in China, 2019',
        width: 688,
        height: 800,
      },
      {
        src: image('china-2019-riverside.png'),
        alt: 'Lê Đặng Đài Trang beside a riverside town in China, 2019',
        width: 688,
        height: 800,
      },
    ],
  },
  {
    year: 2023,
    location: 'USA',
    photos: [{
      src: image('usa-2023.png'),
      alt: 'Lê Đặng Đài Trang at the Statue of Liberty in the USA, 2023',
      width: 688,
      height: 800,
    }],
  },
  {
    year: 2024,
    location: 'Bình Liêu, Vietnam',
    photos: [{
      src: image('binh-lieu-2024.jpg'),
      alt: 'Lê Đặng Đài Trang on a mountain trail in Bình Liêu, Vietnam, 2024',
      width: 669,
      height: 774,
    }],
  },
];
