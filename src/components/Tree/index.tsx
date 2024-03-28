/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";
import { useState } from "react";
import Tree from "./Tree";
import nodes from './data/treeData1';
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

  const toCheckStates = (nodes: TreeNode[]): CheckState[] => {

    const checkStates: CheckState[] = [];

    nodes.forEach((node) => {

      if (node.isChecked !== undefined) {
        checkStates.push({ nodeId: node.id, checked: node.isChecked });
      }

      if (node.childNodes) {
        const states = toCheckStates(node.childNodes);
        checkStates.push(...states);
      }
    });

    return checkStates;
  }

  const [checkStates, setCheckStates] = useState<CheckState[]>(
    toCheckStates(nodes) ?? []);

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
    nodes: TreeNode[],
    extractNodeId: string
  ): TreeNode | null => {

    let extractedNode: TreeNode | null = null;

    nodes.forEach((node) => {

      if (!node.childNodes) {
        return;
      }

      const extractIndex = node.childNodes.findIndex(
        v => v.id === extractNodeId);

      if (extractIndex === -1) {
        const v = extractNode(node.childNodes, extractNodeId);
        if (v) {
          extractedNode = v;
        }
        return;
      }

      extractedNode = node.childNodes[extractIndex];

      node.childNodes.splice(extractIndex, 1);

      if (node.childNodes.length === 0) {
        node.childNodes = undefined;
      }
    });

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

  const [treeNodes, setTreeNodes] = useState<TreeNode[]>(nodes);

  const handleDrop = (
    droppedNodeId: string,
    ancestorNodeIds: string[],
    previousNodeId: string | undefined
  ): void => {

    console.log(droppedNodeId, ancestorNodeIds, previousNodeId)

    const nodes = [...treeNodes];

    const extractedNode = extractNode(nodes, droppedNodeId);

    if (extractedNode === null) {
      return;
    }

    if (ancestorNodeIds.length === 0) {
      nodes.push(extractedNode);
      setTreeNodes(nodes);
      return;
    }

    nodes.forEach((node) => {
      if (ancestorNodeIds[0] === node.id) {
        insertNode(extractedNode, node, ancestorNodeIds, previousNodeId);
      }
    });

    setTreeNodes(nodes);
  }

  return (
    <>
      <Global styles={style.global} />
      <div>
        <Tree
          nodes={treeNodes}
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
