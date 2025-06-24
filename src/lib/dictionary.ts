// A curated list of words for a better gameplay experience.
// In a real application, this would be a much larger list, possibly loaded from a file or an API.
const dictionary: string[] = [
    'master', 'sterna', 'nausea', 'search', 'archer', 'heroic', 'iconic', 'nickel', 'kelvin', 
    'invent', 'ventilate', 'lateral', 'herald', 'alderman', 'mantle', 'legend', 'endless', 
    'lessen', 'sensor', 'origin', 'ginger', 'gerbil', 'billet', 'letter', 'terror', 'orphan',
    'handle', 'dwindle', 'lesser', 'servant', 'anthem', 'thematic', 'ticket', 'kettle',
    'tle-fish', 'fisher', 'sherman', 'mantra', 'travel', 'velcro', 'robust', 'buster',
    'terminator', 'orphanage', 'generate', 'rational', 'challenge', 'lengthy', 'thyroid',
    'android', 'idiocy', 'cyborg', 'organic', 'nickelodeon'
].map(w => w.toLowerCase());

const dictionarySet = new Set(dictionary);

/**
 * Checks if a word exists in the dictionary.
 * @param word The word to check.
 * @returns True if the word is valid, false otherwise.
 */
export function isValidWord(word: string): boolean {
    return dictionarySet.has(word.toLowerCase());
}

/**
 * Gets a random word from the dictionary.
 * @returns A random word.
 */
export function getRandomWord(): string {
    const randomIndex = Math.floor(Math.random() * dictionary.length);
    return dictionary[randomIndex];
}
