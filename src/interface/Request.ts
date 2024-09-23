import { Request } from "express";

export interface RequestWithAccessToken extends Request {
    userId?: string
}