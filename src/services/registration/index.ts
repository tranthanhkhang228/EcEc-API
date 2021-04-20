import { ApprovalHistory, Registration } from '../../models';
import { RegistrationRepo } from '../../repositories';
import {
  IRegistration,
  IApproval,
  RegistrationRes
} from '../../repositories/registration';

export default class RegistrationService {
  public async getRegistrations(): Promise<Array<RegistrationRes> | null> {
    return RegistrationRepo.getRegistrations();
  }

  public async create(body: IRegistration): Promise<Registration | null> {
    try {
      const registration = RegistrationRepo.create(body);
      return registration;
    } catch (error) {
      return error;
    }
  }

  public async getRegistration(id: string): Promise<RegistrationRes | null> {
    return RegistrationRepo.getRegistration(Number(id));
  }

  public async update(body: IApproval): Promise<ApprovalHistory | null> {
    try {
      const registration = RegistrationRepo.update(body);
      return registration;
    } catch (error) {
      return error;
    }
  }
}
