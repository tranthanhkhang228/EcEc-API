import { Get, Route, Tags, Post, Body, Path, Put } from 'tsoa';
import { ApprovalHistory, Registration } from '../../models';
import {
  IRegistration,
  IApproval,
  RegistrationRes
} from '../../repositories/registration';
import { RegistrationService } from '../../services';

@Route('registrations')
@Tags('Registration')
export default class RegistrationController {
  @Get('/')
  public async getRegistrations(): Promise<Array<RegistrationRes> | null> {
    const service = new RegistrationService();
    return service.getRegistrations();
  }

  @Post('/')
  public async createRegistration(
    @Body() body: IRegistration
  ): Promise<Registration | null> {
    const service = new RegistrationService();
    try {
      let registration = service.create(body);
      return registration;
    } catch (error) {
      return error;
    }
  }

  @Get('/:id')
  public async getRegistration(
    @Path() id: string
  ): Promise<RegistrationRes | null> {
    const service = new RegistrationService();
    return service.getRegistration(id);
  }

  @Put('/')
  public async updateRegistration(
    @Body() body: IApproval
  ): Promise<ApprovalHistory | null> {
    const service = new RegistrationService();
    try {
      let registration = service.update(body);
      return registration;
    } catch (error) {
      return error;
    }
  }
}
