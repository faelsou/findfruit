
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Como funciona a análise de imagem?",
      answer: "Utilizamos inteligência artificial avançada que reconhece mais de 100 tipos diferentes de frutas e legumes. Basta enviar uma foto clara pelo WhatsApp e nossa IA identifica o tipo, estado de maturação e fornece todas as informações relevantes em segundos."
    },
    {
      question: "O FindFruit é realmente gratuito?",
      answer: "Sim! Todas as funcionalidades básicas são completamente gratuitas nas 3 primeiras pesquisas."
    },
    {
      question: "Quais tipos de frutas e legumes são reconhecidos?",
      answer: "Nosso sistema reconhece mais de 100 variedades, incluindo frutas tropicais, frutas temperadas, legumes, verduras e hortaliças comuns no Brasil. Estamos constantemente adicionando novos itens ao nosso banco de dados."
    },
    {
      question: "As informações nutricionais são confiáveis?",
      answer: "Sim! Todas as informações são baseadas em dados oficiais do IBGE, USDA e instituições de pesquisa reconhecidas. Nosso time inclui nutricionistas que validam todas as informações antes de serem disponibilizadas."
    },
    {
      question: "Posso usar sem ter WhatsApp Business?",
      answer: "Claro! Funciona com qualquer WhatsApp comum. Não é necessário ter WhatsApp Business ou qualquer configuração especial. Basta ter o WhatsApp instalado no seu celular."
    },
    {
      question: "O FindFruit funciona offline?",
      answer: "A análise de imagem requer conexão com a internet, pois utilizamos nossa IA na nuvem para garantir a melhor precisão. Porém, você pode consultar seu histórico de análises mesmo offline."
    },
    {
      question: "Como as receitas são personalizadas?",
      answer: "Com base na fruta ou legume analisado e seu estado de maturação, sugerimos receitas que aproveitam melhor aquele ingrediente específico. Por exemplo, frutas mais maduras recebem sugestões de vitaminas e doces, enquanto frutas menos maduras recebem sugestões de saladas."
    },
    {
      question: "Posso usar para fins comerciais?",
      answer: "Sim! Muitos fruteiros, mercados e restaurantes já usam o FindFruit para orientar clientes e gerenciar estoque. Para uso comercial intensivo, oferecemos planos especiais com funcionalidades extras."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 mb-4">
            Perguntas frequentes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tire suas dúvidas sobre o FindFruit
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 rounded-xl px-6 hover:border-fruit-green-300 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-fruit-green-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-fruit-green-50 to-fruit-orange-50 rounded-2xl p-8 border border-fruit-green-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-gray-600 mb-6">
              Nossa equipe está sempre pronta para ajudar você
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/5511945237617" 
                className="inline-flex items-center justify-center px-6 py-3 bg-fruit-green-600 text-white rounded-lg hover:bg-fruit-green-700 transition-colors"
              >
                Falar no WhatsApp
              </a>
              <a 
                href="mailto:contato@findfruit.com" 
                className="inline-flex items-center justify-center px-6 py-3 border border-fruit-green-600 text-fruit-green-600 rounded-lg hover:bg-fruit-green-50 transition-colors"
              >
                Enviar E-mail
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
