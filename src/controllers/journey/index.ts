import { Get, Route, Tags, Post, Body, Path, Delete, Put } from 'tsoa';
import { Journey } from '../../models';
import { IResult } from '../../repositories/journey';
import { JourneyService } from '../../services';

@Route('journeys')
@Tags('Journey')
export default class JourneyController {
  @Get('/')
  public async getJourneys(): Promise<Array<Journey>> {
    const service = new JourneyService();
    return service.getJourneys();
  }

  @Get('/:id')
  public async getJourney(@Path() id: string): Promise<Journey | null> {
    const service = new JourneyService();
    return service.getJourney(id);
  }

  @Post('/')
  public async createResult(@Body() result: IResult): Promise<void> {
    const service = new JourneyService();
    service.createResult(result);
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
