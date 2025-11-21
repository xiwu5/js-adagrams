export const LETTER_DISTRIBUTION = Object.freeze({
  A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3, H: 2,
  I: 9, J: 1, K: 1, L: 4, M: 2, N: 6, O: 8, P: 2,
  Q: 1, R: 6, S: 4, T: 6, U: 4, V: 2, W: 2, X: 1,
  Y: 2, Z: 1,
});

export const SCORE_CHART = Object.freeze({
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4,
  I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3,
  Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8,
  Y: 4, Z: 10,
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

    const lastIdx = pool.length - 1;
    if (randomIdx !== lastIdx) {
      pool[randomIdx] = pool[lastIdx];
    }
    pool.pop();
  }

  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const handCounts = {};
  lettersInHand.forEach((letter) => {
    handCounts[letter] = (handCounts[letter] || 0) + 1;
  });

  for (const char of input.toUpperCase()) {
    if (!handCounts[char]) {
      return false;
    }
    handCounts[char] -= 1;
  }

  return true;
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
