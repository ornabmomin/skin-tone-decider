const fetchEmojiData = async () => {
  const response = await fetch("https://cdn.jsdelivr.net/npm/@emoji-mart/data");
  const data = await response.json();
  return data;
};

let data = null;
let skinToneEmojiList = [];
let exclusionList = [];

const initializeEmojiData = async () => {
  data = await fetchEmojiData();

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

  // Temporary lists to hold the data before updating the module-scoped variables
  const tempSkinToneEmojiList = [];
  const tempExclusionList = [...additionalExclusions];

  for (const emoji of arrayOfEmojis) {
    if (emoji.skins?.length > 1 && !additionalExclusions.includes(emoji.id)) {
      tempSkinToneEmojiList.push(emoji.id);
    } else {
      tempExclusionList.push(emoji.id);
    }
  }

  skinToneEmojiList = tempSkinToneEmojiList;
  exclusionList = tempExclusionList;
};

const emojiDataPromise = initializeEmojiData();

export { data, skinToneEmojiList, exclusionList, emojiDataPromise };
