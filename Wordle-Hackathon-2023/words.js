const baseUrl = "https://api.datamuse.com/words";
const WORD_LENGTH = 5;
const WORD_COUNT = 25000;

document.getElementById("btn").addEventListener("click", function () {
  location.reload();
});

const fetchWords = async () => {
  try {
    const letters = "abcdefghijklmnopqrstuvwxyz".split("");
    let words = [];

    ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

    for (let letter of letters) {
      const apiUrl = `${baseUrl}?sp=${letter}${"?".repeat(
        WORD_LENGTH - 1
      )}&max=200`;

      for (let i = 0; i < 5; i++) {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Extract the valid words from the response
        const validWords = data
          .filter(
            (word) =>
              word.word.length === WORD_LENGTH && /^[a-zA-Z]+$/.test(word.word)
          )
          .map((word) => word.word.toLowerCase());

        words = words.concat(validWords);

        if (words.length >= WORD_COUNT) {
          return words.slice(0, WORD_COUNT);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const WORDS = await fetchWords();
