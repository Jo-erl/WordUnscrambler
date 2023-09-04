document.addEventListener("DOMContentLoaded", function () {
  const selectedWords = [
    // Category 1: Fruits
    "apple",
    "banana",
    "cherry",
    "grape",
    "kiwi",

    // Category 2: Animals
    "elephant",
    "lion",
    "tiger",
    "giraffe",
    "zebra",

    // Category 3: Colors
    "red",
    "blue",
    "green",
    "yellow",
    "purple",

    // Category 4: Vehicles
    "car",
    "bus",
    "bike",
    "train",
    "plane",

    // Category 5: Countries
    "gabon",
    "canada",
    "france",
    "japan",
    "australia",

    // Category 6: Vegetables
    "carrot",
    "broccoli",
    "potato",
    "tomato",
    "onion",

    // Category 7: Sports
    "football",
    "basketball",
    "soccer",
    "hockey",
    "tennis",

    // Category 8: Weather
    "sunny",
    "rainy",
    "cloudy",
    "windy",
    "snowy",

    // Category 9: Surnames
    "smith",
    "johnson",
    "williams",
    "jones",
    "brown",

    // Category 10: Instruments
    "guitar",
    "drums",
    "piano",
    "violin",
    "flute",
    // Add more categories and words as needed...
  ];

  // Define an object to map words to their categories
  const wordCategories = {
    apple: "Fruits",
    banana: "Fruits",
    cherry: "Fruits",
    grape: "Fruits",
    kiwi: "Fruits",
    elephant: "Animals",
    lion: "Animals",
    tiger: "Animals",
    giraffe: "Animals",
    zebra: "Animals",
    red: "Colors",
    blue: "Colors",
    green: "Colors",
    yellow: "Colors",
    purple: "Colors",
    car: "Vehicles",
    bus: "Vehicles",
    bike: "Vehicles",
    train: "Vehicles",
    plane: "Vehicles",
    gabon: "Countries",
    canada: "Countries",
    france: "Countries",
    japan: "Countries",
    australia: "Countries",
    carrot: "Vegetables",
    broccoli: "Vegetables",
    potato: "Vegetables",
    tomato: "Vegetables",
    onion: "Vegetables",
    football: "Sports",
    basketball: "Sports",
    soccer: "Sports",
    hockey: "Sports",
    tennis: "Sports",
    sunny: "Weather",
    rainy: "Weather",
    cloudy: "Weather",
    windy: "Weather",
    snowy: "Weather",
    smith: "Surnames",
    johnson: "Surnames",
    williams: "Surnames",
    jones: "Surnames",
    brown: "Surnames",
    guitar: "Instruments",
    drums: "Instruments",
    piano: "Instruments",
    violin: "Instruments",
    flute: "Instruments",
    // Add more words and categories as needed...
  };

  // Randomize the selectedWords
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleArray(selectedWords);

  let currentWordIndex = 0;
  let score = 0;
  let gameOver = false;

  const unscrambledWord = document.getElementById("scrambled-word");
  const userInput = document.getElementById("user-input");
  const submitButton = document.getElementById("submit-button");
  const skipButton = document.getElementById("skip-button");
  const scoreElement = document.getElementById("current-score");
  const totalWordsElement = document.getElementById("total-words");
  const restartButton = document.getElementById("restart-button");
  const finalScoreElement = document.getElementById("final-score");
  const scoreTotalElement = document.getElementById("score-total");
  const categoryElement = document.getElementById("category"); // Added this line

  function shuffleWord(word) {
    const wordArray = word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    return wordArray.join("");
  }

  function displayNextWord() {
    if (currentWordIndex < selectedWords.length) {
      const currentWord = selectedWords[currentWordIndex];
      const scrambled = shuffleWord(currentWord);

      // Set the category content
      const category = wordCategories[currentWord] || "Unknown"; // Get category from the object, default to 'Unknown'
      // Set the category content with a strong tag
      categoryElement.innerHTML = `<strong>Category:</strong> ${category}`;
      unscrambledWord.innerHTML = `<strong>Word:</strong> ${scrambled}`;
      unscrambledWord.classList.remove("correct", "incorrect");
      userInput.value = "";
      currentWordIndex++;
      totalWordsElement.textContent = selectedWords.length;
      scoreElement.textContent = `${score} /`;
      scoreTotalElement.textContent = selectedWords.length;
      submitButton.removeAttribute("disabled");
    } else {
      gameOver = true;
      unscrambledWord.textContent = "Game Over!";
      unscrambledWord.classList.remove("correct", "incorrect");
      userInput.style.display = "none";
      submitButton.style.display = "none";
      skipButton.style.display = "none";
      scoreElement.style.display = "none";
      finalScoreElement.style.display = "block";
      finalScoreElement.textContent = `Final Score: ${score} / ${selectedWords.length}`;
      restartButton.style.display = "block";
    }
  }

  function displayCorrectMessage() {
    unscrambledWord.textContent = "Correct!";
    unscrambledWord.classList.add("correct");
  }

  function displayIncorrectMessage(currentWord) {
    unscrambledWord.textContent = `Answer: ${currentWord}`;
    unscrambledWord.classList.add("incorrect");
  }

  function checkAnswer() {
    if (gameOver) return;
    const userAnswer = userInput.value.trim().toLowerCase();
    const currentWord = selectedWords[currentWordIndex - 1];

    if (!userAnswer) {
      unscrambledWord.textContent = "Please enter your answer";
      unscrambledWord.classList.add("incorrect");

      setTimeout(() => {
        unscrambledWord.innerHTML = `<strong>Word:</strong> ${shuffleWord(
          currentWord
        )}`;
        unscrambledWord.classList.remove("incorrect");
      }, 1000);
    } else if (userAnswer === currentWord) {
      score++;
      displayCorrectMessage();
      setTimeout(displayNextWord, 2000);
    } else {
      displayIncorrectMessage(currentWord);
      setTimeout(displayNextWord, 2000);
    }
  }

  submitButton.addEventListener("click", checkAnswer);
  skipButton.addEventListener("click", () => {
    const currentWord = selectedWords[currentWordIndex - 1];
    displayIncorrectMessage(currentWord);
    setTimeout(displayNextWord, 2000);
  });

  restartButton.addEventListener("click", () => {
    currentWordIndex = 0;
    score = 0;
    gameOver = false;
    userInput.style.display = "block";
    submitButton.style.display = "block";
    skipButton.style.display = "block";
    scoreElement.style.display = "block";
    finalScoreElement.style.display = "none";
    restartButton.style.display = "none";
    displayNextWord();
    scoreElement.textContent = `${score} /`;
    scoreTotalElement.textContent = selectedWords.length;
  });

  displayNextWord();
});
