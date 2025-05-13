import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const questionSchema = z.object({
  title: z.string().min(1, 'Question title is required'),
  type: z.string().min(1, 'Question type is required'),
  tags: z.string().optional(),
  objective: z.boolean().default(true),
  options: z.array(z.string()).min(2, 'At least 2 options are required'),
  answers: z.array(z.number()).min(1, 'At least one answer must be selected'),
  explaination: z.string().optional(),
  translations: z.object({
    Title: z.array(z.record(z.string())).optional(),
    Explaination: z.array(z.record(z.string())).optional()
  }).optional()
});

function parseTranslations(translations) {
  // If already an object, return as is
  if (!translations) return {
    Title: [{ 'hi-IN': '' }, { 'mr-IN': '' }],
    Explaination: [{ 'hi-IN': '' }, { 'mr-IN': '' }]
  };
  if (typeof translations === 'object') return translations;
  // If base64, decode
  try {
    const binaryString = atob(translations);
    const bytes = Uint8Array.from(binaryString, c => c.charCodeAt(0));
    const decodedString = new TextDecoder('utf-8').decode(bytes);
    return JSON.parse(decodedString);
  } catch {
    return {
      Title: [{ 'hi-IN': '' }, { 'mr-IN': '' }],
      Explaination: [{ 'hi-IN': '' }, { 'mr-IN': '' }]
    };
  }
}
const QuestionForm = ({ onSubmit, initialData }) => {
  // Prepare default values for the form
  const defaultValues = {
    title: '',
    type: 'mcq-sa',
    tags: '',
    objective: true,
    options: ['', '', '', ''],
    answers: [],
    explaination: '',
    translations: {
      Title: [{ 'hi-IN': '' }, { 'mr-IN': '' }],
      Explaination: [{ 'hi-IN': '' }, { 'mr-IN': '' }]
    }
  };

  // If editing, map question data to form fields
  let editValues = defaultValues;
  if (initialData) {
    // Map options: from array of option objects to array of texts
    const options = (initialData.options || []).map(opt => opt?.text || '');
    // Map answers: from array of option IDs to array of option indices
    const answers = (initialData.answers || []).map(answerId =>
      initialData.options.findIndex(opt => opt?.id === answerId)
    ).filter(idx => idx !== -1);

    editValues = {
      ...defaultValues,
      ...initialData,
      options,
      answers,
      translations: parseTranslations(initialData.translations)
    };
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: editValues
  });

  // Reset form when initialData changes (for editing)
  useEffect(() => {
    reset(editValues);
  }, [initialData]);

  const options = watch('options') || [];
  const answers = watch('answers') || [];
  const type = watch('type');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setValue('options', newOptions);
  };

  const handleAnswerToggle = (optionIndex) => {
    if (type === 'mcq-sa') {
      setValue('answers', [optionIndex]);
    } else {
      const currentAnswers = answers || [];
      const newAnswers = currentAnswers.includes(optionIndex)
        ? currentAnswers.filter(a => a !== optionIndex)
        : [...currentAnswers, optionIndex];
      setValue('answers', newAnswers);
    }
  };

  const handleFormSubmit = (data) => {
    // Map answers: from indices to option texts or IDs (let parent handle mapping if needed)
    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Question Title</label>
        <input
          type="text"
          {...register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Question Type</label>
        <select
          {...register('type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        >
          <option value="mcq-sa">Single Answer MCQ</option>
          <option value="mcq-ma">Multiple Answer MCQ</option>
        </select>
        {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        <input
          type="text"
          {...register('tags')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type={type === 'mcq-sa' ? 'radio' : 'checkbox'}
                checked={answers && answers.includes(index)}
                onChange={() => handleAnswerToggle(index)}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
              />
              <input
                type="text"
                value={option || ''}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                placeholder={`Option ${index + 1}`}
              />
            </div>
          ))}
        </div>
        {errors.options && <p className="text-red-500 text-sm">{errors.options.message}</p>}
        {errors.answers && <p className="text-red-500 text-sm">{errors.answers.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Explanation</label>
        <textarea
          {...register('explaination')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Translations</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Title Translations</label>
            <div className="grid grid-cols-2 gap-4 mt-1">
              <div>
                <input
                  type="text"
                  {...register('translations.Title.0.hi-IN')}
                  placeholder="Hindi"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  {...register('translations.Title.1.mr-IN')}
                  placeholder="Marathi"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Explanation Translations</label>
            <div className="grid grid-cols-2 gap-4 mt-1">
              <div>
                <input
                  type="text"
                  {...register('translations.Explaination.0.hi-IN')}
                  placeholder="Hindi"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  {...register('translations.Explaination.1.mr-IN')}
                  placeholder="Marathi"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        {initialData ? 'Update Question' : 'Create Question'}
      </button>
    </form>
  );
};

export default QuestionForm;