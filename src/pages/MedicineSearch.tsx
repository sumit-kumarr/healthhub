import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Pill, Filter, X, FileText, AlertCircle, Thermometer, Brain, Heart, Droplet, Dna, Leaf, Flower, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const MEDICINE_TYPES = [
  "Allopathic",
  "Ayurvedic",
  "Homeopathic",
  "Herbal",
  "Unani",
  "Siddha",
  "Chinese",
  "Naturopathic",
  "Dietary Supplement"
];

const mockMedicines = [
  {
    id: 1,
    name: "Ibuprofen",
    category: "Pain Reliever",
    dosage: "200-400mg",
    condition: "Pain, Fever, Inflammation",
    description: "A nonsteroidal anti-inflammatory drug (NSAID) used for treating pain, fever, and inflammation.",
    instructions: "Take with food to reduce stomach upset. Do not exceed 3200mg per day.",
    sideEffects: ["Stomach pain", "Heartburn", "Nausea", "Dizziness", "Rash"],
    contraindications: ["Heart conditions", "Kidney problems", "History of stomach ulcers"]
  },
  {
    id: 2,
    name: "Amoxicillin",
    category: "Antibiotic",
    dosage: "250-500mg",
    condition: "Bacterial Infections",
    description: "A penicillin antibiotic that fights bacteria in your body. Used to treat many different types of infection.",
    instructions: "Take every 8-12 hours with or without food. Complete the full course as prescribed.",
    sideEffects: ["Diarrhea", "Stomach pain", "Nausea", "Vomiting", "Rash"],
    contraindications: ["Penicillin allergy", "Kidney disease", "Mononucleosis"]
  },
  {
    id: 3,
    name: "Loratadine",
    category: "Antihistamine",
    dosage: "10mg",
    condition: "Allergies",
    description: "An antihistamine that reduces the effects of natural chemical histamine in the body, used to treat allergy symptoms.",
    instructions: "Take once daily. May be taken with or without food.",
    sideEffects: ["Drowsiness", "Dry mouth", "Headache"],
    contraindications: ["Liver disease"]
  },
  {
    id: 4,
    name: "Metformin",
    category: "Antidiabetic",
    dosage: "500-1000mg",
    condition: "Type 2 Diabetes",
    description: "A medication used to treat type 2 diabetes by decreasing glucose production by the liver and increasing insulin sensitivity.",
    instructions: "Take with meals to reduce stomach upset. Do not crush extended-release tablets.",
    sideEffects: ["Nausea", "Diarrhea", "Stomach pain", "Metallic taste"],
    contraindications: ["Kidney disease", "Heart failure", "Liver disease"]
  },
  {
    id: 5,
    name: "Lisinopril",
    category: "ACE Inhibitor",
    dosage: "10-40mg",
    condition: "Hypertension, Heart Failure",
    description: "An ACE inhibitor that is used to treat high blood pressure and heart failure, and to improve survival after heart attacks.",
    instructions: "Take at the same time each day with or without food.",
    sideEffects: ["Dry cough", "Dizziness", "Headache", "Fatigue"],
    contraindications: ["Pregnancy", "History of angioedema", "Kidney disease"]
  },
  {
    id: 6,
    name: "Simvastatin",
    category: "Statin",
    dosage: "10-40mg",
    condition: "High Cholesterol",
    description: "A statin medication that reduces levels of bad cholesterol and triglycerides in the blood while increasing levels of good cholesterol.",
    instructions: "Take in the evening or at bedtime. Avoid grapefruit products.",
    sideEffects: ["Muscle pain", "Liver problems", "Digestive issues", "Headache"],
    contraindications: ["Liver disease", "Pregnancy", "Breastfeeding"]
  },
  {
    id: 7,
    name: "Omeprazole",
    category: "Proton Pump Inhibitor",
    dosage: "20-40mg",
    condition: "Acid Reflux, Ulcers",
    description: "A proton pump inhibitor that decreases the amount of acid produced in the stomach, used to treat various stomach and esophagus problems.",
    instructions: "Take before meals. Swallow capsules whole, do not crush or chew.",
    sideEffects: ["Headache", "Nausea", "Diarrhea", "Stomach pain", "Vitamin B12 deficiency (long-term)"],
    contraindications: ["Liver disease", "Low magnesium levels"]
  },
  {
    id: 8,
    name: "Albuterol",
    category: "Bronchodilator",
    dosage: "2-4 puffs",
    condition: "Asthma, COPD",
    description: "A bronchodilator that relaxes muscles in the airways and increases air flow to the lungs, used to prevent and treat wheezing, shortness of breath.",
    instructions: "Use inhaler as needed. Wait at least 1 minute between inhalations.",
    sideEffects: ["Tremors", "Nervousness", "Headache", "Rapid heartbeat"],
    contraindications: ["Heart rhythm disorders", "High blood pressure"]
  },
  {
    id: 9,
    name: "Ashwagandha",
    category: "Ayurvedic",
    medicineType: "Ayurvedic",
    dosage: "300-500mg",
    condition: "Stress, Anxiety, Insomnia",
    description: "An ancient medicinal herb used in Ayurvedic medicine to boost brain function, lower blood sugar and cortisol levels, and help with anxiety and stress.",
    instructions: "Take with meals or as directed by an Ayurvedic practitioner.",
    sideEffects: ["Stomach upset", "Diarrhea", "Drowsiness"],
    contraindications: ["Autoimmune diseases", "Pregnancy", "Thyroid disorders"]
  },
  {
    id: 10,
    name: "Turmeric (Curcumin)",
    category: "Ayurvedic",
    medicineType: "Ayurvedic",
    dosage: "500-2000mg",
    condition: "Inflammation, Joint Pain",
    description: "A powerful anti-inflammatory and antioxidant spice used in traditional Indian medicine for thousands of years.",
    instructions: "Take with black pepper or fat to improve absorption. May be taken with food.",
    sideEffects: ["Stomach upset", "Nausea", "Dizziness"],
    contraindications: ["Bleeding disorders", "Gallbladder problems", "Iron deficiency"]
  },
  {
    id: 11,
    name: "Triphala",
    category: "Ayurvedic",
    medicineType: "Ayurvedic",
    dosage: "500-1000mg",
    condition: "Digestive Issues, Constipation",
    description: "A traditional Ayurvedic herbal formulation consisting of three fruits: Amalaki, Bibhitaki, and Haritaki. Used for digestion and detoxification.",
    instructions: "Take before bedtime with warm water for digestive cleansing.",
    sideEffects: ["Digestive discomfort", "Loose stools (at high doses)"],
    contraindications: ["Diarrhea", "Pregnancy"]
  },
  {
    id: 12,
    name: "Azithromycin",
    category: "Antibiotic",
    dosage: "250-500mg",
    condition: "Bacterial Infections, Typhoid",
    description: "A macrolide antibiotic used to treat a wide variety of bacterial infections, including respiratory infections and typhoid fever, which is common in parts of India.",
    instructions: "Take once daily. May be taken with or without food. Do not take with antacids.",
    sideEffects: ["Diarrhea", "Nausea", "Abdominal pain", "Allergic reactions"],
    contraindications: ["Liver disease", "Myasthenia gravis", "Heart rhythm disorders"]
  },
  {
    id: 13,
    name: "Chloroquine",
    category: "Antimalarial",
    dosage: "500mg",
    condition: "Malaria",
    description: "Used for the prevention and treatment of malaria, a mosquito-borne disease prevalent in many parts of India.",
    instructions: "Take with food at the same time each week for prevention, or as directed for treatment.",
    sideEffects: ["Headache", "Nausea", "Vision changes", "Muscle weakness"],
    contraindications: ["Retinal disease", "Porphyria", "Heart rhythm disorders"]
  },
  {
    id: 14,
    name: "Metronidazole",
    category: "Antibiotic",
    dosage: "400-500mg",
    condition: "Amoebiasis, Giardiasis",
    description: "An antibiotic effective against anaerobic bacteria and certain parasites, used to treat amoebiasis and giardiasis, which are common in India.",
    instructions: "Take with food to minimize stomach upset. Avoid alcohol during and for 48 hours after treatment.",
    sideEffects: ["Metallic taste", "Nausea", "Headache", "Dark urine"],
    contraindications: ["Liver disease", "Pregnancy (first trimester)", "Alcohol consumption"]
  },
  {
    id: 15,
    name: "ORS (Oral Rehydration Salts)",
    category: "Electrolyte Replenishment",
    dosage: "1 packet in 1L water",
    condition: "Diarrhea, Dehydration",
    description: "A simple, cost-effective solution for treating dehydration due to diarrhea, particularly important in regions with high incidence of waterborne diseases.",
    instructions: "Dissolve in clean water and drink as needed to replace lost fluids and electrolytes.",
    sideEffects: ["None when used as directed"],
    contraindications: ["None significant"]
  },
  {
    id: 16,
    name: "Guduchi (Tinospora cordifolia)",
    category: "Ayurvedic",
    medicineType: "Ayurvedic",
    dosage: "300-500mg",
    condition: "Immune Support, Fever",
    description: "Known as 'Amrita' in Ayurveda, this herb is used to boost immunity and treat fevers, particularly chronic fevers like dengue and chikungunya.",
    instructions: "Take as directed by an Ayurvedic practitioner, typically with warm water.",
    sideEffects: ["Constipation (rarely)", "Allergic reactions (rare)"],
    contraindications: ["Autoimmune conditions", "Diabetes (may lower blood sugar)"]
  },
  {
    id: 17,
    name: "Neem (Azadirachta indica)",
    category: "Ayurvedic",
    medicineType: "Ayurvedic",
    dosage: "300-500mg",
    condition: "Skin Conditions, Diabetes",
    description: "A versatile medicinal plant used in Ayurveda for skin disorders, diabetes management, dental care, and as an insect repellent.",
    instructions: "Can be taken as capsules, applied topically, or used as neem twigs for dental care.",
    sideEffects: ["Stomach upset", "Headache", "Low blood sugar"],
    contraindications: ["Pregnancy", "Infertility (in high doses for men)", "Organ transplant recipients"]
  },
  {
    id: 18,
    name: "Albendazole",
    category: "Anthelmintic",
    dosage: "400mg",
    condition: "Intestinal Worms",
    description: "Used to treat infections caused by worms such as tapeworms and roundworms, which are prevalent in some parts of India.",
    instructions: "Take with food. May require a single dose or multiple days of treatment depending on the infection.",
    sideEffects: ["Abdominal pain", "Nausea", "Headache", "Dizziness"],
    contraindications: ["Pregnancy (first trimester)", "Liver disease"]
  },
  {
    id: 19,
    name: "Paracetamol (Acetaminophen)",
    category: "Pain Reliever",
    dosage: "500-1000mg",
    condition: "Pain, Fever",
    description: "One of the most commonly used medications in India for reducing fever and relieving mild to moderate pain.",
    instructions: "Take every 4-6 hours as needed. Do not exceed 4000mg per day.",
    sideEffects: ["Rare when taken as directed", "Liver damage (with overdose)"],
    contraindications: ["Liver disease", "Alcohol dependence"]
  },
  {
    id: 20,
    name: "Brahmi (Bacopa monnieri)",
    category: "Ayurvedic",
    medicineType: "Ayurvedic",
    dosage: "300-500mg",
    condition: "Cognitive Enhancement, Anxiety",
    description: "A traditional Ayurvedic herb used to enhance memory, improve cognitive function, and reduce anxiety and stress.",
    instructions: "Take with food to avoid stomach upset. Benefits may take 8-12 weeks to manifest.",
    sideEffects: ["Digestive upset", "Dry mouth", "Fatigue"],
    contraindications: ["Slow heart rate", "Gastrointestinal blockage", "Pregnancy"]
  },
  {
    id: 21,
    name: "Arnica Montana",
    category: "Homeopathic",
    medicineType: "Homeopathic",
    dosage: "30C potency",
    condition: "Bruises, Muscle Soreness",
    description: "A homeopathic remedy used for pain relief, bruising, and muscle soreness.",
    instructions: "Take 3-5 pellets under the tongue, away from food and drink.",
    sideEffects: ["Generally considered safe in homeopathic dilutions"],
    contraindications: ["Open wounds (for topical application)"]
  },
  {
    id: 22,
    name: "Oscillo (Oscillococcinum)",
    category: "Homeopathic",
    medicineType: "Homeopathic",
    dosage: "One dose",
    condition: "Flu-like Symptoms",
    description: "A popular homeopathic preparation used to reduce the duration and severity of flu-like symptoms.",
    instructions: "Dissolve entire contents of one tube under the tongue every 6 hours.",
    sideEffects: ["None reported"],
    contraindications: ["None known"]
  },
  {
    id: 23,
    name: "Bryonia Alba",
    category: "Homeopathic",
    medicineType: "Homeopathic",
    dosage: "30C potency",
    condition: "Dry Cough, Joint Pain",
    description: "Used in homeopathy for dry, painful coughs and joint pain that worsens with movement.",
    instructions: "Take 3-5 pellets under tongue 3 times daily or as directed.",
    sideEffects: ["None at homeopathic dilutions"],
    contraindications: ["None known"]
  },
  {
    id: 24,
    name: "Echinacea",
    category: "Herbal",
    medicineType: "Herbal",
    dosage: "300-500mg",
    condition: "Immune Support, Cold Prevention",
    description: "An herbal supplement used to boost the immune system and help prevent colds and respiratory infections.",
    instructions: "Take at first sign of cold and continue for 7-10 days.",
    sideEffects: ["Nausea", "Dizziness", "Allergic reactions in some individuals"],
    contraindications: ["Autoimmune disorders", "Allergies to plants in the daisy family"]
  },
  {
    id: 25,
    name: "St. John's Wort",
    category: "Herbal",
    medicineType: "Herbal",
    dosage: "300mg three times daily",
    condition: "Mild to Moderate Depression",
    description: "An herbal supplement used to treat mild to moderate depression, anxiety, and sleep disorders.",
    instructions: "Take consistently for 4-6 weeks to see full benefits.",
    sideEffects: ["Increased sun sensitivity", "Dry mouth", "Dizziness", "Digestive upset"],
    contraindications: ["Many medication interactions", "Antidepressants", "Oral contraceptives"]
  },
  {
    id: 26,
    name: "Triphala Churna",
    category: "Ayurvedic",
    medicineType: "Ayurvedic",
    dosage: "3-5g",
    condition: "Digestive Health, Detoxification",
    description: "A traditional Ayurvedic herbal formulation composed of three fruits, used for digestive health and gentle detoxification.",
    instructions: "Mix with warm water and consume before bedtime.",
    sideEffects: ["Increased bowel movements", "Mild abdominal discomfort initially"],
    contraindications: ["Diarrhea", "Pregnancy"]
  },
  {
    id: 27,
    name: "Kali Phosphoricum",
    category: "Homeopathic",
    medicineType: "Homeopathic",
    dosage: "6X potency",
    condition: "Nervous Exhaustion, Mental Fatigue",
    description: "A homeopathic cell salt used for nervous exhaustion, mental fatigue, and anxiety.",
    instructions: "Dissolve 4 tablets under tongue 3-4 times daily.",
    sideEffects: ["None at homeopathic dilutions"],
    contraindications: ["None known"]
  },
  {
    id: 28,
    name: "Hawthorn Extract",
    category: "Herbal",
    medicineType: "Herbal",
    dosage: "300-600mg",
    condition: "Heart Health, Mild Hypertension",
    description: "An herbal supplement used to support heart health, mild hypertension, and improved circulation.",
    instructions: "Take daily with food. Effects may take 6-8 weeks to become noticeable.",
    sideEffects: ["Nausea", "Digestive upset", "Fatigue", "Dizziness"],
    contraindications: ["Heart medications", "Blood pressure medications"]
  },
  {
    id: 29,
    name: "Chyawanprash",
    category: "Ayurvedic",
    medicineType: "Ayurvedic",
    dosage: "1-2 teaspoons",
    condition: "Immune Support, General Wellness",
    description: "A traditional Ayurvedic herbal jam containing amla (Indian gooseberry) and many other herbs, used for immune support and overall wellness.",
    instructions: "Take 1-2 teaspoons daily, preferably in the morning.",
    sideEffects: ["Generally safe", "May cause digestive upset in some individuals"],
    contraindications: ["Diabetes (due to sugar content in some formulations)"]
  },
  {
    id: 30,
    name: "Ma Huang (Ephedra)",
    category: "Chinese",
    medicineType: "Chinese",
    dosage: "As directed by practitioner",
    condition: "Asthma, Congestion",
    description: "A traditional Chinese herb used to treat asthma, congestion, and respiratory conditions.",
    instructions: "Only use under supervision of qualified Traditional Chinese Medicine practitioner.",
    sideEffects: ["Increased heart rate", "Insomnia", "Anxiety", "High blood pressure"],
    contraindications: ["Heart conditions", "Hypertension", "Anxiety disorders", "Glaucoma"]
  }
];

