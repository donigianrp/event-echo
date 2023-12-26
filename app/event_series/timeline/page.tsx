import { Button } from '@/app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const timeline = () => {
  return (
    <div className="flex justify-center pb-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <div className="flex justify-center p-2 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Timeline
        </div>
        <div className="flex">
          <Tabs defaultValue="account" className="w-[800px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              <TabsTrigger value="line">Line Chart</TabsTrigger>
              <TabsTrigger value="pie">Pie Chart</TabsTrigger>
            </TabsList>
            <TabsContent value="bar">
              <Card>
                <CardHeader>
                  <CardTitle>Bar Chart</CardTitle>
                  <CardDescription>(Event Series Name)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-1">
                    <Input id="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="space-y-1">
                    <Input id="username" defaultValue="@peduarte" />
                  </div>
                </CardContent>
                <CardFooter>(Video/Event Name)</CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="line">
              <Card>
                <CardHeader>
                  <CardTitle>Line Chart</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, youll be logged
                    out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Input id="new" type="password" />
                  </div>
                </CardContent>
                <CardFooter>(Event Series Name)</CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="pie">
              <Card>
                <CardHeader>
                  <CardTitle>Line Chart</CardTitle>
                  <CardDescription>A third thing.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Input id="new" type="password" />
                  </div>
                </CardContent>
                <CardFooter>(Event Series Name)</CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default timeline;
