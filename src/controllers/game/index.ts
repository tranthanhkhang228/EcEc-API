import { Get, Route, Tags, Post, Body, Path, Delete, Put } from 'tsoa';
import { Game } from '../../models';
// import { IStage } from '../../repositories/stage';
import { GameService } from '../../services';

@Route('games')
@Tags('Game')
export default class StageController {
  @Get('/')
  public async getGames(): Promise<Array<Game>> {
    const service = new GameService();
    return service.getGames();
  }

  //   @Post('/')
  //   public async create(@Body() body: IStage): Promise<Stage> {
  //     const service = new StageService();
  //     try {
  //       let stage = service.create(body);
  //       return stage;
  //     } catch (error) {
  //       return error;
  //     }
  //   }

  @Get('/:id')
  public async getGame(@Path() id: string): Promise<Game | null> {
    const service = new GameService();
    return service.getGame(id);
  }

  //   @Put('/')
  //   public async update(@Body() body: IStudent): Promise<Stage | null> {
  //     const service = new StageService();
  //     try {
  //       let stage = service.update(body);
  //       return stage;
  //     } catch (error) {
  //       return error;
  //     }
  //   }

  //   @Delete('/:id')
  //   public async delete(@Path() id: string): Promise<void> {
  //     const service = new StageService();
  //     service.delete(id);
  //   }
}
