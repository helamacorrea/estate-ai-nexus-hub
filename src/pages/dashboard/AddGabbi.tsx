
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from "lucide-react";

const AddGabbi = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Adicionar Gabbi</h2>
        <p className="text-muted-foreground">
          Conecte a Gabbi ao seu WhatsApp para começar a automatizar seu atendimento
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conectar WhatsApp</CardTitle>
          <CardDescription>
            Escaneie o QR code abaixo usando seu WhatsApp
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <div className="bg-[#0A1828] p-8 rounded-lg mb-4">
            <QrCode className="w-48 h-48 text-[#0FFCBE]" />
          </div>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            1. Abra o WhatsApp no seu celular
            <br />
            2. Toque em Menu ou Configurações e selecione WhatsApp Web
            <br />
            3. Aponte seu celular para esta tela para capturar o código
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddGabbi;
