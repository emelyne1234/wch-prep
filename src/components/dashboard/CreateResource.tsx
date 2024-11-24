'use client'
import { useState } from 'react';
import { 
  MDXEditor, 
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  // boldPlugin,
  // italicPlugin,
  linkPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  ListsToggle,
} from '@mdxeditor/editor'

const CreateResource = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    type: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDescriptionChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      description: content
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-full mx-auto p-1.5 md:p-6">
      <h2 className="blue-gradient_text font-semibold drop-shadow-lg text-2xl lg:text-4xl mb-6">Create New Resource</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a category</option>
            <option value="technology">Technology</option>
            <option value="conservation-basics">Conservation Basics</option>
            <option value="research">Research</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a type</option>
            <option value="article">Article</option>
            <option value="video">Video</option>
            <option value="course">Course</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <div className="border rounded">
            <MDXEditor 
              onChange={handleDescriptionChange}
              markdown=""
              placeholder="Enter description..."
              plugins={[
                toolbarPlugin({
                  toolbarContents: () => (
                    <>
                      <UndoRedo />
                      <BoldItalicUnderlineToggles />
                      <BlockTypeSelect />
                      <CreateLink />
                      <ListsToggle />
                    </>
                  )
                }),
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                linkPlugin(),
                markdownShortcutPlugin(),
              ]}
              className="min-h-[150px] p-2"
            />
          </div>
        </div>

        <button
            type="submit"
            // disabled={isPending}
            className="w-full md:w-auto px-4 py-2 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
          Create Resource
        </button>
      </form>
    </div>
  );
};

export default CreateResource;