// validationFile.tsx

// Define a custom Error type
type FileValidationError = {
    error: string;
    isValid: boolean;
  };
  
  // Validate file size for all file types (less than 10MB)
  export function validateFile(file: File): FileValidationError {
    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSizeInBytes) {
      return {
        error: 'File size exceeds the limit (10MB)',
        isValid: false,
      };
    }
    return { error: '', isValid: true };
  }
  
  // Validate file type for 'picture_bank' (all images)
  export function validatePictureBank(file: File): FileValidationError {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedImageTypes.includes(file.type)) {
      return {
        error: 'Invalid file type for picture_bank (allowed: JPEG, PNG, GIF)',
        isValid: false,
      };
    }
    return { error: '', isValid: true };
  }
  
  // Validate file type for 'tone_of_voice' (PDF)
  export function validateToneOfVoice(file: File): FileValidationError {
    if (file.type !== 'application/pdf') {
      return {
        error: 'Invalid file type for tone_of_voice (allowed: PDF)',
        isValid: false,
      };
    }
    return { error: '', isValid: true };
  }
  
  // Validate file type for 'brand_guidelines' (PDF)
  export function validateBrandGuidelines(file: File): FileValidationError {
    if (file.type !== 'application/pdf') {
      return {
        error: 'Invalid file type for brand_guidelines (allowed: PDF)',
        isValid: false,
      };
    }
    return { error: '', isValid: true };
  }
  
  // Validate file type for 'logo' (all image types)
  export function validateLogo(file: File): FileValidationError {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedImageTypes.includes(file.type)) {
      return {
        error: 'Invalid file type for logo (allowed: JPEG, PNG, GIF)',
        isValid: false,
      };
    }
    return { error: '', isValid: true };
  }
  