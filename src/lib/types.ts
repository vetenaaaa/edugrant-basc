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
  userId: string;
  userPassword: string;
  //Personal
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  //Contact
  studentEmail: string;
  contactNumber: string;
  address: string;
  //Academic
  studentId: string;
  password: string;
  studentCourseYearSection: string[];
};
