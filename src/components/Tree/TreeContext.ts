import { createContext } from "react";

export type TreeContextProps = {
  selectedNodeId?: string;
  onSelect?: (nodeId: string) => void;
  expandedNodeIds?: string[];
  onToggle?: (nodeId: string) => void;
  onDrop?: (
    droppedNodeId: string,
    ancestorNodeIds: string[],
    previousNodeId: string | undefined
  ) => void;
}

const TreeContext = createContext<TreeContextProps>({});

export default TreeContext;
