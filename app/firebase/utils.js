import { collection, addDoc } from 'firebase/firestore';
import { db } from './config';

export async function submitContactForm(formData) {
  try {
    const docRef = await addDoc(collection(db, 'contact_submissions'), {
      ...formData,
      timestamp: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: error.message };
  }
}

export async function submitCareerApplication(applicationData) {
  try {
    const docRef = await addDoc(collection(db, 'job_applications'), applicationData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting job application:', error);
    return { success: false, error: error.message };
  }
}

export async function submitEnquiryForm(enquiryData) {
  try {
    const docRef = await addDoc(collection(db, 'project_enquiries'), {
      ...enquiryData,
      timestamp: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    return { success: false, error: error.message };
  }
}
