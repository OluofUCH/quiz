export interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
}

export interface QuestionType {
  question: string;
  answer: string;
}

export interface QuizQuestion {
  flag: string;
  correctAnswer: string;
  options: string[];
  country: Country;
}

export const fetchQuestion = async (props?: QuestionType): Promise<Country[]> => {
  try {
    const data = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
    const response: Country[] = await data.json();
    const shuffled = response.sort(() => 0.5 - Math.random());
    const randomTen = shuffled.slice(0, 10);
    return randomTen;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const generateQuizQuestions = (countriesData: Country[]): QuizQuestion[] => {
  return countriesData.map(country => {
    const correctAnswer = country.name.common;
    const wrongOptions = countriesData
      .filter(c => c.name.common !== correctAnswer)
      .map(c => c.name.common);
    const shuffledWrongOptions = shuffleArray(wrongOptions);
    const selectedWrongOptions = shuffledWrongOptions.slice(0, 3);
    const allOptions = shuffleArray([correctAnswer, ...selectedWrongOptions]);
    return {
      flag: country.flags.png,
      correctAnswer,
      options: allOptions,
      country: country
    };
  });
};