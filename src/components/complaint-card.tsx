"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, CheckCircle, Circle } from 'lucide-react';
import type { Complaint } from '@/app/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Input } from './ui/input';

interface ComplaintCardProps {
  complaint: Complaint;
  onEdit: (complaint: Complaint) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, field: 'noted' | 'resolved', value: boolean) => void;
  canManage: boolean;
}

const ComplaintCard = ({ complaint, onEdit, onDelete, onStatusChange, canManage }: ComplaintCardProps) => {
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);
  const [villa, setVilla] = useState('');
  const [action, setAction] = useState<'edit' | 'delete' | null>(null);

  const timeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return "just now";
  }
  
  const handleAction = (type: 'edit' | 'delete') => {
    if (canManage) {
        if (type === 'edit') onEdit(complaint);
        if (type === 'delete') {
            if (window.confirm("Are you sure you want to delete this complaint?")) {
                onDelete(complaint.id);
            }
        }
        return;
    }
    setAction(type);
    setIsVerifying(true);
  }

  const verifyAndExecute = () => {
    let formattedVilla = villa.trim().toUpperCase();
    if (formattedVilla.includes('-')) {
        const parts = formattedVilla.split('-');
        if(parts.length === 2 && parts[1]) {
            formattedVilla = `${parts[0]}-${parts[1].padStart(3, '0')}`;
        }
    }
    if (formattedVilla === complaint.villa) {
        if (action === 'edit') onEdit(complaint);
        if (action === 'delete') {
            if (window.confirm("Are you sure you want to delete this complaint?")) {
                onDelete(complaint.id);
            }
        }
        setIsVerifying(false);
        setVilla('');
        setAction(null);
    } else {
      toast({ title: "Invalid villa number", description: "You can only manage complaints from your villa.", variant: "destructive" });
    }
  }
  
  if (isVerifying) {
    return (
      <Card className="flex flex-col justify-center p-4">
        <p className="text-sm text-center mb-2">Enter villa number to {action} complaint.</p>
        <div className="flex gap-2">
          <Input placeholder="e.g. A-001" value={villa} onChange={e => setVilla(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && verifyAndExecute()} />
          <Button onClick={verifyAndExecute}>Go</Button>
        </div>
        <Button variant="link" size="sm" onClick={() => setIsVerifying(false)} className="mt-1">Cancel</Button>
      </Card>
    )
  }


  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <Badge variant="secondary" className="mb-2">From: {complaint.villa}</Badge>
                <CardTitle className="font-headline text-lg">{complaint.title}</CardTitle>
                 <CardDescription>{timeAgo(complaint.timestamp)}</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleAction('edit')}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction('delete')} className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{complaint.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-muted/50 p-4 rounded-b-lg">
          <div className="flex items-center space-x-2">
            <Switch
              id={`noted-${complaint.id}`}
              checked={complaint.noted}
              onCheckedChange={(checked) => onStatusChange(complaint.id, 'noted', checked)}
              disabled={!canManage}
            />
            <Label htmlFor={`noted-${complaint.id}`}>Noted</Label>
          </div>
           <div className="flex items-center space-x-2">
            <Switch
              id={`resolved-${complaint.id}`}
              checked={complaint.resolved}
              onCheckedChange={(checked) => onStatusChange(complaint.id, 'resolved', checked)}
              disabled={!canManage}
            />
            <Label htmlFor={`resolved-${complaint.id}`}>Resolved</Label>
          </div>
          {complaint.resolved && complaint.resolvedDate && (
              <span className="text-xs text-green-600 ml-auto">Resolved on {new Date(complaint.resolvedDate).toLocaleDateString()}</span>
          )}
      </CardFooter>
    </Card>
  );
};

export default ComplaintCard;
