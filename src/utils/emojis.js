import data from "@emoji-mart/data";

export const skinToneMap = {
  Light: 2,
  "Medium Light": 3,
  Medium: 4,
  "Medium Dark": 5,
  Dark: 6,
};

// Emojis with skin tones that I don't want as options
const additionalExclusions = [
  "cop",
  "male-police-officer",
  "female-police-officer",
  "sleeping_accommodation",
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
