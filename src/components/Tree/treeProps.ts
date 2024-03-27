export type SelectableProps = {
  nodeId: string;
  onSelect: (nodeId: string) => void;
};

export type ExpandableProps = {
  nodeIds: string[];
  onToggle: (nodeId: string) => void;
};

export type CheckState = {
  nodeId: string;
  checked: boolean;
};

export type CheckableProps = {
  checkStates: CheckState[];
  onToggle: (nodeId: string) => void;
};

export type DroppableProps = {
  onDrop: (
    droppedNodeId: string,
    ancestorNodeIds: string[],
    previousNodeId: string | undefined
  ) => void;
};
