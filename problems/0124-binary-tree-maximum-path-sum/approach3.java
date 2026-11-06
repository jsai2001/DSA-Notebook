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
    public int maxPathSum(TreeNode root) {
        int best = root.val; // @viz init
        Map<TreeNode, Integer> gain = new HashMap<>(); // node -> best path starting at it and going down // @viz init
        Deque<TreeNode> nodes = new ArrayDeque<>(); // two stacks kept in step: a node and whether its children are done // @viz init
        Deque<Boolean> done = new ArrayDeque<>(); // @viz init
        nodes.push(root); // @viz init
        done.push(false); // @viz init
        while (!nodes.isEmpty()) { // @viz loop
            TreeNode node = nodes.pop(); // @viz loop
            boolean childrenDone = done.pop(); // @viz loop
            if (!childrenDone) { // first visit: come back after both children // @viz push
                nodes.push(node); done.push(true); // @viz push
                if (node.right != null) { nodes.push(node.right); done.push(false); } // @viz push
                if (node.left != null) { nodes.push(node.left); done.push(false); } // @viz push
                continue; // @viz push
            }
            int left = Math.max(0, node.left == null ? 0 : gain.get(node.left)); // second visit // @viz visit
            int right = Math.max(0, node.right == null ? 0 : gain.get(node.right)); // @viz visit
            best = Math.max(best, node.val + left + right); // a path that bends here // @viz bend
            gain.put(node, node.val + Math.max(left, right)); // what it offers its parent // @viz up
        }
        return best; // @viz return
    }
}
