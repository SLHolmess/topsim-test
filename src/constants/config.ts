import { iconNguHanh } from "../assets/images/icons";
import logo from "../assets/images/logo";

export const HEAD_NUMBER = [
  "098",
  "097",
  "096",
  "086",
  "039",
  "038",
  "037",
  "036",
  "035",
  "034",
  "033",
  "032",
  "094",
  "091",
  "088",
  "085",
  "084",
  "083",
  "082",
  "081",
  "093",
  "090",
  "089",
  "079",
  "078",
  "077",
  "076",
  "070",
  "092",
  "058",
  "056",
  "099",
  "059",
  "087",
];

export const viettelHead = /^(086|096|097|098|039|038|037|036|035|034|033|032)/;

export const vinaphoneHead = /^(091|094|088|083|084|085|081|082)/;

export const mobifoneHead = /^(070|079|077|076|078|089|090|093)/;

export const vietnamobileHead = /^(092|052|056|058)/;

export const gMobileHead = /^(099|059)/;

export const iTelHead = /^(087)/;

export const maybanHead = /^(024)/;

export const filterPrice = [
  {
    id: "0",
    label: "< 500k",
    category: 1,
    link: "/sim-gia-duoi-500-nghin",
    gte: "0",
    lte: "500000",
  },
  {
    id: "500000",
    label: "500 - 1 triệu",
    category: 1,
    link: "/sim-gia-tu-500-nghin-den-1-trieu",
    gte: "500000",
    lte: "1000000",
  },
  {
    id: "1000000",
    label: "1 - 3 triệu",
    category: 1,
    link: "/sim-gia-tu-1-trieu-den-3-trieu",
    gte: "1000000",
    lte: "3000000",
  },
  {
    id: "3000000",
    label: "3 - 5 triệu",
    category: 1,
    link: "/sim-gia-tu-3-trieu-den-5-trieu",
    gte: "3000000",
    lte: "5000000",
  },
  {
    id: "5000000",
    label: "5 - 10 triệu",
    category: 1,
    link: "/sim-gia-tu-5-trieu-den-10-trieu",
    gte: "5000000",
    lte: "10000000",
  },
  {
    id: "10000000",
    label: "10 - 30 triệu",
    category: 1,
    link: "/sim-gia-tu-10-trieu-den-30-trieu",
    gte: "10000000",
    lte: "30000000",
  },
  {
    id: "30000000",
    label: "30 - 50 triệu",
    category: 1,
    link: "/sim-gia-tu-30-trieu-den-50-trieu",
    gte: "30000000",
    lte: "50000000",
  },
  {
    id: "50000000",
    label: "50 - 80 triệu",
    category: 1,
    link: "/sim-gia-tu-50-trieu-den-80-trieu",
    gte: "50000000",
    lte: "80000000",
  },
  {
    id: "80000000",
    label: "80 - 100 triệu",
    category: 1,
    link: "/sim-gia-tu-80-trieu-den-100-trieu",
    gte: "80000000",
    lte: "100000000",
  },
  {
    id: "100000000",
    label: "100 - 150 triệu",
    category: 1,
    link: "/sim-gia-tu-100-trieu-den-150-trieu",
    gte: "100000000",
    lte: "150000000",
  },
  {
    id: "150000000",
    label: "150 - 200 triệu",
    category: 1,
    link: "/sim-gia-tu-150-trieu-den-200-trieu",
    gte: "150000000",
    lte: "200000000",
  },
  {
    id: "200000000",
    label: "200 - 300 triệu",
    category: 1,
    link: "/sim-gia-tu-200-trieu-den-300-trieu",
    gte: "200000000",
    lte: "300000000",
  },
  {
    id: "300000000",
    label: "300 - 500 triệu",
    category: 1,
    link: "/sim-gia-tu-300-trieu-den-500-trieu",
    gte: "300000000",
    lte: "500000000",
  },
  {
    id: "500000000",
    label: "500 - 1 tỷ",
    category: 1,
    link: "/sim-gia-tu-500-trieu-den-1-ty",
    gte: "500000000",
    lte: "1000000000",
  },
  {
    id: "1000000000",
    label: "Trên 1 tỷ",
    category: 1,
    link: "/sim-gia-tren-1-ty",
    gte: "1000000000",
    lte: "",
  },
];

