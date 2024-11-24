const validateJobPosting = (jobTitle, company, location, salary) => {
  const errors = {};

  // Validate job title
  if (!jobTitle || typeof jobTitle !== 'string') {
    errors.jobTitle = 'Job title is required';
  } else if (jobTitle.trim().length < 3) {
    errors.jobTitle = 'Job title must be at least 3 characters long';
  } else if (jobTitle.trim().length > 100) {
    errors.jobTitle = 'Job title cannot exceed 100 characters';
  }

  // Validate company name
  if (!company || typeof company !== 'string') {
    errors.company = 'Company name is required';
  } else if (company.trim().length < 2) {
    errors.company = 'Company name must be at least 2 characters long';
  } else if (company.trim().length > 50) {
    errors.company = 'Company name cannot exceed 50 characters';
  }

  // Validate location
  if (!location || typeof location !== 'string') {
    errors.location = 'Location is required';
  } else if (location.trim().length < 2) {
    errors.location = 'Location must be at least 2 characters long';
  } else if (location.trim().length > 100) {
    errors.location = 'Location cannot exceed 100 characters';
  }

  // Validate salary
  const salaryNum = Number(salary);
  if (!salary) {
    errors.salary = 'Salary is required';
  } else if (isNaN(salaryNum)) {
    errors.salary = 'Salary must be a valid number';
  } else if (salaryNum < 0) {
    errors.salary = 'Salary cannot be negative';
  } else if (salaryNum > 1000000000) { // 1 billion limit as sanity check
    errors.salary = 'Salary value is too high';
  }

  // If no errors, return true, otherwise return the errors object
  return Object.keys(errors).length === 0 ? true : errors;
};

export default validateJobPosting;