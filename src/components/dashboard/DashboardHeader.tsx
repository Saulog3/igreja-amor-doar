import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Filter, RefreshCw } from "lucide-react";

interface DashboardHeaderProps {
  onRefresh?: () => void;
  onExport?: () => void;
  onFilterToggle?: () => void;
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

const DashboardHeader = ({
  onRefresh,
  onExport,
  onFilterToggle,
  activeTab = "overview",
  onTabChange,
}: DashboardHeaderProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Tabs
            defaultValue={activeTab}
            className="w-full md:w-auto"
            onValueChange={onTabChange}
          >
            <TabsList>
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="donations">Doações</TabsTrigger>
              <TabsTrigger value="analytics">Análises</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={onRefresh}
            >
              <RefreshCw className="h-4 w-4" />
              <span>Atualizar</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={onFilterToggle}
            >
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={onExport}
            >
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardHeader;