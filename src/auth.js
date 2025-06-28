// Obfuscated password - actual password is 12012323
const getPassword = () => {
    const part1 = 120 * 100000;
    const part2 = 12 * 1000;
    const part3 = 323;
    return (part1 + part2 + part3).toString();
};

export const checkPassword = (input) => {
    return input === getPassword();
};
