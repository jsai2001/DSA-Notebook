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
        if (root == null) return 0; // an empty tree has depth 0 // @viz empty
        int depth = 0; // @viz init
        Deque<TreeNode> queue = new ArrayDeque<>(); // @viz init
        queue.add(root); // @viz init
        while (!queue.isEmpty()) { // one round per level // @viz loop
            depth++; // @viz level
            int n = queue.size(); // exactly this level's nodes are in the queue // @viz level
            for (int k = 0; k < n; k++) { // @viz level
                TreeNode node = queue.poll(); // @viz pop
                if (node.left != null) queue.add(node.left); // @viz push
                if (node.right != null) queue.add(node.right); // @viz push
            }
        }
        return depth; // the number of levels // @viz return
    }
}
