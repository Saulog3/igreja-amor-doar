
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Institution } from "@/types/database";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Eye, Edit, Trash2 } from "lucide-react";
import EditInstitutionDialog from "./EditInstitutionDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface InstitutionTableProps {
  institutions: Institution[];
  loading: boolean;
  onDeleteSuccess: () => void;
  onUpdateSuccess: () => void;
}

const InstitutionTable = ({
  institutions,
  loading,
  onDeleteSuccess,
  onUpdateSuccess,
}: InstitutionTableProps) => {
  const { toast } = useToast();
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      if (!selectedInstitution) return;
      
      const { error } = await (supabase as any)
        .from("institutions")
        .delete()
        .eq("id", selectedInstitution.id);

      if (error) throw error;
      
      setDeleteDialogOpen(false);
      onDeleteSuccess();
    } catch (error: any) {
      toast({
        title: "Erro ao excluir instituição",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (institution: Institution) => {
    setSelectedInstitution(institution);
    setEditDialogOpen(true);
  };

  const handleView = (institution: Institution) => {
    setSelectedInstitution(institution);
    setViewDialogOpen(true);
  };

  const handleConfirmDelete = (institution: Institution) => {
    setSelectedInstitution(institution);
    setDeleteDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-64 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Verificada</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {institutions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  Nenhuma instituição encontrada
                </TableCell>
              </TableRow>
            ) : (
              institutions.map((institution) => (
                <TableRow key={institution.id}>
                  <TableCell>
                    <div className="w-16 h-16 rounded-md overflow-hidden">
                      <img
                        src={institution.logo_url || "https://images.unsplash.com/photo-1504675975031-96dbf10b5078?q=80&w=1770&auto=format&fit=crop"}
                        alt={institution.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{institution.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{institution.description}</TableCell>
                  <TableCell>
                    {institution.verified ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Verificada
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pendente
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleView(institution)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(institution)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConfirmDelete(institution)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog de visualização */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes da Instituição</DialogTitle>
            <DialogDescription>
              Informações completas sobre a instituição.
            </DialogDescription>
          </DialogHeader>
          
          {selectedInstitution && (
            <div className="space-y-4">
              <div className="w-full overflow-hidden rounded-lg">
                <AspectRatio ratio={16/9}>
                  <img
                    src={selectedInstitution.logo_url || "https://images.unsplash.com/photo-1504675975031-96dbf10b5078?q=80&w=1770&auto=format&fit=crop"}
                    alt={selectedInstitution.name}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Nome</h3>
                  <p className="mt-1 text-sm">{selectedInstitution.name}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Descrição</h3>
                  <p className="mt-1 text-sm">{selectedInstitution.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Verificada</h3>
                    <p className="mt-1 text-sm">
                      {selectedInstitution.verified ? "Sim" : "Não"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Data de Criação</h3>
                    <p className="mt-1 text-sm">
                      {selectedInstitution.created_at ? 
                        new Date(selectedInstitution.created_at).toLocaleDateString('pt-BR') : 
                        "N/A"}
                    </p>
                  </div>
                </div>
                
                {(selectedInstitution.address || selectedInstitution.city || 
                  selectedInstitution.state || selectedInstitution.postal_code) && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Endereço</h3>
                    <p className="mt-1 text-sm">
                      {[
                        selectedInstitution.address,
                        selectedInstitution.city,
                        selectedInstitution.state,
                        selectedInstitution.postal_code
                      ].filter(Boolean).join(", ")}
                    </p>
                  </div>
                )}
                
                {selectedInstitution.website && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Website</h3>
                    <a 
                      href={selectedInstitution.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-1 text-sm text-blue-600 hover:underline"
                    >
                      {selectedInstitution.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setViewDialogOpen(false)}
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmação de exclusão */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Instituição</DialogTitle>
            <DialogDescription>
              Você tem certeza que deseja excluir a instituição "{selectedInstitution?.name}"? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de edição */}
      {selectedInstitution && (
        <EditInstitutionDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          institution={selectedInstitution}
          onSuccess={onUpdateSuccess}
        />
      )}
    </>
  );
};

export default InstitutionTable;
