import { string } from 'joi';
import { getRepository } from 'typeorm';
import { Registration, Account, ApprovalHistory, Companion } from '../models';

export interface IRegistration {
  accountID: string;
  qualification: string;
  coverLetter: string;
  level: string;
  introduction: string;
}

export interface IApproval {
  registrationID: string;
  accountID: string;
  reason: string;
  status: number;
}

export interface RegistrationRes {
  id: string;
  qualification: string;
  coverLetter: string;
  introduction: string;
  level: string;
  submissionDate: Date;
  status: string;
  reason: string;
}

const mapData = (registration: any) => {
  return {
    id: registration.registration_id,
    qualification: registration.registration_qualification,
    coverLetter: registration.registration_cover_letter,
    introduction: registration.registration_introduction,
    level: registration.registration_level,
    submissionDate: registration.registration_submission_date,
    email: registration.account_email,
    status: registration.approval_history_status,
    reason: registration.approval_history_reason
  };
};

const getRegistrations = async (): Promise<Array<RegistrationRes> | null> => {
  const registrations = await getRepository(Registration)
    .createQueryBuilder('registration')
    .innerJoinAndSelect('registration.account', 'account')
    .leftJoinAndSelect(
      ApprovalHistory,
      'approval_history',
      'approval_history.registration_id = registration.id'
    )
    .getRawMany();
  if (!registrations) return null;

  const res = registrations.map((registration) => mapData(registration));

  return res;
};

const getRegistration = async (id: number): Promise<RegistrationRes | null> => {
  const registration = await getRepository(Registration)
    .createQueryBuilder('registration')
    .innerJoinAndSelect('registration.account', 'account')
    .leftJoinAndSelect(
      ApprovalHistory,
      'approval_history',
      'approval_history.registration_id = registration.id'
    )
    .where('registration.id = :id', { id })
    .getRawOne();

  // const res = {
  //   id: registration.registration_id,
  //   qualification: registration.registration_qualification,
  //   coverLetter: registration.registration_cover_letter,
  //   introduction: registration.registration_introduction,
  //   level: registration.registration_level,
  //   submissionDate: registration.registration_submission_date,
  //   email: registration.account_email,
  //   status: registration.approval_history_status,
  //   reason: registration.approval_history_reason
  // };

  if (!registration) return null;

  const res = mapData(registration);

  return res;
};

const create = async (payload: IRegistration): Promise<Registration | null> => {
  const account = await getRepository(Account).findOne(payload.accountID);

  if (!account) throw new Error("This request couldn't be performed!");

  if (account) {
    const repo = getRepository(Registration);

    const registration = new Registration();

    const tempRegistration = {
      qualification: payload.qualification,
      coverLetter: payload.coverLetter,
      level: payload.level,
      introduction: payload.introduction,
      account: account
    };

    const newRegistration = await repo.save({
      ...registration,
      ...tempRegistration
    });
    return newRegistration;
  }

  return null;
};

const update = async (payload: IApproval): Promise<ApprovalHistory | null> => {
  const account = await getRepository(Account).findOne(payload.accountID);
  const registration = await getRepository(Registration).findOne(
    payload.registrationID
  );

  const approvalHistory = await getRepository(ApprovalHistory).findOne(
    payload.registrationID
  );

  console.log('approvalHistory', approvalHistory);

  if (approvalHistory) {
    throw new Error('This registration has been approved/rejected!');
  }

  if (!account || !registration) {
    throw new Error("This request couldn't be performed!");
  }

  const approvalHistoryRepo = getRepository(ApprovalHistory);

  const approvalHistoryIns = new ApprovalHistory();

  const tempApprovalHistory = {
    reason: payload.reason,
    status: payload.status,
    registration: registration,
    account: account
  };

  const newApprovalHistory = await approvalHistoryRepo.save({
    ...approvalHistoryIns,
    ...tempApprovalHistory
  });

  if (payload.status === 1) {
    const companionRepo = getRepository(Companion);

    const companion = new Companion();

    const tempCompanion = {
      call: 0,
      level: registration.level,
      account: account
    };

    await companionRepo.save({
      ...companion,
      ...tempCompanion
    });
  }

  return newApprovalHistory;
};

export default {
  getRegistrations,
  getRegistration,
  create,
  update
};
