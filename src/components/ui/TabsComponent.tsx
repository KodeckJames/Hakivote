import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Text } from 'react-native'
import PresidentResults from '@/components/AspirantGroups/President'

export default function TabsComponent() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">President</TabsTrigger>
        <TabsTrigger value="tab2">Governor</TabsTrigger>
        <TabsTrigger value="tab3">Senator</TabsTrigger>
        <TabsTrigger value="tab4">MCA</TabsTrigger>
        <TabsTrigger value="tab5">Women Rep</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <PresidentResults />
      </TabsContent>
      <TabsContent value="tab2">
        <Text>Content for Tab 2</Text>
      </TabsContent>
      <TabsContent value="tab3">
        <Text>Content for Tab 3</Text>
      </TabsContent>
      <TabsContent value="tab4">
        <Text>Content for Tab 3</Text>
      </TabsContent>
      <TabsContent value="tab5">
        <Text>Content for Tab 3</Text>
      </TabsContent>
    </Tabs>
  )
}
