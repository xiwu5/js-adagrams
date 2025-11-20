export const LETTER_DISTRIBUTION = Object.freeze({
  A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3, H: 2,
  I: 9, J: 1, K: 1, L: 4, M: 2, N: 6, O: 8, P: 2,
  Q: 1, R: 6, S: 4, T: 6, U: 4, V: 2, W: 2, X: 1,
  Y: 2, Z: 1,
});
const NUM_TILES_ALLOWED_IN_HAND = 10;

const getLetterPool = (distribution = LETTER_DISTRIBUTION) => {
  const pool = [];
  Object.entries(distribution).forEach(([letter, quantity]) => {
    for (let i = 0; i < quantity; i++) {
      pool.push(letter);
    }
  });
  return pool;
};

export const drawLetters = () => {
  const pool = getLetterPool();

  const hand = [];
  for (let i = 0; i < NUM_TILES_ALLOWED_IN_HAND; i++) {
    const randomIdx = Math.floor(Math.random() * pool.length);
    hand.push(pool[randomIdx]);
    pool.splice(randomIdx, 1); // remove drawn letter so it can't be drawn again
  }

  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