export const filterTel = [
  {
    id: 16,
    svId: "1",
    icon: logo.LogoViettel,
    label: "Sim Viettel",
    telco: "viettel",
    link: "/sim-viettel",
  },
  {
    id: 17,
    svId: "2",
    icon: logo.LogoVinaphone,
    label: "Sim VinaPhone",
    telco: "vinaphone",
    link: "/sim-vinaphone",
  },
  {
    id: 18,
    svId: "3",
    icon: logo.LogoMobifone,
    label: "Sim Mobifone",
    telco: "mobifone",
    link: "/sim-mobifone",
  },
  {
    id: 19,
    svId: "4",
    icon: logo.LogoVietnamobile,
    label: "Sim Vietnamobile",
    telco: "vietnamobile",
    link: "/sim-vietnamobile",
  },
  {
    id: 20,
    svId: "5",
    icon: logo.LogoGmobile,
    label: "Sim G-Mobile",
    telco: "gmobile",
    link: "/sim-gmobile",
  },
  {
    id: 21,
    svId: "8",
    icon: logo.LogoItel,
    label: "Sim Itel",
    telco: "itelecom",
    link: "/sim-itelecom",
  },
  // {
  //   id: 211,
  //   svId: "7",
  //   icon: logo.LogoMayban,
  //   label: "Máy bàn",
  //   telco: "mayban",
  //   category: 2,
  //   link: "/sim-mayban",
  // },
];
export const filterHead = [
  {
    id: 22,
    label: "09x",
    head: "09",
    loadMore: false,
    link: "/sim-dau-so-09",
  },
  {
    id: 23,
    label: "08x",
    head: "08",
    loadMore: false,
    link: "/sim-dau-so-08",
  },
  {
    id: 24,
    label: "07x",
    head: "07",
    loadMore: false,
    link: "/sim-dau-so-07",
  },
  {
    id: 25,
    label: "05x",
    head: "05",
    loadMore: false,
    link: "/sim-dau-so-05",
  },
  {
    id: 26,
    label: "03x",
    head: "03",
    loadMore: false,
    link: "/sim-dau-so-03",
  },
];

export const filterPhongThuy = [
  {
    id: 27,
    label: "Kim",
    icon: iconNguHanh.KimIcon,
    catId: 114,
    link: "/sim-hop-menh-kim",
  },
  {
    id: 28,
    label: "Mộc",
    icon: iconNguHanh.MocIcon,
    catId: 112,
    link: "/sim-hop-menh-moc",
  },
  {
    id: 29,
    label: "Thủy",
    icon: iconNguHanh.ThuyIcon,
    catId: 110,
    link: "/sim-hop-menh-thuy",
  },
  {
    id: 30,
    label: "Hỏa",
    icon: iconNguHanh.HoaIcon,
    catId: 111,
    link: "/sim-hop-menh-hoa",
  },
  {
    id: 31,
    label: "Thổ",
    icon: iconNguHanh.ThoIcon,
    catId: 113,
    link: "/sim-hop-menh-tho",
  },
];

export const filterHighLevel = [
  {
    id: 32,
    title: "VIP",
    label: "Sim VIP",
    catId: "82",
    link: "/sim-vip",
  },
  {
    id: 33,
    title: "666.666",
    label: "Sim Lục Quý",
    catId: "100",
    link: "/sim-luc-quy",
  },
  {
    id: 34,
    title: "x666.666x",
    label: "Lục Quý Giữa",
    catId: "105",
    link: "/sim-luc-quy-giua",
  },
  {
    id: 35,
    title: "55555",
    label: "Sim Ngũ Quý",
    catId: "99",
    link: "/sim-ngu-quy",
  },
  {
    id: 36,
    title: "x55555x",
    label: "Ngũ Quý Giữa",
    catId: "104",
    link: "/sim-ngu-quy-giua",
  },
  {
    id: 37,
    title: "333",
    label: "Sim Tam Hoa",
    catId: "80",
    link: "/sim-tam-hoa",
  },
  {
    id: 38,
    title: "333.999",
    label: "Tam Hoa Kép",
    catId: "102",
    link: "/sim-tam-hoa-kep",
  },
  {
    id: 39,
    title: "9999",
    label: "Sim Trả Góp",
    catId: "tra-gop",
    link: "/sim-tra-gop",
  },
];

