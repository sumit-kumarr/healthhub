
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Pill, Filter, X } from "lucide-react";
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

// Mock data for medicines
const mockMedicines = [
  {
    id: 1,
    name: "Ibuprofen",
    category: "Pain Reliever",
    dosage: "200-400mg",
    condition: "Pain, Fever, Inflammation",
    description: "A nonsteroidal anti-inflammatory drug (NSAID) used for treating pain, fever, and inflammation."
  },
  {
    id: 2,
    name: "Amoxicillin",
    category: "Antibiotic",
    dosage: "250-500mg",
    condition: "Bacterial Infections",
    description: "A penicillin antibiotic that fights bacteria in your body. Used to treat many different types of infection."
  },
  {
    id: 3,
    name: "Loratadine",
    category: "Antihistamine",
    dosage: "10mg",
    condition: "Allergies",
    description: "An antihistamine that reduces the effects of natural chemical histamine in the body, used to treat allergy symptoms."
  },
  {
    id: 4,
    name: "Metformin",
    category: "Antidiabetic",
    dosage: "500-1000mg",
    condition: "Type 2 Diabetes",
    description: "A medication used to treat type 2 diabetes by decreasing glucose production by the liver and increasing insulin sensitivity."
  },
  {
    id: 5,
    name: "Lisinopril",
    category: "ACE Inhibitor",
    dosage: "10-40mg",
    condition: "Hypertension, Heart Failure",
    description: "An ACE inhibitor that is used to treat high blood pressure and heart failure, and to improve survival after heart attacks."
  },
  {
    id: 6,
    name: "Simvastatin",
    category: "Statin",
    dosage: "10-40mg",
    condition: "High Cholesterol",
    description: "A statin medication that reduces levels of bad cholesterol and triglycerides in the blood while increasing levels of good cholesterol."
  },
  {
    id: 7,
    name: "Omeprazole",
    category: "Proton Pump Inhibitor",
    dosage: "20-40mg",
    condition: "Acid Reflux, Ulcers",
    description: "A proton pump inhibitor that decreases the amount of acid produced in the stomach, used to treat various stomach and esophagus problems."
  },
  {
    id: 8,
    name: "Albuterol",
    category: "Bronchodilator",
    dosage: "2-4 puffs",
    condition: "Asthma, COPD",
    description: "A bronchodilator that relaxes muscles in the airways and increases air flow to the lungs, used to prevent and treat wheezing, shortness of breath."
  },
];

// Medicine categories
const categories = [
  "Pain Reliever",
  "Antibiotic",
  "Antihistamine",
  "Antidiabetic",
  "ACE Inhibitor",
  "Statin",
  "Proton Pump Inhibitor",
  "Bronchodilator",
];

// Health conditions
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
];

const MedicineSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState(mockMedicines);

  const handleSearch = () => {
    let results = mockMedicines;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(med => 
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      results = results.filter(med => med.category === selectedCategory);
    }
    
    // Filter by condition
    if (selectedCondition) {
      results = results.filter(med => med.condition.includes(selectedCondition));
    }
    
    setFilteredMedicines(results);
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedCondition("");
    setFilteredMedicines(mockMedicines);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionHeader
        title="Medicine Database"
        description="Search for medicines by name, category, or health condition"
        align="left"
      />
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for a medicine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleSearch}>Search</Button>
          
          {/* Mobile filter button */}
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
                  <h3 className="text-sm font-medium">Category</h3>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
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
                      <SelectItem value="">All Conditions</SelectItem>
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
      
      {/* Desktop filters */}
      <div className="hidden md:flex gap-4 mb-8">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
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
            <SelectItem value="">All Conditions</SelectItem>
            {conditions.map((condition) => (
              <SelectItem key={condition} value={condition}>
                {condition}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.length > 0 ? (
          filteredMedicines.map((medicine) => (
            <Card key={medicine.id} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{medicine.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{medicine.category}</p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Pill className="h-5 w-5 text-primary" />
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
      
      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How is this medicine database organized?</AccordionTrigger>
            <AccordionContent>
              Our medicine database categorizes medications by their type (e.g., pain reliever, antibiotic) and the health conditions they treat. You can search by name, filter by category, or look up medicines for specific health conditions.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is this information a substitute for medical advice?</AccordionTrigger>
            <AccordionContent>
              No, the information provided in our medicine database is for educational purposes only. Always consult with a healthcare professional before starting, stopping, or changing any medication regimen.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How often is the medicine database updated?</AccordionTrigger>
            <AccordionContent>
              Our database is regularly updated to include new medications and the latest information about existing ones. We work with healthcare professionals to ensure accuracy and relevance.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Can I save medicines to my profile?</AccordionTrigger>
            <AccordionContent>
              Yes, logged-in users can save medicines to their profile for quick access. This feature helps you keep track of medications you're interested in or currently taking.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default MedicineSearchPage;
