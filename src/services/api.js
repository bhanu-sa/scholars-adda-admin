
import axios from 'axios';
import useAuthStore from '../store/authStore';

const api = axios.create({
  baseURL: 'http://sa-back/api/v1',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          'http://sa-back/api/v1/renewToken',
          {},
          {
            withCredentials: true,
          }
        );

        const newToken = res.data.token;
        if (newToken) {
          useAuthStore.getState().setToken(newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (err) {
        useAuthStore.getState().logout();
        window.location.href = '/';
        return Promise.reject(err);
      }
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
        otp: otp.toString()
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


export const addQuestion = async (examId, questionData) => {
  try {
    const formData = new URLSearchParams();
    
    // Add basic question data
    formData.append('title', questionData.title || '');
    formData.append('explaination', questionData.explaination || '');
    formData.append('tags', questionData.tags || '');
    formData.append('type', questionData.type || 'mcq-sa');
    formData.append('objective', 'true');

    // Handle options
    if (questionData.options && Array.isArray(questionData.options)) {
      questionData.options.forEach((option, index) => {
        formData.append(`option${index + 1}_text`, option || '');
        formData.append(`option${index + 1}_image`, '');
        formData.append(`option${index + 1}_is_ans`, questionData.answers?.includes(index) ? 'true' : 'false');
      });
    }

    const response = await api.post(`/admin/exam/addQuestion?exam_id=${examId}`, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Add Question Error:', error.response?.data || error.message);
    throw error;
  }
};

export const updateQuestion = async (questionId, questionData) => {
  try {
    const formData = new URLSearchParams();
    formData.append('title', questionData.title || '');
    formData.append('explaination', questionData.explaination || '');
    formData.append('tags', questionData.tags || '');
    formData.append('type', questionData.type || 'mcq-sa');
    formData.append('objective', 'true');

    if (questionData.options && Array.isArray(questionData.options)) {
      questionData.options.forEach((option, index) => {
        formData.append(`option${index + 1}_text`, option || '');
        formData.append(`option${index + 1}_image`, '');
        formData.append(`option${index + 1}_is_ans`, questionData.answers?.includes(index) ? 'true' : 'false');
      });
    }

    const response = await api.put(`/admin/exam/updateQuestion?id=${questionId}`, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Update Question Error:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    const response = await api.delete(`/admin/exam/deleteQuestion?id=${questionId}`);
    return response.data;
  } catch (error) {
    console.error('Delete Question Error:', error.response?.data || error.message);
    throw error;
  }
};

export const getExamQuestions = async (examId) => {
  try {
    const response = await api.get(`/admin/exam/getExamQuestions?exam_id=${examId}`);
    const questions = response.data || [];
    
    const questionsWithOptions = await Promise.all(
      questions.map(async (question) => {
        if (!question.options || !Array.isArray(question.options)) {
          return question;
        }
        
        const optionsData = await Promise.all(
          question.options.map(async (optionId) => {
            try {
              const optionResponse = await getQuestionOptions(optionId);
              return optionResponse || null;
            } catch (error) {
              console.error(`Failed to fetch option ${optionId}:`, error);
              return null;
            }
          })
        );
        
        return {
          ...question,
          options: optionsData.filter(Boolean)
        };
      })
    );
    
    return questionsWithOptions;
  } catch (error) {
    console.error('Get Exam Questions Error:', error.response?.data || error.message);
    throw error;
  }
};

export const getQuestionOptions = async (id) => {
  try {
    const response = await api.get(`/admin/exam/getOption?id=${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch option ${id}:`, error.response?.data || error.message);
    return null;
  }
};


export const renewToken = async () => {
  try {
    const res = await api.post('/renewToken');
    return res;
  } catch (error) {
    throw error;
  }
};

export default api;