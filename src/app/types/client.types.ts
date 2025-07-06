export interface Client {
  id?: string | number;
  idType: IdType;
  idNumber: string;
  name: string;
  surname: string;
  firstName?: string; // Keep for backward compatibility
  lastName?: string; // Keep for backward compatibility
  email?: string;
  phoneNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IdType =
  | 'CC'
  | 'CE'
  | 'passport'
  | 'nationalId'
  | 'driversLicense'
  | 'other';

export interface CreateClientRequest {
  idType: IdType;
  idNumber: string;
  name: string;
  surname: string;
}

export interface UpdateClientRequest extends CreateClientRequest {
  id: string | number;
}

export const ID_TYPE_OPTIONS: { value: IdType; label: string }[] = [
  { value: 'CC', label: 'Cédula de Ciudadanía (CC)' },
  { value: 'CE', label: 'Cédula de Extranjería (CE)' },
  { value: 'passport', label: 'Passport' },
  { value: 'nationalId', label: 'National ID' },
  { value: 'driversLicense', label: "Driver's License" },
  { value: 'other', label: 'Other' },
];
