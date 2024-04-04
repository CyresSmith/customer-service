const getAvatarLetters = (name: string) => {
    const words = name.split(' ');

    const letter = (word: string) => word.slice(0, 1).toUpperCase();

    return words.length > 1
        ? letter(words[0]).concat(letter(words[1]))
        : name.slice(0, 1).toUpperCase();
};

export default getAvatarLetters;
