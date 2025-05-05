import { Controller, Get, Param } from '@nestjs/common';
import { HistoryUsersService } from './history-users.service';

@Controller('history-users')
export class HistoryUsersController {
  constructor(private readonly historyUsersService: HistoryUsersService) {}

  @Get(':uid')
  async getUserHistory(@Param('uid') uid: string) {
    return await this.historyUsersService.getUserLoginHistory(uid);
  }
  @Get()
  async getAllHistory() {
    return await this.historyUsersService.getAllLoginHistory();
  }
}