export const filterImpressive = [
  {
    id: 40,
    title: "4444",
    label: "Sim Tứ Quý",
    catId: "68",
    link: "/sim-tu-quy",
  },
  {
    id: 41,
    title: "x4444x",
    label: "Tứ Quý Giữa",
    catId: "103",
    link: "/sim-tu-quy-giua",
  },
  {
    id: 42,
    title: "AABBCC",
    label: "Sim Dễ Nhớ",
    catId: "76",
    link: "/sim-de-nho",
  },
  {
    id: 43,
    title: "AA.BB",
    label: "Sim Kép",
    catId: "67",
    link: "/sim-lap-kep",
  },
  {
    id: 44,
    title: "AB.AB",
    label: "Sim Lặp",
    catId: "123",
    link: "/sim-lap",
  },
  {
    id: 45,
    title: "AB.BA",
    label: "Sim Gánh Đảo",
    catId: "79",
    link: "/sim-ganh-dao",
  },
  {
    id: 46,
    title: "6789",
    label: "Sim Tiến Lên",
    catId: "81",
    link: "/sim-tien-len",
  },
  {
    id: 47,
    title: "ABC.ABC",
    label: "Sim Taxi",
    catId: "74",
    link: "/sim-taxi",
  },
  {
    id: 48,
    title: "75.78.78",
    label: "Sim Số Độc",
    catId: "78",
    link: "/sim-so-doc",
  },
  {
    id: 49,
    title: "09x",
    label: "Sim Đầu Số Cổ",
    catId: "106",
    link: "/sim-dau-so-co",
  },
];

export const FILTER_LUCKY_NUMBER = [
  {
    id: 50,
    title: "199x",
    label: "Sim Năm Sinh",
    catId: 77,
    link: "/sim-nam-sinh",
  },
  {
    id: 51,
    title: "38.78",
    label: "Sim Ông Địa",
    catId: 70,
    link: "/sim-ong-dia",
  },
  {
    id: 52,
    title: "68.68",
    label: "Sim Lộc Phát",
    catId: 73,
    link: "/sim-loc-phat",
  },
  {
    id: 53,
    title: "39.79",
    label: "Sim Thần Tài",
    catId: 72,
    link: "/sim-than-tai",
  },
  {
    id: 54,
    title: "xx88",
    label: "Sim Đại Cát",
    catId: 115,
    link: "/sim-dai-cat",
  },
];

export const filterTaxi = [
  {
    id: 60,
    title: "Taxi lặp 4",
    label: "Sim Taxi lặp 4",
    catId: "128",
    link: "/sim-taxi-4"
  },
  {
    id: 61,
    title: "Taxi lặp 3",
    label: "Sim Taxi lặp 3",
    catId: "126",
    link: "/sim-taxi-3"
  },
  {
    id: 62,
    title: "Taxi lặp 2",
    label: "Sim Taxi lặp 2",
    catId: "127",
    link: "/sim-taxi-2"
  }
];

export const filterDoubleDigits = [
  {
    catId: "123",
    link: "/sim-lap"
  },
  {
    catId: "124",
    link: "/sim-lap-3"
  },
  {
    catId: "125",
    link: "/sim-lap-4"
  },
  {
    catId: "120",
    link: "/sim-kep"
  },
  {
    catId: "121",
    link: "/sim-kep-3"
  },
  {
    catId: "122",
    link: "/sim-kep-4"
  }
];

export const filterIncreasingTail = [
  {
    query: ['*012','*123','*234','*345','*456','*567','*678','*789'],
		tranh: ['0123','1234','2345','3456','4567','5678','6789'],
    link: "/sim-tien-3"
  }
]

