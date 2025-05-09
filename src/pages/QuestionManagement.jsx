
import  { useEffect, useState } from 'react';
import useQuestionStore from '../store/questionStore';
import useExamStore from '../store/examStore';
import QuestionForm from '../components/QuestionForm';
import QuestionList from '../components/QuestionList';

const ExamManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedExamId, setSelectedExamId] = useState(null);
  
  const { questions, loading, error, fetchExamQuestions, addNewQuestion, updateQuestion, deleteQuestion } = useQuestionStore();
  const { exams, currentExam, fetchAllExams, fetchExamById } = useExamStore();

  useEffect(() => {
    fetchAllExams();
  }, []);

  useEffect(() => {
    if (selectedExamId) {
      fetchExamById(selectedExamId);
      fetchExamQuestions(selectedExamId);
    }
  }, [selectedExamId]);

  const handleCreateQuestion = async (data) => {
    try {
      await addNewQuestion(selectedExamId, data);
      setShowForm(false);
      fetchExamQuestions(selectedExamId);
    } catch (error) {
      console.error('Failed to create question:', error);
    }
  };

  const handleUpdateQuestion = async (data) => {
    try {
      await updateQuestion(selectedQuestion.ID, data);
      setShowForm(false);
      setSelectedQuestion(null);
      fetchExamQuestions(selectedExamId);
    } catch (error) {
      console.error('Failed to update question:', error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await deleteQuestion(questionId);
        fetchExamQuestions(selectedExamId);
      } catch (error) {
        console.error('Failed to delete question:', error);
      }
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      {/* Exam Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Exam
        </label>
        <select
          value={selectedExamId || ''}
          onChange={(e) => setSelectedExamId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        >
          <option value="">Select an exam</option>
          {exams.map((exam) => (
            <option key={exam.ID} value={exam.ID}>
              {exam.title}
            </option>
          ))}
        </select>
      </div>

      {selectedExamId && (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Question Management</h2>
              {currentExam && (
                <p className="text-gray-600">Exam: {currentExam.title}</p>
              )}
            </div>
            <button
              onClick={() => {
                setSelectedQuestion(null);
                setShowForm(true);
              }}
              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
            >
              Add New Question
            </button>
          </div>

          {showForm ? (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  {selectedQuestion ? 'Edit Question' : 'Add New Question'}
                </h3>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setSelectedQuestion(null);
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>
              <QuestionForm
                onSubmit={selectedQuestion ? handleUpdateQuestion : handleCreateQuestion}
                initialData={selectedQuestion}
              />
            </div>
          ) : (
            <QuestionList
              questions={questions}
              onEdit={(question) => {
                setSelectedQuestion(question);
                setShowForm(true);
              }}
              onDelete={handleDeleteQuestion}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ExamManagement;