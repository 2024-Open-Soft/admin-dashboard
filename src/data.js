import axios from "axios";
import { setCountries } from "./redux/reducers/CountryReducer";

export const countries = async (dispatch) => {
  const countrydata = await axios
    .get("https://restcountries.com/v3.1/all/?fields=name")
    .catch((err) => console.log(err));
  let countries = [];
  Object.keys(countrydata.data).forEach((key) => {
    countries.push({ title: countrydata.data[key].name?.official });
  });
  dispatch(setCountries(countries));
};

export const genres = [
  { id: 1, title: "Action", label: "action" },
  { id: 2, title: "Adventure", label: "adventure" },
  { id: 3, title: "Animation", label: "animation" },
  { id: 4, title: "Comedy", label: "comedy" },
  { id: 5, title: "Crime", label: "crime" },
  { id: 6, title: "Drama", label: "drama" },
  { id: 7, title: "Family", label: "family" },
  { id: 8, title: "Fantasy", label: "fantasy" },
  { id: 9, title: "Horror", label: "horror" },
  { id: 10, title: "Mystery", label: "mystery" },
  { id: 11, title: "Romance", label: "romance" },
  { id: 12, title: "Sci-Fi", label: "sci-fi" },
  { id: 13, title: "Thriller", label: "thriller" },
  { id: 14, title: "Documentary", label: "documentary" },
  { id: 15, title: "Biography", label: "biography" },
  { id: 16, title: "Musical", label: "musical" },
  { id: 17, title: "War", label: "war" },
  { id: 18, title: "Western", label: "western" },
  { id: 19, title: "History", label: "history" },
  { id: 20, title: "Sport", label: "sport" },
];

// 0
// name
// common	"Cyprus"
// official	"Republic of Cyprus"
// nativeName
// ell
// official	"Δημοκρατία της Κύπρος"
// common	"Κύπρος"
// tur
// official	"Kıbrıs Cumhuriyeti"
// common	"Kıbrıs"
// 1
// name
// common	"Eritrea"
// official	"State of Eritrea"
// nativeName
// ara
// official	"دولة إرتريا"
// common	"إرتريا‎"
// eng
// official	"State of Eritrea"
// common	"Eritrea"
// tir
// official	"ሃገረ ኤርትራ"
// common	"ኤርትራ"

export const movieCertifications = [
  { title: "G", description: "General Audiences" },
  { title: "PG", description: "Parental Guidance Suggested" },
  { title: "PG-13", description: "Parents Strongly Cautioned" },
  { title: "R", description: "Restricted" },
  { title: "NC-17", description: "Adults Only" },
];

