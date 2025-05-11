
import React, { useEffect, useState } from 'react';
import useExamStore from '../store/examStore';
import ExamForm from '../components/assessments/AssessmentList';

const AssessmentManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const { exams, loading, error, fetchAllExams, createNewExam, updateExam, deleteExam } = useExamStore();

  useEffect(() => {
    fetchAllExams();
  }, []);

  const handleCreateExam = async (examData) => {
    try {
      // debugger
      await createNewExam(examData);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create exam:', error);
    }
  };

  const handleUpdateExam = async (data) => {
    try {
      await updateExam(selectedExam.ID, data);
      setShowForm(false);
      setSelectedExam(null);
    } catch (error) {
      console.error('Failed to update exam:', error);
    }
  };

  const handleDeleteExam = async (examId) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      try {
        await deleteExam(examId);
      } catch (error) {
        console.error('Failed to delete exam:', error);
      }
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Assessment Management</h2>
        <button
          onClick={() => {
            setSelectedExam(null);
            setShowForm(true);
          }}
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
        >
          Create New Exam
        </button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">
              {selectedExam ? 'Edit Exam' : 'Create New Exam'}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setSelectedExam(null);
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
          <ExamForm
            onSubmit={selectedExam ? handleUpdateExam : handleCreateExam}
            initialData={selectedExam}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Questions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Max Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(exams) && exams.map((exam) => (
                <tr key={exam.ID}>
                  <td className="px-6 py-4 whitespace-nowrap">{exam.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{exam.total_questions}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{exam.max_score}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{exam.duration} mins</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      exam.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {exam.active ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedExam(exam);
                        setShowForm(true);
                      }}
                      className="text-orange-600 hover:text-orange-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteExam(exam.ID)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssessmentManagement;