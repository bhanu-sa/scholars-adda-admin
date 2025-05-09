// import React from 'react';

// const QuestionList = ({ questions, onEdit, onDelete }) => {
//   return (
//     <div className="mt-6">
//       <div className="bg-white shadow overflow-hidden sm:rounded-md">
//         <ul className="divide-y divide-gray-200">
//           {questions.map((question, index) => (
//             <li key={question.id} className="px-4 py-4 sm:px-6">
//               <div className="flex items-center justify-between">
//                 <div className="flex-1">
//                   <h4 className="text-lg font-medium text-gray-900">Question {index + 1}</h4>
//                   <p className="mt-2 text-sm text-gray-600">{question.title}</p>
                  
//                   <div className="mt-2 grid grid-cols-2 gap-4">
//                     {question.options && question.options.map((optionId, idx) => (
//                       <p key={optionId} className={`text-sm ${question.answers.includes(optionId) ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
//                         {String.fromCharCode(65 + idx)}: Option {optionId}
//                       </p>
//                     ))}
//                   </div>
                  
//                   {question.explaination && (
//                     <p className="mt-2 text-sm text-gray-600">
//                       <span className="font-medium">Explanation:</span> {question.explaination}
//                     </p>
//                   )}
                  
//                   {question.tags && (
//                     <p className="mt-2 text-sm text-gray-500">
//                       <span className="font-medium">Tags:</span> {question.tags}
//                     </p>
//                   )}
//                 </div>
                
//                 <div className="ml-4 flex-shrink-0 flex gap-2">
//                   <button
//                     onClick={() => onEdit(question)}
//                     className="text-orange-600 hover:text-orange-900"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => onDelete(question.id)}
//                     className="text-red-600 hover:text-red-900"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default QuestionList;

import React from 'react';

const QuestionList = ({ questions, onEdit, onDelete }) => {
  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No questions found. Add your first question!
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {questions.map((question, index) => (
            <li key={question.ID} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900">Question {index + 1}</h4>
                  <p className="mt-2 text-sm text-gray-600">{question.title}</p>
                  
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    {question.options && question.options.map((optionId, idx) => (
                      <p key={optionId} className={`text-sm ${question.answers.includes(optionId) ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                        {String.fromCharCode(65 + idx)}: Option {optionId}
                      </p>
                    ))}
                  </div>
                  
                  {question.explaination && (
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Explanation:</span> {question.explaination}
                    </p>
                  )}
                  
                  {question.tags && (
                    <p className="mt-2 text-sm text-gray-500">
                      <span className="font-medium">Tags:</span> {question.tags}
                    </p>
                  )}
                </div>
                
                <div className="ml-4 flex-shrink-0 flex gap-2">
                  <button
                    onClick={() => onEdit(question)}
                    className="text-orange-600 hover:text-orange-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(question.ID)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionList;