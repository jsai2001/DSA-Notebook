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
import java.util.Queue;

class Solution {
    public int goodNodes(TreeNode root) {
        int count = 0; // @viz init
        // Two queues kept in step: a node and the largest value above it.
        Queue<TreeNode> nodes = new ArrayDeque<>(); // @viz init
        Queue<Integer> bests = new ArrayDeque<>(); // @viz init
        nodes.add(root); // @viz init
        bests.add(root.val); // @viz init
        while (!nodes.isEmpty()) { // @viz loop
            TreeNode node = nodes.poll(); // @viz pop
            int best = bests.poll(); // @viz pop
            if (node.val >= best) { // @viz check
                count++; // @viz good
            }
            best = Math.max(best, node.val); // @viz update
            for (TreeNode child : new TreeNode[] {node.left, node.right}) { // @viz push
                if (child != null) { nodes.add(child); bests.add(best); } // @viz push
            }
        }
        return count; // @viz return
    }
}
