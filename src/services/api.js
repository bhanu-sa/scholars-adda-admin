import axios from 'axios';
import useAuthStore from '../store/authStore';
import { convertToSnakeCase } from '../utills/caseConverter';

const api = axios.create({
  baseURL: 'http://sa-back/api/v1',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('API Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const sendOtp = async (email, version) => {
  try {
    const res = await api.get('/genEmailLoginOtp', {
      params: { email, version }
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (identifier, otp) => {
    
  try {
    const res = await api.get('/verifyLoginOtp', {
      params: { 
        identifier, 
        otp: otp.toString() // Ensure OTP is sent as string
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
};


export const getCurrentUser = async () => {
  try {
    const res = await api.get('/user/me', {
      params: { version: '2.4.9' }
    });
    console.log('Get User Response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Get User Error:', error.response?.data);
    throw error;
  }
};







// export const createExam = async (examData) => {
//   try {
//     const response = await api.post('/admin/exam/create', {
//       ...examData,
//       published_at: new Date().toISOString(),
//       result_declared: false,
//       evaluation: false,
//       enrolled_students: null,
//       excel: "",
//       questions: null,
//       common_id: "",
//     });
//     return response.data;
    
//   } catch (error) {
//     throw error;
//   }
// };



// export const createExam = async (examData) => {
//   try {
//     const payload = {
//       ...examData,
//       publishedAt: examData.publishedAt || new Date().toISOString(),
//       resultDeclared: false,
//       evaluation: false,
//       enrolledStudents: [],
//       excel: "",
//       questions: [],
//       commonId: "",
//     };

//     const response = await api.post('/admin/exam/create', payload);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error?.response?.data || error.message);
//     throw error;
//   }
// };

function objectToFormData(obj) {
  const formData = new FormData();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      formData.append(key, obj[key]);
    }
  }
  return formData;
}
export const createExam = async (examData) => {
  try {
    const snakeCaseData = examData;
    const payload = {
      ...snakeCaseData,
      publishedAt: snakeCaseData.published_at || new Date().toISOString(),
      resultDeclared: false,
      evaluation: false,
      enrolledStudents: [],
      excel: "",
      questions: null,
      commonId: "",
    };

    // const response = await api.post('/admin/exam/create', payload);
        const formData = objectToFormData(payload);

    const response = await api.post('/admin/exam/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error?.response?.data || error.message);
    throw error;
  }
};



export const updateExam = async (examId, examData) => {
  try {
    const response = await api.put(`/admin/exam/updateExam?exam_id=${examId}`, examData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteExam = async (examId) => {
  try {
    const response = await api.delete(`/admin/exam/deleteExam?exam_id=${examId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getExam = async (examId) => {
  try {
    const response = await api.get(`/admin/exam/getExam?exam_id=${examId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllExams = async () => {
  try {
    const response = await api.get('/admin/exam/getAllExams');
    return response.data;
  } catch (error) {
    throw error;
  }
};



// Question APIs
export const addQuestion = async (examId, questionData) => {
  try {
    const response = await api.post(`/admin/exam/addQuestion?exam_id=${examId}`, questionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateQuestion = async (questionId, questionData) => {
  try {
    const response = await api.put(`/admin/exam/updateQuestion?id=${questionId}`, questionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    const response = await api.delete(`/admin/exam/deleteQuestion?id=${questionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getExamQuestions = async (examId) => {
  try {
    const response = await api.get(`/admin/exam/getExamQuestions?exam_id=${examId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// export const createExam = async (examData) => {
//   const payload = {
//     ...examData,
//     published_at: new Date().toISOString(),
//     result_declared: false,
//     evaluation: false,
//     enrolled_students: null,
//     excel: '',
//     questions: null,
//     common_id: '',
//   };
//   const response = await api.post('/admin/exam/create', payload);
//   return response.data;
// };

// export const updateExam = async (examId, examData) => {
//   const response = await api.put(
//     `/admin/exam/updateExam?exam_id=${examId}`,
//     examData
//   );
//   return response.data;
// };

// export const deleteExam = async (examId) => {
//   const response = await api.delete(`/admin/exam/deleteExam?exam_id=${examId}`);
//   return response.data;
// };

// export const getExam = async (examId) => {
//   const response = await api.get(`/admin/exam/getExam?exam_id=${examId}`);
//   return response.data;
// };

// export const getAllExams = async () => {
//   const response = await api.get('/admin/exam/getAllExams');
//   return response.data;
// };
export const renewToken = async () => {
  try {
    const res = await api.post('/renewToken');
    return res;
  } catch (error) {
    throw error;
  }
};

export default api;