const categories = [
  "Pain Reliever",
  "Antibiotic",
  "Antihistamine",
  "Antidiabetic",
  "ACE Inhibitor",
  "Statin",
  "Proton Pump Inhibitor",
  "Bronchodilator",
  "Ayurvedic",
  "Antimalarial",
  "Anthelmintic",
  "Electrolyte Replenishment"
];

const conditions = [
  "Pain",
  "Fever",
  "Inflammation",
  "Bacterial Infections",
  "Allergies",
  "Type 2 Diabetes",
  "Hypertension",
  "Heart Failure",
  "High Cholesterol",
  "Acid Reflux",
  "Ulcers",
  "Asthma",
  "COPD",
  "Stress",
  "Anxiety",
  "Insomnia",
  "Joint Pain",
  "Digestive Issues",
  "Constipation",
  "Typhoid",
  "Malaria",
  "Amoebiasis",
  "Giardiasis",
  "Diarrhea",
  "Dehydration",
  "Immune Support",
  "Skin Conditions",
  "Intestinal Worms",
  "Cognitive Enhancement"
];

const categoryIcons = {
  "Pain Reliever": <AlertCircle className="h-5 w-5" />,
  "Antibiotic": <Thermometer className="h-5 w-5" />,
  "Antihistamine": <Droplet className="h-5 w-5" />,
  "Antidiabetic": <Dna className="h-5 w-5" />,
  "ACE Inhibitor": <Heart className="h-5 w-5" />,
  "Statin": <Heart className="h-5 w-5" />,
  "Proton Pump Inhibitor": <Droplet className="h-5 w-5" />,
  "Bronchodilator": <Droplet className="h-5 w-5" />,
  "Ayurvedic": <Leaf className="h-5 w-5" />,
  "Homeopathic": <Droplet className="h-5 w-5" />,
  "Herbal": <Flower className="h-5 w-5" />,
  "Chinese": <Pill className="h-5 w-5" />,
  "Antimalarial": <Thermometer className="h-5 w-5" />,
  "Anthelmintic": <Droplet className="h-5 w-5" />,
  "Electrolyte Replenishment": <Droplet className="h-5 w-5" />
};

