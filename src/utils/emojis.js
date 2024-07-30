const EMOJI_DATA_URL = "https://cdn.jsdelivr.net/npm/@emoji-mart/data";

const ADDITIONAL_EXCLUSIONS = [
  "cop",
  "male-police-officer",
  "female-police-officer",
  "sleeping_accommodation",
  "snowboarder",
  "vampire",
  "male_vampire",
  "female_vampire",
  "man_and_woman_holding_hands",
  "people_holding_hands",
  "woman_and_man_holding_hands",
  "two_women_holding_hands",
  "two_men_holding_hands",
  "couplekiss",
  "woman-kiss-man",
  "man-kiss-man",
  "woman-kiss-woman",
  "man-kiss-woman",
  "couple_with_heart",
  "woman-heart-man",
  "man-heart-man",
  "woman-heart-woman",
  "man-heart-woman",
];

let data = null;
let skinToneEmojiList = [];
let exclusionList = [];

const fetchEmojiData = async () => {
  try {
    const response = await fetch(EMOJI_DATA_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching emoji data:", error);
    throw error;
  }
};

const processEmojiData = () => {
  const emojis = Object.values(data.emojis);

  skinToneEmojiList = emojis
    .filter(
      (emoji) =>
        emoji.skins?.length > 1 && !ADDITIONAL_EXCLUSIONS.includes(emoji.id)
    )
    .map((emoji) => emoji.id);

  exclusionList = [
    ...ADDITIONAL_EXCLUSIONS,
    ...emojis
      .filter((emoji) => !skinToneEmojiList.includes(emoji.id))
      .map((emoji) => emoji.id),
  ];
};

const initializeEmojiData = async () => {
  data = await fetchEmojiData();
  processEmojiData();
};

initializeEmojiData();

export { data, skinToneEmojiList, exclusionList };
