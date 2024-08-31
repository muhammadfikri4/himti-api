export interface NotificationBodyRequest {
    title: string,
    body: string,
    eventId?: string,
    eventMeetingId?: string
    userId?: string
}