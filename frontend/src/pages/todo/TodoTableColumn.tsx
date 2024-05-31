import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { FcDownload } from "react-icons/fc";
import EditTodo from "@/pages/todo/EditTodo";
import DeleteTodo from "@/pages/todo/DeleteTodo";

export type Tag = {
  id: string;
  name: string;
};

export type Todos = {
  _id: string;
  title: string;
  description: string;
  is_completed: boolean;
  tags: Tag[];
  created_at: string;
  updated_at: string;
  thumbnail: string;
  attachments: string;
};

export const columns: ColumnDef<Todos>[] = [
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Completed",
    accessorKey: "is_completed",
  },
  {
    header: "Tags",
    accessorKey: "tags",
    cell: ({ row }) => (
      <ul>
        {row.original.tags.map((tag: Tag, i) => (
          <li key={i} className="tag-name">
            {tag.name}
          </li>
        ))}
      </ul>
    ),
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "created_at",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "updated_at",
  },
  {
    header: "Image",
    accessorKey: "thumbnail",
    cell: ({ row }) =>
      row.original.thumbnail ? (
        <img
          src={row.original.thumbnail}
          alt={row.original.title}
          className="w-10 h-10 object-cover rounded-full"
        />
      ) : null,
  },
  {
    header: "File",
    accessorKey: "attachments",
    cell: ({ row }) =>
      row.original.attachments ? (
        <a href={row.original.attachments} download>
          <FcDownload />
        </a>
      ) : null,
  },
  {
    header: "Edit-Delete",
    accessorKey: "s",
    cell: ({ row }) => (
      <div className="flex flex-row">
        <EditTodo
          _id={row.original._id}
          title={row.original.title}
          description={row.original.description}
          is_completed={row.original.is_completed}
          tags={row.original.tags}
          thumbnail={row.original.thumbnail}
          attachments={row.original.attachments}
          created_at={row.original.created_at}
          updated_at={row.original.updated_at}
        />
        <DeleteTodo _id={row.original._id} />
      </div>
    ),
  },
];
