/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;
class Solution {
    public boolean isBalanced(TreeNode root) {
        Map<TreeNode, Integer> height = new HashMap<>(); // node -> height of its subtree, filled in children first // @viz init
        Deque<TreeNode> nodes = new ArrayDeque<>(); // two stacks kept in step: a node and whether its children are done // @viz init
        Deque<Boolean> done = new ArrayDeque<>(); // @viz init
        if (root != null) { nodes.push(root); done.push(false); } // @viz init
        while (!nodes.isEmpty()) { // @viz loop
            TreeNode node = nodes.pop(); // @viz loop
            boolean childrenDone = done.pop(); // @viz loop
            if (!childrenDone) { // first visit: come back after both children // @viz push
                nodes.push(node); done.push(true); // @viz push
                if (node.right != null) { nodes.push(node.right); done.push(false); } // @viz push
                if (node.left != null) { nodes.push(node.left); done.push(false); } // @viz push
                continue; // @viz push
            }
            int left = node.left == null ? 0 : height.get(node.left); // second visit: both heights are known // @viz visit
            int right = node.right == null ? 0 : height.get(node.right); // @viz visit
            if (Math.abs(left - right) > 1) return false; // @viz bad
            height.put(node, 1 + Math.max(left, right)); // @viz visit
        }
        return true; // @viz return
    }
}
