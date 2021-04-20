import { Get, Route, Tags, Post, Body, Path, Delete, Put } from 'tsoa';
import { Stage } from '../../models';
import { IStage } from '../../repositories/stage';
import { StageService } from '../../services';

@Route('stages')
@Tags('Stage')
export default class StageController {
  @Get('/')
  public async getStages(): Promise<Array<Stage>> {
    const service = new StageService();
    return service.getStages();
  }

  @Post('/')
  public async create(@Body() body: IStage): Promise<Stage> {
    const service = new StageService();
    try {
      let stage = service.create(body);
      return stage;
    } catch (error) {
      return error;
    }
  }

  @Get('/:id')
  public async getStage(@Path() id: string): Promise<Stage | null> {
    const service = new StageService();
    return service.getStage(id);
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

  @Delete('/:id')
  public async delete(@Path() id: string): Promise<void> {
    const service = new StageService();
    service.delete(id);
  }
}
