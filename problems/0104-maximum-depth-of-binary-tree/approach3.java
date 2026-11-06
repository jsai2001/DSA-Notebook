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
    public int maxDepth(TreeNode root) {
        int best = 0; // @viz init
        // Two stacks kept in step: a node and its depth (a stack instead of the call stack).
        Deque<TreeNode> nodes = new ArrayDeque<>(); // @viz init
        Deque<Integer> depths = new ArrayDeque<>(); // @viz init
        if (root != null) { // @viz init
            nodes.push(root); // @viz init
            depths.push(1); // @viz init
        }
        while (!nodes.isEmpty()) { // @viz loop
            TreeNode node = nodes.pop(); // @viz pop
            int depth = depths.pop(); // @viz pop
            best = Math.max(best, depth); // @viz best
            if (node.right != null) { nodes.push(node.right); depths.push(depth + 1); } // @viz push
            if (node.left != null) { nodes.push(node.left); depths.push(depth + 1); } // @viz push
        }
        return best; // @viz return
    }
}
