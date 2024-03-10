export const useIsUndefined = () => {
    return (value: any): boolean => {
        return typeof value === 'undefined';
    }
};
