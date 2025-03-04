
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from "@/components/ui/section-header";
import { CommunityFeed } from "@/components/community/CommunityFeed";
import { ExpertQA } from "@/components/community/ExpertQA";
import { CommunityGroups } from "@/components/community/CommunityGroups";
import { CommunitySidebar } from "@/components/community/CommunitySidebar";

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <div className="container px-4 py-8">
      <SectionHeader
        title="Community"
        description="Connect with others, join groups, and participate in challenges"
        align="left"
      />
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Tabs 
            defaultValue="feed" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="experts">Expert Q&A</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
            </TabsList>
            
            <TabsContent value="feed" className="space-y-4 animate-fade-in">
              <CommunityFeed />
            </TabsContent>
            
            <TabsContent value="experts" className="space-y-6 animate-fade-in">
              <ExpertQA />
            </TabsContent>
            
            <TabsContent value="groups" className="space-y-6 animate-fade-in">
              <CommunityGroups />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <CommunitySidebar />
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
