"use client";
import { useForm, SubmitHandler } from "react-hook-form";
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
} from "@mdxeditor/editor";
import { resourceSchema, ResourceType } from "@/types/resource";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useCreateResource } from "@/hooks/useResource";
import { uploadImageToCloudinary } from "@/services/users/profile";
import toast from "react-hot-toast";
import { log } from "next-axiom";
import { useRouter } from "next/navigation";

export default function CreateResource() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ResourceType>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      type: "article",
      category: "technology",
      description: "",
      title: "",
      contentUrl: "",
    },
  });
  const { mutate: createResource, isPending } = useCreateResource();

  const onSubmit: SubmitHandler<ResourceType> = async (data) => {
    console.log("Resource data: ", data);
    try {
      if (!data.contentUrl || data.contentUrl.length === 0) {
        throw new Error("Please select a resource file");
      }

      const file = data.contentUrl[0];
      console.log("File: ", file);

      const resourceUrl = await uploadImageToCloudinary(file);

      createResource(
        { ...data, contentUrl: resourceUrl },
        {
          onSuccess: (data) => {
            toast.success(data.message, {
              style: {
                background: "#000",
                color: "#fff",
              },
              duration: 3000,
              position: "bottom-left",
            });
            reset();
            router.push("/resources");
          },
          onError: (error) => {
            toast.error(`Error creating resource: ${error.message}`);
          },
        }
      );
    } catch (error) {
      log.error("Error creating resource:", error as Error);
    }
  };
 
  const handleDescriptionChange = (content: string) => {
    setValue("description", content);
  };

  return (
    <div className="max-w-full mx-auto p-1.5 md:p-6">
      <h2 className="blue-gradient_text font-semibold drop-shadow-lg text-2xl lg:text-4xl mb-6">
        Create New Resource
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            {...register("title")}
            placeholder="Enter title"
            className="w-full p-2 border rounded"
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>

        <div>
          <label className="block mb-2">Category</label>
          <select
            defaultValue={"select a category"}
            {...register("category")}
            className="w-full p-2 border rounded">
            <option disabled value="">
              Select a category
            </option>
            <option value="technology">Technology</option>
            <option value="conservation-basics">Conservation Basics</option>
            <option value="research">Research</option>
          </select>
          {errors.category && (
            <span className="text-red-500">{errors.category.message}</span>
          )}
        </div>

        <div>
          <label className="block mb-2">Type</label>
          <select
            {...register("type")}
            defaultValue={"Select a type"}
            className="w-full p-2 border rounded">
            <option disabled value="">
              Select a type
            </option>
            <option value="article">Article</option>
            <option value="video">Video</option>
            <option value="course">Course</option>
            <option value="infographic">Infographic</option>
            <option value="pdf">PDF</option>
          </select>
          {errors.type && (
            <span className="text-red-500">{errors.type.message}</span>
          )}
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
  className="min-h-[150px] p-2 prose prose-slate max-w-none [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4"
/>
          </div>
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>

        <div>
          <label className="block mb-2">Resource File (optional)</label>
          <input
            type="file"
            accept="video/*, image/*, application/pdf"
            {...register("contentUrl")}
            className="w-full rounded-md py-2 px-3 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full md:w-auto px-4 py-2 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
          {isPending ? "Creating..." : "Create Resource"}
        </button>
      </form>
    </div>
  );
}
