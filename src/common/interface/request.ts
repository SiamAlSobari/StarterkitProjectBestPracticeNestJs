import { Request as ExpressRequest } from "express";

export interface AuthRequest extends ExpressRequest {
  user: {
    id: string;
  };
}
