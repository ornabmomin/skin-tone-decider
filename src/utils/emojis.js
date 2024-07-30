const fetchEmojiData = async () => {
  const response = await fetch("https://cdn.jsdelivr.net/npm/@emoji-mart/data");
  const data = await response.json();
  return data;
};

export const data = await fetchEmojiData();

// Emojis with skin tones that I don't want as options
const additionalExclusions = [
  "cop",
  "male-police-officer",
  "female-police-officer",
  "sleeping_accommodation",
  "snowboarder",
  "vampire",
  "male_vampire",
  "female_vampire",
];

const arrayOfEmojis = Object.values(data.emojis);

// List of emojis to randomly choose from for initial emoji
export const skinToneEmojiList = [];

// List of emojis to exclude from emoji picker
export const exclusionList = [...additionalExclusions];

for (const emoji of arrayOfEmojis) {
  if (emoji.skins?.length > 1 && !additionalExclusions.includes(emoji.id)) {
    skinToneEmojiList.push(emoji.id);
  } else {
    exclusionList.push(emoji.id);
  }
}
