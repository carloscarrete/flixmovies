export const truncateText = (text: string, nb?: number): string => {
    return text.length>12 ? text.slice(0,15) + '...' : text
}