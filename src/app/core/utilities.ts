/**
 * Join a list of css class names into a className string.
 * @returns A string.
 */
// eslint-disable-next-line import/prefer-default-export
export const getClassNameString = (...params: (string | null | undefined)[]): string => {
    const classNamesArray: string[] = [];

    params.forEach((item) => {
        // Ignore null values
        if (item !== null && typeof item !== "undefined" && item !== "") {
            if (item.indexOf(" ") !== -1) {
                // String has space, split by space and add each element individually
                const items = item.split(" ").filter((c) => c !== "");
                classNamesArray.push(...items);
            } else {
                // Singular string (no spaces, a single class name)
                classNamesArray.push(item);
            }
        }
    });

    return classNamesArray.join(" ");
};
