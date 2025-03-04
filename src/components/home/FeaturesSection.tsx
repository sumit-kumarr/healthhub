
import { Brain, Dumbbell, Heart, Pill, Salad, Users } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";

export function FeaturesSection() {
  return (
    <section id="features" className="section-padding">
      <div className="container px-4">
        <SectionHeader 
          title="Your Complete Wellness Solution"
          description="HealthHub provides a comprehensive approach to health, bringing together all aspects of physical and mental wellbeing."
        />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard 
            icon={Dumbbell}
            title="Personalized Fitness"
            description="Customized workout plans tailored to your goals, fitness level, and preferences."
          />
          <FeatureCard 
            icon={Salad}
            title="Nutrition Guidance"
            description="Balanced meal plans and dietary advice based on your health needs and lifestyle."
          />
          <FeatureCard 
            icon={Brain}
            title="Mental Wellness"
            description="Meditation guides, stress management, and tools to improve mental health."
          />
          <FeatureCard 
            icon={Heart}
            title="Health Condition Support"
            description="Specialized guidance for managing chronic conditions and improving overall health."
          />
          <FeatureCard 
            icon={Pill}
            title="Medication Database"
            description="Comprehensive information about medicines, side effects, and usage guidelines."
          />
          <FeatureCard 
            icon={Users}
            title="Supportive Community"
            description="Connect with others on similar health journeys and share experiences."
          />
        </div>
      </div>
    </section>
  );
}
