
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FitnessGroup } from "@/components/community/FitnessGroup";

export function CommunityGroups() {
  // Sample groups data
  const groups = [
    {
      name: "Weight Loss Support",
      description: "A supportive community for those on a weight loss journey. Share tips, celebrate victories, and stay motivated together.",
      memberCount: 1250,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=150&q=80",
      tags: ["WeightLoss", "Support", "Motivation"],
      isJoined: true
    },
    {
      name: "Runners Club",
      description: "For beginners and seasoned runners alike. Training plans, race information, and running buddies.",
      memberCount: 876,
      image: "https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=150&q=80",
      tags: ["Running", "Training", "Races"],
      isJoined: false
    },
    {
      name: "Vegetarian Recipes",
      description: "Exchange delicious and nutritious vegetarian recipes, cooking tips, and meal planning ideas.",
      memberCount: 943,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=150&q=80",
      tags: ["Vegetarian", "Recipes", "Cooking"],
      isJoined: false
    },
    {
      name: "Yoga & Mindfulness",
      description: "Connect with others interested in yoga, meditation, and mindful living practices for overall wellbeing.",
      memberCount: 1105,
      image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=150&q=80",
      tags: ["Yoga", "Meditation", "Mindfulness"],
      isJoined: false
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Fitness Groups</h2>
        <Button variant="outline" size="sm" className="gap-1">
          <Plus className="h-4 w-4" />
          Create Group
        </Button>
      </div>
      
      <div className="space-y-4">
        {groups.map((group, i) => (
          <FitnessGroup key={i} {...group} />
        ))}
      </div>
      
      <Button variant="outline" className="w-full">
        Browse All Groups
      </Button>
    </div>
  );
}
