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

class Solution {
    public int goodNodes(TreeNode root) {
        int count = 0; // @viz init
        // Two stacks kept in step: a node and the largest value above it.
        Deque<TreeNode> nodes = new ArrayDeque<>(); // @viz init
        Deque<Integer> bests = new ArrayDeque<>(); // @viz init
        nodes.push(root); // @viz init
        bests.push(root.val); // @viz init
        while (!nodes.isEmpty()) { // @viz loop
            TreeNode node = nodes.pop(); // @viz pop
            int best = bests.pop(); // @viz pop
            if (node.val >= best) { // @viz check
                count++; // @viz good
            }
            best = Math.max(best, node.val); // @viz update
            // push right first so the left child is popped (visited) first
            if (node.right != null) { nodes.push(node.right); bests.push(best); } // @viz push
            if (node.left != null) { nodes.push(node.left); bests.push(best); } // @viz push
        }
        return count; // @viz return
    }
}
