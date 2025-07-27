
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Play, CheckCircle } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      title: "1. Envie uma foto",
      description: "Tire uma foto da sua fruta ou legume",
      image: "https://unsplash.com/photos/red-tomato-on-black-leather-textile-tI7D8dcDGCg=crop",
    },
    {
      title: "2. Análise instantânea",
      description: "Nossa IA analisa em segundos",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
    },
    {
      title: "3. Receba o resultado",
      description: "Diagnóstico completo com dicas e receitas",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop",
    }
  ];

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Como funciona o FindFruit
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <img 
              src={demoSteps[currentStep].image} 
              alt={demoSteps[currentStep].title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{demoSteps[currentStep].title}</h3>
            <p className="text-gray-600">{demoSteps[currentStep].description}</p>
          </div>

          <div className="flex justify-center space-x-2">
            {demoSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? 'bg-fruit-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Anterior
            </Button>
            {currentStep < demoSteps.length - 1 ? (
              <Button onClick={nextStep} className="fruit-gradient text-white">
                Próximo
              </Button>
            ) : (
              <Button 
                onClick={onClose}
                className="fruit-gradient text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Entendi!
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;
