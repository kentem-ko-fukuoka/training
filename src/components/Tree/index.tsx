/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";
import { useState } from "react";
import Tree from "./Tree";
import node from './data/treeData';
import TreeNode from "./treeNode";
import { CheckState } from "./treeProps";

const TreeView = () => {

  const [selectedId, setSelectedId] = useState('');

  const handleSelect = (nodeId: string) => {
    if (selectedId === nodeId) {
      setSelectedId('');
      return;
    }
    setSelectedId(nodeId);
  };

  const [expandedIds, setExpandedIds] = useState<string[]>([
    '1',
    '1-1',
    '1-1-1',
    '1-1-2',
    '1-1-3',
    '1-2',
    '1-2-1',
    '1-3',
  ]);

  const handleToggleExpand = (nodeId: string) => {
    if (expandedIds.includes(nodeId)) {
      setExpandedIds(expandedIds.filter((expandedId => nodeId !== expandedId)));
      return;
    }
    setExpandedIds([...expandedIds, nodeId]);
  };

  const toCheckStates = (node: TreeNode): CheckState[] => {

    const checkStates: CheckState[] = [];

    if (node.isChecked !== undefined) {
      checkStates.push({ nodeId: node.id, checked: node.isChecked });
    }

    if (node.childNodes && node.childNodes.length > 0) {
      node.childNodes.forEach(childNode => {
        const states = toCheckStates(childNode);
        checkStates.push(...states);
      });
    }

    return checkStates;
  }

  const [checkStates, setCheckStates] = useState<CheckState[]>(
    toCheckStates(node) ?? []);

  const handleToggleCheck = (nodeId: string) => {

    const newStates: CheckState[] = checkStates.map((state) => {
      return {
        nodeId: state.nodeId,
        checked: state.nodeId === nodeId ? !state.checked : state.checked
      }
    });

    setCheckStates(newStates);
  }

  const extractNode = (
    node: TreeNode,
    extractNodeId: string
  ): TreeNode | null => {

    if (!node.childNodes) {
      return null;
    }

    const extractIndex = node.childNodes.findIndex(v => v.id === extractNodeId);

    if (extractIndex === -1) {

      for (let i = 0; i < node.childNodes.length; i++) {

        const extractedNode = extractNode(node.childNodes[i], extractNodeId);

        if (extractedNode !== null) {
          return extractedNode;
        }
      }

      return null;
    }

    const extractedNode = node.childNodes[extractIndex];

    node.childNodes.splice(extractIndex, 1);

    if (node.childNodes.length === 0) {
      node.childNodes = undefined;
    }

    return extractedNode;
  };

  const insertNode = (
    node: TreeNode,
    rootNode: TreeNode,
    ancestorNodeIds: string[],
    previousNodeId: string | undefined
  ): void => {

    let parentNode: TreeNode | undefined = rootNode;

    ancestorNodeIds.forEach((findNodeId) => {

      if (parentNode === undefined) {
        return;
      }

      if (!parentNode.childNodes) {
        return;
      }

      if (findNodeId !== rootNode.id) {
        parentNode = parentNode.childNodes.find(v => v.id === findNodeId);
      }
    });

    if (!parentNode.childNodes) {
      parentNode.childNodes = [node];
      return;
    }

    if (previousNodeId === undefined) {
      parentNode.childNodes.unshift(node);
      return;
    }

    for (let i = 0; i < parentNode.childNodes.length; i++) {
      if (parentNode.childNodes[i].id === previousNodeId) {
        parentNode.childNodes.splice(i + 1, 0, node);
        return;
      }
    }
  }

  const [treeNode, setTreeNode] = useState<TreeNode>({...node});

  const handleDrop = (
    droppedNodeId: string,
    ancestorNodeIds: string[],
    previousNodeId: string | undefined
  ): void => {

    const node = {...treeNode};
    const extractedNode = extractNode(node, droppedNodeId);

    if (extractedNode === null) {
      return;
    }

    insertNode(extractedNode, node, ancestorNodeIds, previousNodeId);
    setTreeNode(node);
  }

  return (
    <>
      <Global styles={style.global} />
      <div>
        <Tree
          nodes={treeNode}
          selectableProps={{ nodeId: selectedId, onSelect: handleSelect }}
          expandableProps={{
            nodeIds: expandedIds,
            onToggle: handleToggleExpand
          }}
          checkableProps={{
            checkStates: checkStates,
            onToggle: handleToggleCheck
          }}
          droppableProps={{ onDrop: handleDrop }}
        />
      </div>
    </>
  );
}

export default TreeView;

const style = {
  global: css({
    body: {
      margin: '0'
    }
  })
}
