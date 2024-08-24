export const ReturnValue = <T = unknown>(data: T) => {
    if (typeof data !== 'undefined') {
        return data
    }
    return undefined
}