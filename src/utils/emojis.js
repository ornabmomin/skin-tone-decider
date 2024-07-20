import data from "@emoji-mart/data";

export const skinToneMap = {
  Light: 2,
  "Medium Light": 3,
  Medium: 4,
  "Medium Dark": 5,
  Dark: 6,
};

const additionalExclusions = [
  "cop",
  "male-police-officer",
  "female-police-officer",
  "sleeping_accommodation",
];

const [skinToneEmojiList, exclusionList] = Object.values(data.emojis).reduce(
  ([skinTone, exclusions], emoji) => {
    if (
      emoji.skins &&
      emoji.skins.length > 1 &&
      !additionalExclusions.includes(emoji.id)
    ) {
      skinTone.push(emoji);
    } else {
      exclusions.push(emoji.id);
    }
    return [skinTone, exclusions];
  },
  [[], [...additionalExclusions]]
);

export { skinToneEmojiList, exclusionList };
