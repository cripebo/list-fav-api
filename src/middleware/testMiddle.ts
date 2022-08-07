import { Request } from "express";

export function testMiddle(_req: Request, _res: any, next: any) {
    console.log('LOGGED');
    console.log(_req.headers)
    next();
}