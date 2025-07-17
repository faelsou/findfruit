
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, CreditCard } from "lucide-react";
import PaymentModal from "./PaymentModal";

const PricingPlans = () => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

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
      features: ["Análises ilimitadas", "Receitas básicas", "E-Book de Receitas"],
      popular: true
    },
    {
      id: "B2B",
      name: "Empresas",
      price: "R$ 29,90",
      period: "/mês",
      features: ["Funcionalidades Básico", "Premium"],
      popular: false
    }
  ];

  return (
    <>
      <section className="py-20 fresh-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 mb-4">
              Escolha seu plano
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encontre o plano perfeito para suas necessidades
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={plan.id}
                className={`relative border-2 hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                  plan.popular 
                    ? 'border-fruit-green-500 shadow-lg scale-105' 
                    : 'border-gray-200 hover:border-fruit-green-300'
                } animate-scale-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setIsPaymentOpen(true)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="fruit-gradient text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Mais Popular
                    </span>
                  </div>
                )}
                
                <CardContent className="p-8 text-center space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-fruit-green-600">{plan.price}</div>
                    <div className="text-gray-500 text-lg">{plan.period}</div>
                  </div>
                  
                  <ul className="space-y-4 text-left">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-fruit-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                      plan.popular 
                        ? 'fruit-gradient text-white hover:opacity-90 group-hover:scale-105' 
                        : 'border-2 border-fruit-green-500 text-fruit-green-600 hover:bg-fruit-green-50 group-hover:bg-fruit-green-100'
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Escolher Plano
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Precisa de mais informações? Entre em contato conosco
            </p>
            <Button 
              variant="outline" 
              className="border-fruit-green-500 text-fruit-green-600 hover:bg-fruit-green-50"
            >
              Falar com Suporte
            </Button>
          </div>
        </div>
      </section>

      <PaymentModal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} />
    </>
  );
};

export default PricingPlans;
