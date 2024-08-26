export const statusValue = (status: string) => {
    if (status?.toLowerCase() === 'active') {
        return true
    } else if (status?.toLowerCase() === 'nonactive') {
        return false
    }
    return undefined
}
