export const GENDER_OPTIONS = [
  { value: "M", label: { vi: "Nam", en: "Male" } },
  { value: "F", label: { vi: "Nữ", en: "Female" } },
];

export const TITLE_OPTIONS = [
  { value: "P0", label: { vi: "Bác sĩ", en: "Doctor" } },
  { value: "P1", label: { vi: "Thạc sĩ", en: "Master" } },
  { value: "P2", label: { vi: "Tiến sĩ", en: "Doctor" } },
  { value: "P3", label: { vi: "Phó giáo sư", en: "Associate Professor" } },
  { value: "P4", label: { vi: "Giáo sư", en: "Professor" } },
  { value: "P5", label: { vi: "Khác", en: "Other" } },
];

export const ROLE_OPTIONS = [
  { value: "R0", label: { vi: "Siêu quản trị", en: "Super admin" } },
  { value: "R1", label: { vi: "Quản trị viên", en: "Admin" } },
  { value: "R2", label: { vi: "Bác sĩ", en: "Doctor" } },
  { value: "R3", label: { vi: "Bệnh nhân", en: "Patient" } },
  { value: "R4", label: { vi: "Nhân viên y tế", en: "Healthcare staff" } },
];

export const PRICES_OPTIONS = [
  { value: "PRI1", label: { vi: "200000", en: "10" } },
  { value: "PRI2", label: { vi: "250000", en: "15" } },
  { value: "PRI3", label: { vi: "300000", en: "20" } },
  { value: "PRI4", label: { vi: "350000", en: "25" } },
  { value: "PRI5", label: { vi: "400000", en: "30" } },
  { value: "PRI6", label: { vi: "450000", en: "35" } },
  { value: "PRI7", label: { vi: "500000", en: "40" } },
];

export const CRUD_ACTIONS = {
  CREATE: "CREATE",
  EDIT: "EDIT",
  DELETE: "DELETE",
  READ: "READ",
};

export const TIMELINE_OPTIONS = [
  { value: "T1", label: { vi: "8:00 - 9:00", en: "8:00 AM - 9:00 AM" } },
  { value: "T2", label: { vi: "9:00 - 10:00", en: "9:00 AM - 10:00 AM" } },
  { value: "T3", label: { vi: "10:00 - 11:00", en: "10:00 AM - 11:00 AM" } },
  { value: "T4", label: { vi: "11:00 - 12:00", en: "11:00 AM - 0:00 PM" } },
  { value: "T5", label: { vi: "13:00 - 14:00", en: "1:00 PM - 2:00 PM" } },
  { value: "T6", label: { vi: "14:00 - 15:00", en: "2:00 PM - 3:00 PM" } },
  { value: "T7", label: { vi: "15:00 - 16:00", en: "3:00 PM - 4:00 PM" } },
  { value: "T8", label: { vi: "16:00 - 17:00", en: "4:00 PM - 5:00 PM" } },
];

export const USER_ROLES = {
  ADMIN: "R1",
  DOCTOR: "R2",
  PATIENT: "R3",
  STAFF: "R4",
};
