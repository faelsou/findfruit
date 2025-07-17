import { CheckCircle, Clock, Heart, Lightbulb, Shield, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Benefits = () => {
  const benefits = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Análise instantânea",
      description: "Resultados em segundos através de IA avançada"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Saúde em primeiro lugar",
      description: "Informações nutricionais precisas e confiáveis"
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "Economia de tempo",
      description: "Não perca tempo pesquisando, tenha tudo na palma da mão"
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-orange-500" />,
      title: "Receitas personalizadas",
      description: "Sugestões práticas baseadas no que você tem"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Evite desperdícios",
      description: "Saiba exatamente quando consumir cada alimento"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-fruit-green-500" />,
      title: "100% gratuito",
      description: "Disponibilizamos todas as funcionalidades até a 3ª pesquisa. "
    }
  ];

  return (
    <section id="beneficios" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 mb-4">
            Por que escolher o FindFruit?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforme a forma como você escolhe, compra e consome frutas e legumes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="border-2 border-gray-100 hover:border-fruit-green-200 transition-all duration-300 hover:shadow-xl group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center space-y-4">
                <div className="flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 fruit-gradient rounded-3xl p-8 md:p-12 border border-fruit-green-100">
          <div className="text-center space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Mais de 10.000 pessoas já economizam tempo e dinheiro
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
                <p className="text-green-100">Redução no desperdício de alimentos</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">5min</div>
                <p className="text-green-100">Tempo médio economizado por consulta</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">100+</div>
                <p className="text-green-100">Tipos de frutas e legumes identificados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