export const filterPopularKeyword = [
  {
    id: 55,
    label: "sim tứ quý 9",
    catId: "68",
    tail: 9999,
    link: "/sim-tu-quy-9999",
  },
  {
    id: 56,
    label: "sim tam hoa 5",
    catId: "80",
    tail: 555,
    link: "/sim-tam-hoa-555",
  },
  {
    id: 57,
    label: "sim tam hoa 2",
    catId: "80",
    tail: 222,
    link: "/sim-tam-hoa-222",
  },
  {
    id: 58,
    label: "sim tứ quý 8",
    catId: "68",
    tail: 8888,
    link: "/sim-tu-quy-8888",
  },
  {
    id: 59,
    label: "sim tam hoa 7",
    catId: "80",
    tail: 777,
    link: "/sim-tam-hoa-777",
  },
  {
    id: 60,
    label: "sim tứ quý 7",
    catId: "68",
    tail: 7777,
    link: "/sim-tu-quy-7777",
  },
  {
    id: 61,
    label: "Sim tam hoa 9",
    catId: "80",
    tail: 999,
    link: "/sim-tam-hoa-999",
  },
  {
    id: 62,
    label: "sim tứ quý 6",
    catId: "68",
    tail: 6666,
    link: "/sim-tu-quy-6666",
  },
  {
    id: 63,
    label: "sim tứ quý 3",
    catId: "68",
    tail: 3333,
    link: "/sim-tu-quy-3333",
  },
  {
    id: 64,
    label: "sim tứ quý 5",
    catId: "68",
    tail: 5555,
    link: "/sim-tu-quy-5555",
  },
  {
    id: 65,
    label: "sim tam hoa 8",
    catId: "80",
    tail: 888,
    link: "/sim-tam-hoa-888",
  },
  {
    id: 66,
    label: "sim tam hoa 6",
    catId: "80",
    tail: 666,
    link: "/sim-tam-hoa-666",
  },
];

export const filterTypes = [
  {
    id: 1631,
    title: "6789",
    label: "Tiến lên",
    catId: "81",
    link: "/sim-tien-len",
  },
  {
    id: 1632,
    title: "333",
    label: "Tam hoa",
    catId: "80",
    link: "/sim-tam-hoa",
  },
  {
    id: 1633,
    title: "4444",
    label: "Tứ quý",
    catId: "68",
    link: "/sim-tu-quy",
  },
  {
    id: 1634,
    title: "68.68",
    label: "Lộc phát",
    catId: "73",
    link: "/sim-loc-phat",
  },
  {
    id: 1635,
    title: "55555",
    label: "Ngũ quý",
    catId: "99",
    link: "/sim-ngu-quy",
  },
  {
    id: 1636,
    title: "666.666",
    label: "Lục quý",
    catId: "100",
    link: "/sim-luc-quy",
  },
  {
    id: 1637,
    title: "333.999",
    label: "Tam hoa kép",
    catId: "102",
    link: "/sim-tam-hoa-kep",
  },
  {
    id: 1638,
    title: "AB.BA",
    label: "Gánh đảo",
    catId: "79",
    link: "/sim-ganh-dao",
  },
  {
    id: 1639,
    title: "ABC.ABC",
    label: "Taxi",
    catId: "74",
    link: "/sim-taxi",
  },
  {
    id: 16310,
    title: "VIP",
    label: "Sim VIP",
    catId: "82",
    link: "/sim-vip",
  },
  {
    id: 16311,
    title: "75.78.78",
    label: "Số độc",
    catId: "78",
    link: "/sim-so-doc",
  },
  {
    id: 16312,
    title: "AABBCC",
    label: "Dễ nhớ",
    catId: "76",
    link: "/sim-de-nho",
  },
  {
    id: 16313,
    title: "AB.AB",
    label: "Lặp kép",
    catId: "123",
    link: "/sim-lap",
  },
  {
    id: 16314,
    label: "Năm sinh",
    catId: "77",
    link: "/sim-nam-sinh",
  },
];

export const FILTER_OTHER = [
  //! sim năm sinh
  {
    id: 61,
    catId: 77,
    link: "/sim-nam-sinh",
  },
  {
    id: 62,
    catId: "0",
    link: "/sim-gia-re",
  },
  {
    id: 63,
    catId: "0",
    link: "/sim-tra-gop",
  },
];


