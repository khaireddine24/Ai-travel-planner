import React, { useState } from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { toast } from 'sonner';

const DeleteTripDialog = ({ 
  isOpen, 
  onClose, 
  tripId, 
  onDeleteSuccess 
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteTrip = async () => {
    if (!tripId) return;

    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'Trips', tripId));
      toast.success('Trip deleted successfully');
      onDeleteSuccess(tripId);
      onClose();
    } catch (error) {
      console.error('Error deleting trip:', error);
      toast.error('Failed to delete trip. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-md rounded-xl bg-white dark:bg-gray-900 dark:border-gray-700"
      >
        <DialogHeader>
          <div className="mx-auto mb-4">
            <AlertTriangle 
              className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto" 
            />
          </div>
          <DialogTitle 
            className="text-center text-2xl text-gray-900 dark:text-white"
          >
            Delete Trip
          </DialogTitle>
          <DialogDescription 
            className="text-center text-gray-600 dark:text-gray-200"
          >
            Are you sure you want to delete this trip? 
            This action cannot be undone and will permanently remove 
            all associated trip details.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter 
          className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2"
        >
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:dark:bg-gray-800"
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDeleteTrip} 
            disabled={isDeleting}
            className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
          >
            {isDeleting ? 'Deleting...' : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Trip
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTripDialog;