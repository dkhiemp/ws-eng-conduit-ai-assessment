// roster.controller.ts

import { Controller, Get } from '@nestjs/common';
import { RosterService } from './roster.service';

@Controller('users')
export class RosterController {
  constructor(private readonly userService: RosterService) {}

  @Get('roster')
  async getRoster(): Promise<Record<string, any>[]> {
    return this.userService.getRosterStats();
  }
}