const getMedicineTypeIcon = (medicineType: string) => {
  switch (medicineType) {
    case "Ayurvedic":
      return <Leaf className="h-5 w-5" />;
    case "Homeopathic":
      return <Droplet className="h-5 w-5" />;
    case "Herbal":
      return <Flower className="h-5 w-5" />;
    case "Allopathic":
      return <Stethoscope className="h-5 w-5" />;
    case "Chinese":
      return <Pill className="h-5 w-5" />;
    case "Unani":
    case "Siddha":
    case "Naturopathic":
    case "Dietary Supplement":
      return <Pill className="h-5 w-5" />;
    default:
      return <Pill className="h-5 w-5" />;
  }
};

const MedicineSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedMedicineType, setSelectedMedicineType] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState(mockMedicines);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setFilteredMedicines(mockMedicines);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      let results = mockMedicines;
      
      if (searchTerm) {
        results = results.filter(med => 
          med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          med.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          med.condition.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (selectedCategory && selectedCategory !== "all-categories") {
        results = results.filter(med => med.category === selectedCategory);
      }
      
      if (selectedCondition && selectedCondition !== "all-conditions") {
        results = results.filter(med => med.condition.includes(selectedCondition));
      }
      
      if (selectedMedicineType && selectedMedicineType !== "all-types") {
        results = results.filter(med => med.medicineType === selectedMedicineType);
      }
      
      if (activeTab === "ayurvedic") {
        results = results.filter(med => med.medicineType === "Ayurvedic");
      } else if (activeTab === "allopathic") {
        results = results.filter(med => med.medicineType === "Allopathic");
      } else if (activeTab === "homeopathic") {
        results = results.filter(med => med.medicineType === "Homeopathic");
      } else if (activeTab === "herbal") {
        results = results.filter(med => med.medicineType === "Herbal");
      }
      
      setFilteredMedicines(results);
      setIsLoading(false);
    }, 500);
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedCondition("");
    setSelectedMedicineType("");
    setActiveTab("all");
    setFilteredMedicines(mockMedicines);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    let results = mockMedicines;
    
    if (searchTerm) {
      results = results.filter(med => 
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.condition.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory && selectedCategory !== "all-categories") {
      results = results.filter(med => med.category === selectedCategory);
    }
    
    if (selectedCondition && selectedCondition !== "all-conditions") {
      results = results.filter(med => med.condition.includes(selectedCondition));
    }
    
    if (selectedMedicineType && selectedMedicineType !== "all-types") {
      results = results.filter(med => med.medicineType === selectedMedicineType);
    }
    
    if (value === "ayurvedic") {
      results = results.filter(med => med.medicineType === "Ayurvedic");
    } else if (value === "allopathic") {
      results = results.filter(med => med.medicineType === "Allopathic");
    } else if (value === "homeopathic") {
      results = results.filter(med => med.medicineType === "Homeopathic");
    } else if (value === "herbal") {
      results = results.filter(med => med.medicineType === "Herbal");
    }
    
    setFilteredMedicines(results);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionHeader
        title="Medicine Database"
        description="Search for medicines by name, category, or health condition across Homeopathic, Ayurvedic, Allopathic, Herbal and more traditional systems"
        align="left"
      />
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
        <TabsList className="mb-6 flex flex-wrap">
          <TabsTrigger value="all">All Medicines</TabsTrigger>
          <TabsTrigger value="allopathic">Allopathic</TabsTrigger>
          <TabsTrigger value="ayurvedic">Ayurvedic</TabsTrigger>
          <TabsTrigger value="homeopathic">Homeopathic</TabsTrigger>
          <TabsTrigger value="herbal">Herbal</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for your medicine (Homeopathic, Ayurvedic, Allopathic, Herbal, and more...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleSearch}>Search</Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Refine your medicine search results
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Medicine Type</h3>
                  <Select value={selectedMedicineType} onValueChange={setSelectedMedicineType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a medicine type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-types">All Types</SelectItem>
                      {MEDICINE_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Category</h3>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-categories">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Health Condition</h3>
                  <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-conditions">All Conditions</SelectItem>
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button onClick={handleSearch}>Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          
          <Button variant="outline" onClick={clearFilters} className="hidden md:flex">
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>
      
      <div className="hidden md:flex gap-4 mb-8">
        <Select value={selectedMedicineType} onValueChange={setSelectedMedicineType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by medicine type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-types">All Medicine Types</SelectItem>
            {MEDICINE_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-categories">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedCondition} onValueChange={setSelectedCondition}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-conditions">All Conditions</SelectItem>
            {conditions.map((condition) => (
              <SelectItem key={condition} value={condition}>
                {condition}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array(6).fill(0).map((_, index) => (
            <Card key={index} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4">
                  <div>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full mt-1" />
                    <Skeleton className="h-3 w-3/4 mt-1" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))
        ) : filteredMedicines.length > 0 ? (
          filteredMedicines.map((medicine) => (
            <Card key={medicine.id} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{medicine.name}</CardTitle>
                    <div className="flex flex-wrap items-center gap-1 mt-1">
                      <Badge variant="outline" className="flex items-center gap-1">
                        {categoryIcons[medicine.category as keyof typeof categoryIcons] || <Pill className="h-3.5 w-3.5" />}
                        <span>{medicine.category}</span>
                      </Badge>
                      
                      {medicine.medicineType && (
                        <Badge variant="secondary" className="flex items-center gap-1 ml-1">
                          {getMedicineTypeIcon(medicine.medicineType)}
                          <span>{medicine.medicineType}</span>
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    {medicine.medicineType ? 
                      getMedicineTypeIcon(medicine.medicineType) : 
                      <Pill className="h-5 w-5 text-primary" />
                    }
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium">Dosage</h4>
                    <p className="text-sm text-muted-foreground">{medicine.dosage}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Used for</h4>
                    <p className="text-sm text-muted-foreground">{medicine.condition}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Description</h4>
                    <p className="text-sm text-muted-foreground line-clamp-3">{medicine.description}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/medicine/${medicine.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Pill className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No medicines found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button onClick={clearFilters}>Clear All Filters</Button>
          </div>
        )}
      </div>
      
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How is this medicine database organized?</AccordionTrigger>
            <AccordionContent>
              Our medicine database categorizes medications by their type (e.g., Allopathic, Ayurvedic, Homeopathic, Herbal) and the health conditions they treat. You can search by name, filter by category, or look up medicines for specific health conditions across different medical systems.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What's the difference between various medicine types?</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Allopathic:</strong> Conventional Western medicine that uses drugs, surgery, or radiation to treat symptoms and diseases.</li>
                <li><strong>Ayurvedic:</strong> Traditional Indian medicine focused on balancing body systems through herbs, lifestyle changes, and practices.</li>
                <li><strong>Homeopathic:</strong> Treatment using highly diluted substances that cause symptoms similar to the illness, based on "like cures like" principle.</li>
                <li><strong>Herbal:</strong> Plant-based remedies used to prevent and treat various health conditions.</li>
                <li><strong>Unani:</strong> Traditional medicine from ancient Greece, developed in the Muslim world, using natural remedies to restore body balance.</li>
                <li><strong>Chinese:</strong> Traditional medicine from China using herbs, acupuncture, and other methods to balance the body's energy flow.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is this information a substitute for medical advice?</AccordionTrigger>
            <AccordionContent>
              No, the information provided in our medicine database is for educational purposes only. Always consult with a healthcare professional before starting, stopping, or changing any medication regimen, especially when combining different medical systems.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Can I save medicines to my profile?</AccordionTrigger>
            <AccordionContent>
              Yes, logged-in users can save medicines to their profile for quick access. This feature helps you keep track of medications you're interested in or currently taking.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>What's the difference between Ayurvedic and Allopathic medicines?</AccordionTrigger>
            <AccordionContent>
              Ayurvedic medicine is a traditional system of medicine that originated in India thousands of years ago. It focuses on natural remedies, herbs, and lifestyle changes to promote wellness. Allopathic medicine (conventional Western medicine) uses pharmacologically active agents or physical interventions to treat symptoms and diseases. Our database includes both to provide a comprehensive resource.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>Where can I find more detailed information about drug interactions?</AccordionTrigger>
            <AccordionContent>
              While we provide basic information about contraindications, for comprehensive information about drug interactions, please consult with a healthcare professional or pharmacist. You can also check the package insert of the medication or refer to authoritative drug information resources.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default MedicineSearchPage;
