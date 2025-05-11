import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const questionSchema = z.object({
  title: z.string().min(1, 'Question title is required'),
  type: z.string().default('mcq-sa'),
  objective: z.boolean().default(true),
  options: z.array(z.string()).min(4, 'Must provide 4 options'),
  answers: z.array(z.number()).min(1, 'Must select at least one correct answer'),
  explaination: z.string().min(1, 'Explanation is required'),
  tags: z.string().optional(),
  translations: z.object({
    Title: z.array(z.object({
      'hi-IN': z.string(),
      'mr-IN': z.string()
    })),
    Explaination: z.array(z.object({
      'hi-IN': z.string(),
      'mr-IN': z.string()
    }))
  }).optional()
});

const QuestionForm = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: initialData || {
      type: 'mcq-sa',
      objective: true,
      options: ['', '', '', ''],
      answers: [],
      translations: {
        Title: [{
          'hi-IN': '',
          'mr-IN': ''
        }],
        Explaination: [{
          'hi-IN': '',
          'mr-IN': ''
        }]
      }
    }
  });

  const handleFormSubmit = (data) => {
    // Convert option strings to IDs (this would normally come from the backend)
    const optionIds = data.options.map((_, index) => 1088 + index);
    
    const formattedData = {
      ...data,
      options: optionIds,
      answers: [optionIds[0]], // Assuming first option is correct for now
    };
    
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Question Title</label>
        <textarea
          {...register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          rows={3}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Options</label>
        {[0, 1, 2, 3].map((index) => (
          <div key={index}>
            <input
              type="text"
              {...register(`options.${index}`)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              placeholder={`Option ${String.fromCharCode(65 + index)}`}
            />
            {errors.options?.[index] && (
              <p className="text-red-500 text-sm">{errors.options[index].message}</p>
            )}
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Explanation</label>
        <textarea
          {...register('explaination')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          rows={2}
        />
        {errors.explaination && <p className="text-red-500 text-sm">{errors.explaination.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        <input
          type="text"
          {...register('tags')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          placeholder="Enter tags separated by commas"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Translations</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Hindi Title</label>
          <input
            type="text"
            {...register('translations.Title.0.hi-IN')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Marathi Title</label>
          <input
            type="text"
            {...register('translations.Title.0.mr-IN')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Hindi Explanation</label>
          <input
            type="text"
            {...register('translations.Explaination.0.hi-IN')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Marathi Explanation</label>
          <input
            type="text"
            {...register('translations.Explaination.0.mr-IN')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        {initialData ? 'Update Question' : 'Add Question'}
      </button>
    </form>
  );
};

export default QuestionForm;
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';

// const examSchema = z.object({
//   title: z.string().min(1, 'Title is required'),
//   description: z.string().min(1, 'Description is required'),
//   duration: z.number().min(1, 'Duration must be at least 1 minute'),
//   max_score: z.number().min(0, 'Max score cannot be negative'),
//   passing_score: z.number().min(0, 'Passing score cannot be negative'),
//   active: z.boolean().default(false)
// });

// const ExamForm = ({ onSubmit, initialData }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     resolver: zodResolver(examSchema),
//     defaultValues: initialData || {
//       title: '',
//       description: '',
//       duration: 60,
//       max_score: 100,
//       passing_score: 60,
//       active: false
//     }
//   });

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Title</label>
//         <input
//           type="text"
//           {...register('title')}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//         />
//         {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Description</label>
//         <textarea
//           {...register('description')}
//           rows={3}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//         />
//         {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
//           <input
//             type="number"
//             {...register('duration', { valueAsNumber: true })}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//           />
//           {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Max Score</label>
//           <input
//             type="number"
//             {...register('max_score', { valueAsNumber: true })}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//           />
//           {errors.max_score && <p className="text-red-500 text-sm">{errors.max_score.message}</p>}
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Passing Score</label>
//         <input
//           type="number"
//           {...register('passing_score', { valueAsNumber: true })}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//         />
//         {errors.passing_score && <p className="text-red-500 text-sm">{errors.passing_score.message}</p>}
//       </div>

//       <div className="flex items-center">
//         <input
//           type="checkbox"
//           {...register('active')}
//           className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//         />
//         <label className="ml-2 block text-sm text-gray-900">Active</label>
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
//       >
//         {initialData ? 'Update Exam' : 'Create Exam'}
//       </button>
//     </form>
//   );
// };

// export default ExamForm;