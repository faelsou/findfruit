
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Check, CreditCard } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal = ({ isOpen, onClose }: PaymentModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState("premium");

  const plans = [
    {
      id: "basic",
      name: "Básico",
      price: "R$ 9,90",
      period: "/mês",
      features: ["Análises ilimitadas", "Receitas básicas"],
      popular: false
    },
    {
      id: "premium",
      name: "Premium",
      price: "R$ 19,90",
      period: "/mês",
      features: ["Análises ilimitadas", "Receitas básica", "Histórico completo", "e-book receitas"],
      popular: true
    },
    {
      id: "family",
      name: "Família",
      price: "R$ 29,90",
      period: "/mês",
      features: ["Até 5 usuários", "Todas as funcionalidades", "Lista de compras compartilhada", "Suporte 24/7"],
      popular: false
    }
  ];

  const handlePlanClick = (planId: string) => {
    setSelectedPlan(planId);
    const selectedPlanData = plans.find(p => p.id === planId);
    if (selectedPlanData) {
      // Redirect to third-party payment system (example: PagSeguro, Mercado Pago, etc.)
      const paymentUrl = `https://pay.mercadopago.com/checkout?plan=${planId}&price=${selectedPlanData.price}&name=${selectedPlanData.name}`;
      window.open(paymentUrl, '_blank');
      onClose();
    }
  };

  const handlePaymentRedirect = () => {
    const selectedPlanData = plans.find(p => p.id === selectedPlan);
    if (selectedPlanData) {
      // Redirect to third-party payment system
      const paymentUrl = `https://pay.mercadopago.com/checkout?plan=${selectedPlan}&price=${selectedPlanData.price}&name=${selectedPlanData.name}`;
      window.open(paymentUrl, '_blank');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Escolha seu plano
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Planos */}
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedPlan === plan.id
                    ? 'border-fruit-green-500 bg-fruit-green-50 shadow-lg'
                    : 'border-gray-200 hover:border-fruit-green-300'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="fruit-gradient text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Mais Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center pt-2">
                  <h3 className="font-semibold text-xl mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-fruit-green-600">{plan.price}</span>
                    <span className="text-gray-500 text-lg">{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-3 text-sm mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-fruit-green-500 flex-shrink-0" />
                        <span className="text-left">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full py-3 ${
                      plan.popular 
                        ? 'fruit-gradient text-white hover:opacity-90' 
                        : 'border border-fruit-green-500 text-fruit-green-600 hover:bg-fruit-green-50'
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanClick(plan.id);
                    }}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Selecionar Plano
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Botão de pagamento principal */}
          <div className="text-center pt-6 border-t">
            <p className="text-gray-600 mb-4">
              Ou prossiga com o plano selecionado:
            </p>
            <Button 
              onClick={handlePaymentRedirect}
              className="fruit-gradient text-white px-8 py-4 text-lg hover:opacity-90"
              size="lg"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Pagar {plans.find(p => p.id === selectedPlan)?.price}{plans.find(p => p.id === selectedPlan)?.period}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
