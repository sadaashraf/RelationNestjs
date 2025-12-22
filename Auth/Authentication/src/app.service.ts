import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHelo(): string {
    return 'Hellow World!';
  }
}