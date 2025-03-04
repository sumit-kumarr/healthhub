
import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, ArrowUpDown, MoreHorizontal, Pill, Leaf, Flower, Stethoscope, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "@/components/ui/section-header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// Type definition for medicine data
interface Medicine {
  id: string;
  name: string;
  description: string;
  category: string;
  medicine_type?: string;
  usage: string;
  side_effects: string;
  dosage: string;
  created_at: string;
}

// Categories for medicines
const CATEGORIES = [
  "Antibiotics",
  "Antiviral",
  "Pain Relief",
  "Cardiovascular",
  "Gastrointestinal",
  "Respiratory",
  "Neurological",
  "Diabetes",
  "Allergy",
  "Other"
];

// Medicine types
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

// Get icon for medicine type
const getMedicineTypeIcon = (medicineType: string) => {
  switch (medicineType) {
    case "Ayurvedic":
      return <Leaf className="h-4 w-4" />;
    case "Homeopathic":
      return <Droplet className="h-4 w-4" />;
    case "Herbal":
      return <Flower className="h-4 w-4" />;
    case "Allopathic":
      return <Stethoscope className="h-4 w-4" />;
    default:
      return <Pill className="h-4 w-4" />;
  }
};

// Form validation schema
const medicineFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  medicine_type: z.string().min(1, "Please select a medicine type"),
  usage: z.string().min(10, "Usage instructions must be at least 10 characters"),
  side_effects: z.string().min(5, "Side effects must be at least 5 characters"),
  dosage: z.string().min(5, "Dosage must be at least 5 characters"),
});

const AdminMedicinesPage = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState<Medicine | null>(null);
  const [sortBy, setSortBy] = useState<keyof Medicine>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedMedicineType, setSelectedMedicineType] = useState<string>("");
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof medicineFormSchema>>({
    resolver: zodResolver(medicineFormSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      medicine_type: "",
      usage: "",
      side_effects: "",
      dosage: "",
    },
  });
  
  useEffect(() => {
    fetchMedicines();
  }, []);
  
  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("medicines")
        .select("*")
        .order(sortBy, { ascending: sortOrder === "asc" });
      
      if (error) {
        throw error;
      }
      
      setMedicines(data || []);
    } catch (error: any) {
      console.error("Error fetching medicines:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to load medicines",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSort = (column: keyof Medicine) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };
  
  const filteredMedicines = medicines
    .filter(medicine => 
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (medicine.medicine_type && medicine.medicine_type.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .filter(medicine => 
      !selectedMedicineType || 
      medicine.medicine_type === selectedMedicineType
    );
  
  const handleEditMedicine = (medicine: Medicine) => {
    setCurrentMedicine(medicine);
    form.reset({
      name: medicine.name,
      description: medicine.description,
      category: medicine.category,
      medicine_type: medicine.medicine_type || "",
      usage: medicine.usage,
      side_effects: medicine.side_effects,
      dosage: medicine.dosage,
    });
    setFormOpen(true);
  };
  
  const handleDeleteMedicine = async (id: string) => {
    if (confirm("Are you sure you want to delete this medicine?")) {
      try {
        const { error } = await supabase
          .from("medicines")
          .delete()
          .eq("id", id);
        
        if (error) {
          throw error;
        }
        
        setMedicines(medicines.filter(medicine => medicine.id !== id));
        toast({
          title: "Success",
          description: "Medicine deleted successfully",
        });
      } catch (error: any) {
        console.error("Error deleting medicine:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to delete medicine",
          variant: "destructive",
        });
      }
    }
  };
  
  const onSubmit = async (values: z.infer<typeof medicineFormSchema>) => {
    try {
      if (currentMedicine) {
        // Update existing medicine
        const { error } = await supabase
          .from("medicines")
          .update(values)
          .eq("id", currentMedicine.id);
        
        if (error) {
          throw error;
        }
        
        toast({
          title: "Success",
          description: "Medicine updated successfully",
        });
        
        // Update local state
        setMedicines(medicines.map(med => 
          med.id === currentMedicine.id ? { ...med, ...values } : med
        ));
      } else {
        // Create new medicine
        const { data, error } = await supabase
          .from("medicines")
          .insert(values)
          .select();
        
        if (error) {
          throw error;
        }
        
        toast({
          title: "Success",
          description: "Medicine added successfully",
        });
        
        // Update local state
        if (data && data.length > 0) {
          setMedicines([...medicines, data[0]]);
        }
      }
      
      // Reset form and close dialog
      form.reset();
      setFormOpen(false);
      setCurrentMedicine(null);
    } catch (error: any) {
      console.error("Error saving medicine:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save medicine",
        variant: "destructive",
      });
    }
  };
  
  const handleAddNew = () => {
    setCurrentMedicine(null);
    form.reset({
      name: "",
      description: "",
      category: "",
      medicine_type: "",
      usage: "",
      side_effects: "",
      dosage: "",
    });
    setFormOpen(true);
  };
  
  return (
    <div className="container px-4 py-8">
      <SectionHeader
        title="Manage Medicines"
        description="Add, edit, or remove medicines from the database across various medicine types"
        align="left"
      />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search medicines..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={selectedMedicineType} onValueChange={setSelectedMedicineType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All medicine types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All medicine types</SelectItem>
              {MEDICINE_TYPES.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Medicine
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Name
                  {sortBy === "name" && (
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  )}
                </div>
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead 
                className="cursor-pointer hidden md:table-cell"
                onClick={() => handleSort("created_at")}
              >
                <div className="flex items-center">
                  Added
                  {sortBy === "created_at" && (
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  )}
                </div>
              </TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Loading medicines...
                </TableCell>
              </TableRow>
            ) : filteredMedicines.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No medicines found. {searchQuery ? "Try a different search." : "Add your first medicine."}
                </TableCell>
              </TableRow>
            ) : (
              filteredMedicines.map((medicine) => (
                <TableRow key={medicine.id}>
                  <TableCell className="font-medium">{medicine.name}</TableCell>
                  <TableCell>
                    {medicine.medicine_type && (
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        {getMedicineTypeIcon(medicine.medicine_type)}
                        {medicine.medicine_type}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{medicine.category}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs truncate">
                    {medicine.description}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(medicine.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditMedicine(medicine)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteMedicine(medicine.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentMedicine ? "Edit Medicine" : "Add New Medicine"}
            </DialogTitle>
            <DialogDescription>
              {currentMedicine 
                ? "Update the details of this medicine in the database" 
                : "Enter the details of the new medicine to add it to the database"
              }
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medicine Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter medicine name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="medicine_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medicine Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select medicine type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MEDICINE_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="dosage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dosage</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter dosage information" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter a brief description of the medicine" 
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="usage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usage Instructions</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter usage instructions" 
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="side_effects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Side Effects</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter possible side effects" 
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setFormOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {currentMedicine ? "Update Medicine" : "Add Medicine"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMedicinesPage;