//* admin
export const minPriceOptions = [
  {
    label: "0",
    value: "0",
  },
  {
    label: "500.000",
    value: "500000",
  },
  {
    label: "1.000.000",
    value: "1000000",
  },
  {
    label: "3.000.000",
    value: "3000000",
  },
  {
    label: "5.000.000",
    value: "5000000",
  },
  {
    label: "10.000.000",
    value: "10000000",
  },
  {
    label: "30.000.000",
    value: "30000000",
  },
  {
    label: "50.000.000",
    value: "50000000",
  },
  {
    label: "80.000.000",
    value: "80000000",
  },
  {
    label: "100.000.000",
    value: "100000000",
  },
  {
    label: "150.000.000",
    value: "150000000",
  },
  {
    label: "200.000.000",
    value: "200000000",
  },
  {
    label: "300.000.000",
    value: "300000000",
  },
  {
    label: "500.000.000",
    value: "500000000",
  },
  {
    label: "1.000.000.000",
    value: "1000000000",
  },
]

export const maxPriceOptions = [
  {
    label: "500.000",
    value: "500000",
  },
  {
    label: "1.000.000",
    value: "1000000",
  },
  {
    label: "3.000.000",
    value: "3000000",
  },
  {
    label: "5.000.000",
    value: "5000000",
  },
  {
    label: "10.000.000",
    value: "10000000",
  },
  {
    label: "30.000.000",
    value: "30000000",
  },
  {
    label: "50.000.000",
    value: "50000000",
  },
  {
    label: "80.000.000",
    value: "80000000",
  },
  {
    label: "100.000.000",
    value: "100000000",
  },
  {
    label: "150.000.000",
    value: "150000000",
  },
  {
    label: "200.000.000",
    value: "200000000",
  },
  {
    label: "300.000.000",
    value: "300000000",
  },
  {
    label: "500.000.000",
    value: "500000000",
  },
  {
    label: "1.000.000.000",
    value: "1000000000",
  },
  {
    label: "(không có)",
    value: "",
  },
]


export const productCategories = [
  { id: 67, text: "Sim Lặp Kép" },
  { id: 68, text: "Sim Tứ Quý" },
  { id: 70, text: "Sim Ông Địa" },
  { id: 71, text: "Sim Đôi" },
  { id: 72, text: "Sim Thần Tài" },
  { id: 73, text: "Sim Lộc Phát" },
  { id: 74, text: "Sim Taxi" },
  { id: 76, text: "Sim Dễ Nhớ" },
  { id: 77, text: "Sim Năm Sinh" },
  { id: 78, text: "Sim Số Độc" },
  { id: 79, text: "Sim Gánh Đảo" },
  { id: 80, text: "Sim Tam Hoa" },
  { id: 81, text: "Sim Tiến Lên" },
  { id: 82, text: "Sim VIP" },
  { id: 84, text: "Sim Tự Chọn" },
  { id: 99, text: "Sim Ngũ Quý" },
  { id: 100, text: "Sim Lục Quý" },
  { id: 102, text: "Sim Tam Hoa Kép" },
  { id: 103, text: "Sim Tứ Quý Giữa" },
  { id: 104, text: "Sim Ngũ Quý Giữa" },
  { id: 105, text: "Sim Lục Quý Giữa" },
  { id: 106, text: "Sim Đầu Số Cổ" },
  { id: 110, text: "Sim Hợp Mệnh Thủy" },
  { id: 111, text: "Sim Hợp Mệnh Hỏa" },
  { id: 111, text: "Sim Hợp Mệnh Mộc" },
  { id: 113, text: "Sim Hợp Mệnh Thổ" },
  { id: 114, text: "Sim Hợp Mệnh Kim" },
  { id: 115, text: "Sim Đại Cát" },
  { id: 116, text: "Sim Cát" },
  { id: 117, text: "Sim Bình" },
  { id: 118, text: "Sim Hung" },
  { id: 118, text: "Sim Đại Hung" },
  { id: 120, text: "Sim Kép" },
  { id: 121, text: "Sim Kép 3", parentId: 120 },
  { id: 122, text: "Sim Kép 4", parentId: 120 },
  { id: 123, text: "Sim Lặp" },
  { id: 124, text: "Sim Lặp 3", parentId: 123 },
  { id: 125, text: "Sim Lặp 4", parentId: 123 },
  { id: 999, text: "Sim Phong Thủy" },
];


export const telcoIdMappings = {
  viettel: 1,
  vinaphone: 2,
  mobifone: 3,
  vietnamobile: 4,
  gmobile: 5,
  mayban: 7,
  itelecom: 8
}
