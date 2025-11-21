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

export const NUM_TILES_ALLOWED_IN_HAND = 10;
export const BONUS_POINTS_FOR_LENGTH = 8;
export const BONUS_LETTER_THRESHOLD = 7;

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
  const normalizedWord = (word || '').toString().toUpperCase();

  if (normalizedWord.length === 0) return 0;

  let totalScore = 0;
  for (const letter of normalizedWord) {
    const letterPoints = SCORE_CHART[letter] || 0;
    totalScore += letterPoints;
  }

  if (
    normalizedWord.length >= BONUS_LETTER_THRESHOLD &&
    normalizedWord.length <= NUM_TILES_ALLOWED_IN_HAND
  ) {
    totalScore += BONUS_POINTS_FOR_LENGTH;
  }

  return totalScore;
};

export const highestScoreFrom = (words) => {
  let bestWord = null;
  let bestScore = 0;

  for (const word of words) {
    const score = scoreWord(word);

    if (bestWord === null || score > bestScore) {
      bestWord = word;
      bestScore = score;
      continue;
    }

    if (score === bestScore) {
      if (breakTie(word, bestWord)) {
        bestWord = word;
        bestScore = score;
      }
    }
  }

  return { word: bestWord, score: bestScore };
};

const breakTie = (candidate, currentBest) => {
  // Prefer a 10-letter word if the current best is not 10 letters
  if (candidate.length === NUM_TILES_ALLOWED_IN_HAND && currentBest.length !== NUM_TILES_ALLOWED_IN_HAND) {
    return true;
  }

  // If current best is 10 letters, it wins
  if (currentBest.length === NUM_TILES_ALLOWED_IN_HAND && candidate.length !== NUM_TILES_ALLOWED_IN_HAND) {
    return false;
  }

  // If neither is 10 letters, prefer the shorter word
  if (candidate.length < currentBest.length) {
    return true;
  }

  // Otherwise keep the existing word, including when lengths equal case
  return false;
};