export const cinemaLanguages = [
  { title: "English", label: "english" },
  { title: "French", label: "french" },
  { title: "Mandarin", label: "mandarin" },
  { title: "Italian", label: "italian" },
  { title: "Japanese", label: "japanese" },
  { title: "Hindi", label: "hindi" },
  { title: "Urdu", label: "urdu" },
  { title: "Punjabi", label: "punjabi" },
  { title: "Tamil", label: "tamil" },
  { title: "Bengali", label: "bengali" },
  { title: "Telugu", label: "telugu" },
  { title: "Marathi", label: "marathi" },
  { title: "Kannada", label: "kannada" },
  { title: "Malayalam", label: "malayalam" },
  { title: "Korean", label: "korean" },
  { title: "Russian", label: "russian" },
  { title: "German", label: "german" },
  { title: "Spanish", label: "spanish" },
  { title: "Portuguese", label: "portuguese" },
  { title: "Arabic", label: "arabic" },
  { title: "Turkish", label: "turkish" },
  { title: "Dutch", label: "dutch" },
  { title: "Swedish", label: "swedish" },
  { title: "Norwegian", label: "norwegian" },
  { title: "Finnish", label: "finnish" },
  { title: "Danish", label: "danish" },
  { title: "Polish", label: "polish" },
  { title: "Hungarian", label: "hungarian" },
  { title: "Czech", label: "czech" },
  { title: "Slovak", label: "slovak" },
  { title: "Romanian", label: "romanian" },
  { title: "Bulgarian", label: "bulgarian" },
  { title: "Greek", label: "greek" },
  { title: "Hebrew", label: "hebrew" },
  { title: "Thai", label: "thai" },
  { title: "Vietnamese", label: "vietnamese" },
  { title: "Filipino", label: "filipino" },
  { title: "Indonesian", label: "indonesian" },
  { title: "Malay", label: "malay" },
  { title: "Persian", label: "persian" },
  { title: "Afrikaans", label: "afrikaans" },
  { title: "Albanian", label: "albanian" },
  { title: "Amharic", label: "amharic" },
  { title: "Armenian", label: "armenian" },
  { title: "Azerbaijani", label: "azerbaijani" },
  { title: "Basque", label: "basque" },
  { title: "Belarusian", label: "belarusian" },
  { title: "Bosnian", label: "bosnian" },
  { title: "Catalan", label: "catalan" },
  { title: "Afgan", label: "afgan" },
  { title: "Cebuano", label: "cebuano" },
  { title: "Chichewa", label: "chichewa" },
  { title: "Corsican", label: "corsican" },
  { title: "Croatian", label: "croatian" },
  { title: "Estonian", label: "estonian" },
  { title: "Fijian", label: "fijian" },
  { title: "Galician", label: "galician" },
  { title: "Georgian", label: "georgian" },
  { title: "Haitian Creole", label: "haitian creole" },
  { title: "Hausa", label: "hausa" },
  { title: "Hawaiian", label: "hawaiian" },
  { title: "Icelandic", label: "icelandic" },
  { title: "Igbo", label: "igbo" },
  { title: "Irish", label: "irish" },
  { title: "Javanese", label: "javanese" },
  { title: "Kazakh", label: "kazakh" },
  { title: "Khmer", label: "khmer" },
  { title: "Kurdish", label: "kurdish" },
  { title: "Kyrgyz", label: "kyrgyz" },
  { title: "Lao", label: "lao" },
  { title: "Latvian", label: "latvian" },
  { title: "Lithuanian", label: "lithuanian" },
  { title: "Luxembourgish", label: "luxembourgish" },
  { title: "Macedonian", label: "macedonian" },
  { title: "Malagasy", label: "malagasy" },
  { title: "Maltese", label: "maltese" },
  { title: "Maori", label: "maori" },
  { title: "Mongolian", label: "mongolian" },
  { title: "Myanmar (Burmese)", label: "myanmar (burmese)" },
  { title: "Nepali", label: "nepali" },
  { title: "Pashto", label: "pashto" },
  { title: "Samoan", label: "samoan" },
  { title: "Scots Gaelic", label: "scots gaelic" },
  { title: "Serbian", label: "serbian" },
  { title: "Sesotho", label: "sesotho" },
  { title: "Shona", label: "shona" },
  { title: "Sindhi", label: "sindhi" },
  { title: "Sinhala", label: "sinhala" },
  { title: "Slovenian", label: "slovenian" },
  { title: "Somali", label: "somali" },
  { title: "Sundanese", label: "sundanese" },
  { title: "Swahili", label: "swahili" },
  { title: "Tajik", label: "tajik" },
  { title: "Tatar", label: "tatar" },
  { title: "Uzbek", label: "uzbek" },
  { title: "Welsh", label: "welsh" },
  { title: "Xhosa", label: "xhosa" },
  { title: "Yiddish", label: "yiddish" },
  { title: "Yoruba", label: "yoruba" },
  { title: "Zulu", label: "zulu" },
];

export const plans = [
  {
    plan: "660297a07584881157e4b328",
    startDate: new Date("2024-03-29T00:00:00Z"),
    endDate: new Date("2024-04-01T00:00:00Z"),
    status: "TO_BE_PAID",
  },
  {
    plan: "660297a07584881157e4b328",
    startDate: new Date("2024-03-29T00:00:00Z"),
    endDate: new Date("2024-04-01T00:00:00Z"),
    status: "TO_BE_PAID",
  },
  {
    plan: "660297a07584881157e4b328",
    startDate: new Date("2024-03-29T00:00:00Z"),
    endDate: new Date("2024-04-01T00:00:00Z"),
    status: "TO_BE_PAID",
  },
  {
    plan: "660297a07584881157e4b328",
    startDate: new Date("2024-03-29T00:00:00Z"),
    endDate: new Date("2024-04-01T00:00:00Z"),
    status: "TO_BE_PAID",
  },
  {
    plan: "660297a07584881157e4b328",
    startDate: new Date("2024-03-29T00:00:00Z"),
    endDate: new Date("2024-04-01T00:00:00Z"),
    status: "TO_BE_PAID",
  },
  {
    plan: "660297a07584881157e4b328",
    startDate: new Date("2024-03-29T00:00:00Z"),
    endDate: new Date("2024-04-01T00:00:00Z"),
    status: "TO_BE_PAID",
  },
  {
    plan: "660297a07584881157e4b328",
    startDate: new Date("2024-03-29T00:00:00Z"),
    endDate: new Date("2024-04-01T00:00:00Z"),
    status: "TO_BE_PAID",
  },
  {
    plan: "660297a07584881157e4b328",
    startDate: new Date("2024-03-29T00:00:00Z"),
    endDate: new Date("2024-04-01T00:00:00Z"),
    status: "TO_BE_PAID",
  },
  {
    plan: "660297a07584881157e4b328",
    startDate: new Date("2024-03-29T00:00:00Z"),
    endDate: new Date("2024-04-01T00:00:00Z"),
    status: "TO_BE_PAID",
  },
  {
    plan: "660297a07584881157e4b328",
    startDate: new Date("2024-03-29T00:00:00Z"),
    endDate: new Date("2024-04-01T00:00:00Z"),
    status: "TO_BE_PAID",
  },
];
