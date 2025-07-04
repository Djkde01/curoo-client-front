export interface Client {
  id: string;
  idType: IdType;
  idNumber: string;
  name: string;
  surname: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IdType = 'passport' | 'nationalId' | 'driversLicense' | 'other';

export interface CreateClientRequest {
  idType: IdType;
  idNumber: string;
  name: string;
  surname: string;
}

export interface UpdateClientRequest extends CreateClientRequest {
  id: string;
}

export const ID_TYPE_OPTIONS: { value: IdType; label: string }[] = [
  { value: 'nationalId', label: 'National ID' },
  { value: 'passport', label: 'Passport' },
  { value: 'driversLicense', label: "Driver's License" },
  { value: 'other', label: 'Other' },
];
