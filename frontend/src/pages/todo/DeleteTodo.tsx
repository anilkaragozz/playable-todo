import { deleteTodoInstance } from "@/api/apiClient";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdOutlineDelete } from "react-icons/md";

const DeleteTodo = (props: { _id: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <MdOutlineDelete />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Todo</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Are you sure you want to delete this todo?
        </DialogDescription>

        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              deleteTodoInstance(props._id);
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTodo;
