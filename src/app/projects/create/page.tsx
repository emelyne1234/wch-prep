import Create from "@/components/dashboard/Create";
import CreateResource from "@/components/dashboard/CreateResource";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CreateProject() {
  return (
    <div className="lg:max-w-[60%] max-w-[90%] mx-auto mt-24">
       <Tabs defaultValue="createProject" className="w-full mb-10">
        <TabsList>
          <TabsTrigger value="createProject">Create a Project</TabsTrigger>
          <TabsTrigger value="createResource">Create a Resources</TabsTrigger>
          
        </TabsList>
        <TabsContent value="createProject">
          <Create />
        </TabsContent>
        <TabsContent value="createResource">
          <CreateResource  />
        </TabsContent>
       </Tabs>
     
    </div>
  );
}
