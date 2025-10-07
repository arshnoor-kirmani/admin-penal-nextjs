import { ArchiveIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CircleIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
export function ActiveBadge() {
  return (
    // <Badge variant="outline" className="w-20 flex flex-rows">
    //   <CheckIcon className="text-emerald-500" size={12} aria-hidden="true" />
    //   Active
    // </Badge>
    <Badge
      variant="outline"
      className="text-muted-foreground px-1.5 text-right"
    >
      <CircleIcon className="fill-green-500 dark:fill-green-400 size-2 inline mr-1.5" />
      Active
    </Badge>
  );
}
export function DeActiveBadge() {
  return (
    <Badge variant="outline" className="gap-1.5">
      <CircleIcon className="fill-red-500 dark:fill-red-400 size-2 inline mr-1.5" />
      Deactive
    </Badge>
  );
}

export function DeactiveButton() {
  return (
    <Button variant="destructive">
      <TrashIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
      Deactive
    </Button>
  );
}

export function CustomButton({ text }: { text: string }) {
  return (
    <Button>
      <ArchiveIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
      {text ? text : "Button"}
    </Button>
  );
}
