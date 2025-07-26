export type EditScholarshipTypes = {
  scholarshipId: string;
  scholarshipTitle: string;
  scholarshipProvider: string;
  scholarshipDealine: string;
  scholarshipDescription: string;
  scholarshipAmount: string;
  scholarshipLimit: string;
};
export type UserProfileTypes = {
  //Personal
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  //Contact
  email: string;
  contactNumber: string;
  address: string;
  //Academic
  studentId: string;
  course: string;
  yearLevel: string;
  section: string;
  password: string;
};
