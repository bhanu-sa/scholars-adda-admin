
// import  { useEffect, useState } from 'react';
// import useQuestionStore from '../store/questionStore';
// import useExamStore from '../store/examStore';
// import QuestionForm from '../components/QuestionForm';
// import QuestionList from '../components/QuestionList';

// const ExamManagement = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [selectedQuestion, setSelectedQuestion] = useState(null);
//   const [selectedExamId, setSelectedExamId] = useState(null);
  
//   const { questions, loading, error, fetchExamQuestions, addNewQuestion, updateQuestion, deleteQuestion } = useQuestionStore();
//   const { exams, currentExam, fetchAllExams, fetchExamById } = useExamStore();

//   useEffect(() => {
//     fetchAllExams();
//   }, []);

//   useEffect(() => {
//     if (selectedExamId) {
//       fetchExamById(selectedExamId);
//       fetchExamQuestions(selectedExamId);
//     }
//   }, [selectedExamId]);

//   const handleCreateQuestion = async (data) => {
//     try {
//       await addNewQuestion(selectedExamId, data);
//       setShowForm(false);
//       fetchExamQuestions(selectedExamId);
//     } catch (error) {
//       console.error('Failed to create question:', error);
//     }
//   };

//   const handleUpdateQuestion = async (data) => {
//     try {
//       await updateQuestion(selectedQuestion.ID, data);
//       setShowForm(false);
//       setSelectedQuestion(null);
//       fetchExamQuestions(selectedExamId);
//     } catch (error) {
//       console.error('Failed to update question:', error);
//     }
//   };

//   const handleDeleteQuestion = async (questionId) => {
//     if (window.confirm('Are you sure you want to delete this question?')) {
//       try {
//         await deleteQuestion(questionId);
//         fetchExamQuestions(selectedExamId);
//       } catch (error) {
//         console.error('Failed to delete question:', error);
//       }
//     }
//   };

//   if (loading) return <div className="p-4">Loading...</div>;
//   if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

//   return (
//     <div className="p-6">
//       {/* Exam Selection */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Select Exam
//         </label>
//         <select
//           value={selectedExamId || ''}
//           onChange={(e) => setSelectedExamId(e.target.value)}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//         >
//           <option value="">Select an exam</option>
//           {exams.map((exam) => (
//             <option key={exam.ID} value={exam.ID}>
//               {exam.title}
//             </option>
//           ))}
//         </select>
//       </div>

//       {selectedExamId && (
//         <>
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h2 className="text-2xl font-bold">Question Management</h2>
//               {currentExam && (
//                 <p className="text-gray-600">Exam: {currentExam.title}</p>
//               )}
//             </div>
//             <button
//               onClick={() => {
//                 setSelectedQuestion(null);
//                 setShowForm(true);
//               }}
//               className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
//             >
//               Add New Question
//             </button>
//           </div>

//           {showForm ? (
//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-semibold">
//                   {selectedQuestion ? 'Edit Question' : 'Add New Question'}
//                 </h3>
//                 <button
//                   onClick={() => {
//                     setShowForm(false);
//                     setSelectedQuestion(null);
//                   }}
//                   className="text-gray-600 hover:text-gray-800"
//                 >
//                   ✕
//                 </button>
//               </div>
//               <QuestionForm
//                 onSubmit={selectedQuestion ? handleUpdateQuestion : handleCreateQuestion}
//                 initialData={selectedQuestion}
//               />
//             </div>
//           ) : (
//             <QuestionList
//               questions={questions}
//               onEdit={(question) => {
//                 setSelectedQuestion(question);
//                 setShowForm(true);
//               }}
//               onDelete={handleDeleteQuestion}
//             />
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default ExamManagement;
import React, { useEffect, useState } from 'react';
import useQuestionStore from '../store/questionStore';
import useExamStore from '../store/examStore';
import QuestionForm from '../components/QuestionForm';
import QuestionList from '../components/QuestionList';

const ExamManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [showExamForm, setShowExamForm] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  
  const { questions, loading: questionsLoading, error: questionsError, fetchExamQuestions, addNewQuestion, updateQuestion, deleteQuestion } = useQuestionStore();
  const { exams, loading: examsLoading, error: examsError, fetchAllExams, fetchExamById, createExam, updateExam, deleteExam } = useExamStore();

  useEffect(() => {
    fetchAllExams();
  }, []);

  useEffect(() => {
    if (selectedExamId) {
      fetchExamById(selectedExamId);
      fetchExamQuestions(selectedExamId);
    }
  }, [selectedExamId]);

  const handleCreateExam = async (data) => {
    try {
      await createExam(data);
      setShowExamForm(false);
      fetchAllExams();
    } catch (error) {
      console.error('Failed to create exam:', error);
    }
  };

  const handleUpdateExam = async (data) => {
    try {
      await updateExam(selectedExam.ID, data);
      setShowExamForm(false);
      setSelectedExam(null);
      fetchAllExams();
    } catch (error) {
      console.error('Failed to update exam:', error);
    }
  };

  const handleDeleteExam = async (examId) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      try {
        await deleteExam(examId);
        if (selectedExamId === examId) {
          setSelectedExamId(null);
        }
        fetchAllExams();
      } catch (error) {
        console.error('Failed to delete exam:', error);
      }
    }
  };

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

  if (examsLoading || questionsLoading) return <div className="p-4">Loading...</div>;
  if (examsError || questionsError) return <div className="p-4 text-red-600">Error: {examsError || questionsError}</div>;

  return (
    <div className="p-6">
      {/* Exam Management */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Exam Management</h2>
          <button
            onClick={() => {
              setSelectedExam(null);
              setShowExamForm(true);
            }}
            className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
          >
            Create New Exam
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {exams.map((exam) => (
                <tr key={exam.ID}>
                  <td className="px-6 py-4 whitespace-nowrap">{exam.title}</td>
                  <td className="px-6 py-4">{exam.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedExamId(exam.ID)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Manage Questions
                    </button>
                    <button
                      onClick={() => {
                        setSelectedExam(exam);
                        setShowExamForm(true);
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
      </div>

      {/* Question Management */}
      {selectedExamId && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Question Management</h2>
              <p className="text-gray-600">
                Exam: {exams.find(e => e.ID === selectedExamId)?.title}
              </p>
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
        </div>
      )}
    </div>
  );
};

export default ExamManagement;