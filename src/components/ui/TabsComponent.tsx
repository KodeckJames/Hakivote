import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Text } from 'react-native'

export default function TabsComponent() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <Text>Content for Tab 1</Text>
      </TabsContent>
      <TabsContent value="tab2">
        <Text>Content for Tab 2</Text>
      </TabsContent>
      <TabsContent value="tab3">
        <Text>Content for Tab 3</Text>
      </TabsContent>
    </Tabs>
  )
}
