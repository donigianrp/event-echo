import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AddContentToEvent = async ({ params }: { params: { id: string } }) => {
  <div>
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  </div>;
};

export default AddContentToEvent;
