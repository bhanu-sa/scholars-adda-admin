
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';

// const examSchema = z.object({
//   title: z.string().min(1, 'Title is required'),
//   description: z.string().min(1, 'Description is required'),
//   instructions: z.string().min(1, 'Instructions are required'),
//   totalQuestions: z.string().transform(val => Number(val)).pipe(z.number().min(1, 'Must have at least 1 question')),
//   maxScore: z.string().transform(val => Number(val)).pipe(z.number().min(1, 'Maximum score is required')),
//   duration: z.string().transform(val => Number(val)).pipe(z.number().min(1, 'Duration is required')),
//   markingScheme: z.string(),
//   publishedAt: z.string(),
//   paid: z.boolean(),
//   amount: z.string().transform(val => Number(val)).pipe(z.number()),
//   syllabus: z.string(),
//   regulations: z.string(),
//   languages: z.string(),
// });

// const ExamForm = ({ onSubmit, initialData }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(examSchema),
//     defaultValues: initialData || {
//       paid: false,
//       amount: '0',
//       marking_scheme: 'negative',
//     },
//   });

//   const handleFormSubmit = (data) => {
//     onSubmit(data); // No need to convert numbers manually as Zod handles it
//   };

//   return (
//     <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 max-w-2xl mx-auto p-6">
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
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//         />
//         {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Instructions</label>
//         <textarea
//           {...register('instructions')}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//         />
//         {errors.instructions && <p className="text-red-500 text-sm">{errors.instructions.message}</p>}
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Total Questions</label>
//           <input
//             type="number"
//             {...register('totalQuestions')}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//           />
//           {errors.totalQuestions && <p className="text-red-500 text-sm">{errors.totalQuestions.message}</p>}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Maximum Score</label>
//           <input
//             type="number"
//             {...register('maxScore')}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//           />
//           {errors.v && <p className="text-red-500 text-sm">{errors.maxScore.message}</p>}
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
//           <input
//             type="number"
//             {...register('duration')}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//           />
//           {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Published At</label>
//           <input
//             type="datetime-local"
//             {...register('publishedAt')}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//           />
//           {errors.publishedAt && <p className="text-red-500 text-sm">{errors.publishedAt.message}</p>}
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Marking Scheme</label>
//         <select
//           {...register('markingScheme')}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//         >
//           <option value="negative">Negative</option>
//           <option value="positive">Positive</option>
//         </select>
//       </div>

//       <div className="flex items-center gap-4">
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             {...register('paid')}
//             className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
//           />
//           <label className="ml-2 block text-sm text-gray-700">Paid Exam</label>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Amount</label>
//           <input
//             type="number"
//             {...register('amount')}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Syllabus</label>
//         <textarea
//           {...register('syllabus')}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Regulations</label>
//         <textarea
//           {...register('regulations')}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Languages</label>
//         <input
//           type="text"
//           {...register('languages')}
//           placeholder="e.g., English, Hindi"
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//         />
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
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const examSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  instructions: z.string().min(1, 'Instructions are required'),
  totalQuestions: z.number().min(1, 'Must have at least 1 question'),
  maxScore: z.number().min(1, 'Maximum score is required'),
  duration: z.number().min(1, 'Duration is required'),
  markingScheme: z.string(),
  publishedAt: z.string(),
  paid: z.boolean(),
  amount: z.number(),
  syllabus: z.string(),
  regulations: z.string(),
  languages: z.string(),
});

const ExamForm = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(examSchema),
    defaultValues: initialData ? {
      ...initialData,
      totalQuestions: initialData.total_questions,
      maxScore: initialData.max_score,
      markingScheme: initialData.marking_scheme,
      publishedAt: initialData.published_at,
    } : {
      paid: false,
      amount: 0,
      markingScheme: 'negative',
      totalQuestions: '',
      maxScore: '',
      duration: '',
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit({
      ...data,
      total_questions: data.totalQuestions,
      max_score: data.maxScore,
      marking_scheme: data.markingScheme,
      published_at: data.publishedAt,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 max-w-2xl mx-auto p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          {...register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Instructions</label>
        <textarea
          {...register('instructions')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
        {errors.instructions && <p className="text-red-500 text-sm">{errors.instructions.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Total Questions</label>
          <input
            type="number"
            {...register('totalQuestions', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
          {errors.totalQuestions && <p className="text-red-500 text-sm">{errors.totalQuestions.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Maximum Score</label>
          <input
            type="number"
            {...register('maxScore', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
          {errors.maxScore && <p className="text-red-500 text-sm">{errors.maxScore.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
          <input
            type="number"
            {...register('duration', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
          {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Published At</label>
          <input
            type="datetime-local"
            {...register('publishedAt')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
          {errors.publishedAt && <p className="text-red-500 text-sm">{errors.publishedAt.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Marking Scheme</label>
        <select
          {...register('markingScheme')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        >
          <option value="negative">Negative</option>
          <option value="positive">Positive</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('paid')}
            className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
          />
          <label className="ml-2 block text-sm text-gray-700">Paid Exam</label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            {...register('amount', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Syllabus</label>
        <textarea
          {...register('syllabus')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Regulations</label>
        <textarea
          {...register('regulations')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Languages</label>
        <input
          type="text"
          {...register('languages')}
          placeholder="e.g., English, Hindi"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        {initialData ? 'Update Exam' : 'Create Exam'}
      </button>
    </form>
  );
};

export default ExamForm;