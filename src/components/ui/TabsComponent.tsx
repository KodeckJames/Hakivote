import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import PresidentResults from '@/components/AspirantGroups/President'
import GovernorResults from '@/components/AspirantGroups/Governor'
import MPResults from '@/components/AspirantGroups/MP'
import MCAResults from '@/components/AspirantGroups/MCA'

export default function TabsComponent() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">President</TabsTrigger>
        <TabsTrigger value="tab2">Governor</TabsTrigger>
        <TabsTrigger value="tab3">MP</TabsTrigger>
        <TabsTrigger value="tab4">MCA</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <PresidentResults />
      </TabsContent>
      <TabsContent value="tab2">
        <GovernorResults />
      </TabsContent>
      <TabsContent value="tab3">
        <MPResults />
      </TabsContent>
      <TabsContent value="tab4">
        <MCAResults />
      </TabsContent>
    </Tabs>
  )
}
