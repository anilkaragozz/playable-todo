import { createTodoInstance } from "@/api/apiClient";
import { Todos, Tag } from "@/pages/todo/TodoTableColumn";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { MdOutlineAdd } from "react-icons/md";

const AddTodo: React.FC<Todos> = ({
  title: initialTitle,
  description: initialDescription,
  is_completed: initialIsCompleted,
  tags: initialTags,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [is_completed, setIsCompleted] = useState(initialIsCompleted);
  const [tags, setTags] = useState(initialTags);

  const handleAddTag = () => {
    setTags([...tags, { id: "", name: "" }]);
  };

  const handleSubmit = async () => {
    try {
      await createTodoInstance(title, description, tags);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Todo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="is_completed" className="text-right">
              Completed
            </Label>
            <Switch
              id="is_completed"
              onClick={() => setIsCompleted(!is_completed)}
              checked={is_completed}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tag" className="text-right">
              Tags
            </Label>
            <ul>
              {tags.map((tag: Tag, i) => (
                <li key={i} className="tag-name flex items-center">
                  <Input
                    type="text"
                    value={tag.name}
                    onChange={(e) => {
                      const newTags = [...tags];
                      newTags[i] = { ...tag, name: e.target.value };
                      setTags(newTags);
                    }}
                    className="mr-2"
                  />
                </li>
              ))}
              <li>
                <Button onClick={handleAddTag}>
                  <MdOutlineAdd />
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodo;
