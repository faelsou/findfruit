import { Button } from "@/components/ui/button";
import { MessageCircle, Play, Star, Users } from "lucide-react";
import { useState, useEffect } from "react";
import DemoModal from "./DemoModal";
import PaymentModal from "./PaymentModal";
import { sendPhotoInstruction } from "@/utils/whatsapp";

const Hero = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState("passadas");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord(prev => prev === "verdes" ? "maduras" : "passadas");
    }, 2000);

    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <section className="pt-20 pb-16 fresh-gradient min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-fruit-green-200">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  </div>
                  <span className="text-sm text-gray-600">Mais de 10.000 usuários satisfeitos</span>
                </div>
                
                 <h1 className="text-4xl md:text-6xl font-bold font-poppins text-gray-900 leading-tight">
                  Compre frutas{" "}
                  <span className="bg-gradient-to-r from-fruit-green-600 to-fruit-orange-500 bg-clip-text text-transparent">
                    maduras
                  </span>  
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Descubra em segundos se suas frutas e legumes estão no ponto ideal, 
                  receba dicas nutricionais e receitas práticas direto no WhatsApp!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="fruit-gradient text-white px-8 py-4 text-lg font-semibold hover:opacity-90 transition-opacity transform hover:scale-105"
                  onClick={sendPhotoInstruction}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Começar Agora - É Grátis
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-4 text-lg border-2 border-fruit-green-300 text-fruit-green-700 hover:bg-fruit-green-50"
                  onClick={() => setIsDemoOpen(true)}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Ver Demonstração
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-fruit-green-600" />
                  <span className="text-gray-600">+10k usuários ativos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-fruit-green-600" />
                  <span className="text-gray-600">100% no WhatsApp</span>
                </div>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="relative z-10">
                <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm mx-auto">
                  <div className="fruit-gradient rounded-2xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <span className="text-lg">🤖</span>
                        </div>
                        <span className="text-white font-semibold">FindFruit Bot</span>
                      </div>
                      <span className="text-xs text-green-100">agora</span>
                    </div>
                    
                    <div className="bg-white rounded-xl p-3 mb-3">
                      <img
                        src="https://source.unsplash.com/tI7D8dcDGCg/600x400"
                        alt="Manga analisado"
                        className="w-full h-24 object-cover rounded-lg mb-2"
                      />
                      <p className="text-sm text-gray-800">Analisando sua imagem...</p>
                    </div>
                    
                    <div className="text-white space-y-2">
                      <p className="font-medium">✅ Manga madura no ponto ideal!</p>
                      <p className="text-sm text-green-100">🍃 Rica em vitamina C e A</p>
                      <p className="text-sm text-green-100">📅 Melhor época: out-jan</p>
                      <p className="text-sm text-green-100">🥗 Receita: Salada tropical</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-16 h-16 bg-fruit-orange-200 rounded-full flex items-center justify-center animate-float">
                <span className="text-2xl">🥑</span>
              </div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-fruit-green-200 rounded-full flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-3xl">🍓</span>
              </div>
              <div className="absolute top-1/2 -right-8 w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
                <span className="text-xl">🍌</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <PaymentModal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} />
    </>
  );
};

export default Hero;
