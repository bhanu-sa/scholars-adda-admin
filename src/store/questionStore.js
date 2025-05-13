

import { create } from 'zustand';
import {
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getExamQuestions,
  getQuestionOptions
} from '../services/api';

const useQuestionStore = create((set, get) => ({
  questions: [],
  questionOptions: {},
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
      set({
        questions: response,
        loading: false
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addNewQuestion: async (examId, questionData) => {
    if (!examId) throw new Error('Exam ID is required');
    set({ loading: true, error: null });
    try {
      const formattedData = {
        title: questionData.title,
        explaination: questionData.explaination || '',
        tags: questionData.tags || '',
        type: questionData.type,
        objective: true,
        options: questionData.options || [],
        answers: questionData.answers || []
      };

      await addQuestion(examId, formattedData);
      await get().fetchExamQuestions(examId);
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateQuestion: async (id, questionData) => {
    if (!id) throw new Error('Question ID is required');
    set({ loading: true, error: null });
    try {
      await updateQuestion(id, questionData);
      const examId = get().questions[0]?.exam_id;
      if (examId) {
        await get().fetchExamQuestions(examId);
      }
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteQuestion: async (questionId) => {
    if (!questionId) throw new Error('Question ID is required');
    set({ loading: true, error: null });
    try {
      await deleteQuestion(questionId);
      const examId = get().questions[0]?.exam_id;
      if (examId) {
        await get().fetchExamQuestions(examId);
      }
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));

export default useQuestionStore;