
import { Calendar, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExpertSession } from "@/components/community/ExpertSession";

export function ExpertQA() {
  // Sample expert sessions data
  const expertSessions = [
    {
      expert: {
        name: "Dr. Lisa Rodriguez",
        title: "Cardiologist, MD",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80",
        specialty: "Heart Health",
      },
      topic: "Cardio Exercise & Heart Health: Myths vs Facts",
      date: "Today",
      time: "7:00 PM - 8:00 PM EST",
      attendees: 156,
      isLive: true
    },
    {
      expert: {
        name: "Jake Williams",
        title: "Certified Personal Trainer",
        avatar: "https://images.unsplash.com/photo-1506919258185-6078bba55d2a?auto=format&fit=crop&w=150&q=80",
        specialty: "Strength Training",
      },
      topic: "Building Muscle: The Right Way to Lift",
      date: "Aug 23, 2023",
      time: "6:30 PM - 7:30 PM EST",
      attendees: 89
    },
    {
      expert: {
        name: "Dr. Maya Patel",
        title: "Nutritionist, PhD",
        avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=150&q=80",
        specialty: "Plant-Based Nutrition",
      },
      topic: "Plant-Based Proteins: Complete Nutrition Guide",
      date: "Aug 15, 2023",
      time: "5:00 PM - 6:00 PM EST",
      attendees: 205,
      recording: "#"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Expert Q&A Sessions</h2>
        <Button variant="outline" size="sm" className="gap-1">
          <Calendar className="h-4 w-4" />
          View Schedule
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {expertSessions.map((session, i) => (
          <ExpertSession key={i} {...session} />
        ))}
      </div>
      
      <Card className="p-4 bg-muted/50 border-dashed">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-primary/10 p-3">
            <Video className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">Have an expert topic suggestion?</h3>
            <p className="text-sm text-muted-foreground">
              Let us know what health or fitness topics you'd like to learn more about.
            </p>
          </div>
          <Button size="sm">Suggest Topic</Button>
        </div>
      </Card>
    </div>
  );
}
