


import { create } from 'zustand';
import { addQuestion, updateQuestion, deleteQuestion, getExamQuestions } from '../services/api';;

const useQuestionStore = create((set) => ({
  questions: [],
  loading: false,
  error: null,

  fetchExamQuestions: async (examId) => {
    if (!examId) {
      set({ error: 'Exam ID is required' });
      return;
    }

    set({ loading: true, error: null });
    try {
      const response = await getExamQuestions(examId);
      set({ questions: response, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addNewQuestion: async (examId, questionData) => {
    if (!examId) {
      throw new Error('Exam ID is required');
    }

    set({ loading: true, error: null });
    try {
      await addQuestion(examId, questionData);
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateQuestion: async (questionId, questionData) => {
    if (!questionId) {
      throw new Error('Question ID is required');
    }

    set({ loading: true, error: null });
    try {
      await updateQuestion(questionId, questionData);
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteQuestion: async (questionId) => {
    if (!questionId) {
      throw new Error('Question ID is required');
    }

    set({ loading: true, error: null });
    try {
      await deleteQuestion(questionId);
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));

export default useQuestionStore;