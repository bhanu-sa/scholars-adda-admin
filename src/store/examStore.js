import { create } from 'zustand';
import { createExam, updateExam, deleteExam, getExam, getAllExams } from '../services/api';

const useExamStore = create((set) => ({
  exams: [],
  currentExam: null,
  loading: false,
  error: null,

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  createNewExam: async (examData) => {
    try {
      set({ loading: true, error: null });
      const response = await createExam(examData);
      set((state) => ({
        exams: [...state.exams, response],
        loading: false
      }));
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateExam: async (examId, examData) => {
    try {
      set({ loading: true, error: null });
      const response = await updateExam(examId, examData);
      set((state) => ({
        exams: state.exams.map(exam => 
          exam.ID === examId ? response : exam
        ),
        loading: false
      }));
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteExam: async (examId) => {
    try {
      set({ loading: true, error: null });
      await deleteExam(examId);
      set((state) => ({
        exams: state.exams.filter(exam => exam.ID !== examId),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  fetchAllExams: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getAllExams();
     
      const exams = Array.isArray(response) ? response : [];
      set({ exams, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  

  fetchExamById: async (examId) => {
    try {
      set({ loading: true, error: null });
      const exam = await getExam(examId);
      set({ currentExam: exam, loading: false });
      return exam;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  }
}));

export default useExamStore