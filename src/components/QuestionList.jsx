import React from 'react';

const QuestionList = ({ questions, onEdit, onDelete }) => {
  if (!questions || questions.length === 0) {
    return <div className="text-gray-500 text-center py-8">No questions found</div>;
  }


  const decodeBase64 = (base64String) => {
    try {
      const binaryString = atob(base64String);
      const bytes = Uint8Array.from(binaryString, c => c.charCodeAt(0));
      const decodedString = new TextDecoder('utf-8').decode(bytes);
      return JSON.parse(decodedString);
    } catch (e) {
      return {};
    }
  };

  return (
    <div className="space-y-4">
      {questions.map((question) => {
        const options = question.options || [];
        let translations = {};
        if (question.translations) {
          translations = decodeBase64(question.translations);
        }

        return (
          <div key={question.ID} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{question.title}</h3>
                <p className="mt-1 text-sm text-gray-500">Type: {question.type}</p>
                {question.tags && (
                  <p className="mt-1 text-sm text-gray-500">Tags: {question.tags}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(question)}
                  className="text-orange-600 hover:text-orange-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(question.ID)}
                  className="text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700">Options:</h4>
              <ul className="mt-2 space-y-2">
                {options.map((option, index) => (
                  <li
                    key={option?.id || index}
                    className={`flex items-center space-x-2 text-sm ${
                      question.answers?.includes(option?.id)
                        ? 'text-green-600 font-medium'
                        : 'text-gray-500'
                    }`}
                  >
                    <span>{index + 1}.</span>
                    <span>{option?.text || 'Loading...'}</span>
                    {question.answers?.includes(option?.id) && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        Correct
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {question.explaination && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Explanation:</h4>
                <p className="mt-1 text-sm text-gray-500">{question.explaination}</p>
              </div>
            )}

            {/* Render Translations */}
            {Object.keys(translations).length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Translations:</h4>
                <div className="mt-1 text-sm text-gray-500 space-y-2">
                  {/* Translated Titles */}
                  {translations?.Title && Array.isArray(translations.Title) &&
                    translations.Title.map((entry, index) => (
                      <div key={`title-${index}`}>
                        <strong>Title:</strong>{' '}
                        {Object.entries(entry).map(([lang, text]) => (
                          <span key={lang} className="ml-2 mr-4">
                            <span className="font-semibold">{lang}:</span> {text}
                          </span>
                        ))}
                      </div>
                    ))}

                  {/* Translated Explanations */}
                  {translations?.Explaination && Array.isArray(translations.Explaination) &&
                    translations.Explaination.map((entry, index) => (
                      <div key={`explanation-${index}`}>
                        <strong>Explanation:</strong>{' '}
                        {Object.entries(entry).map(([lang, text]) => (
                          <span key={lang} className="ml-2 mr-4">
                            <span className="font-semibold">{lang}:</span> {text}
                          </span>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuestionList;