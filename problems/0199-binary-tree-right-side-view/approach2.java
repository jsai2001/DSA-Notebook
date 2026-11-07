import java.util.*;
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
class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> res = new ArrayList<>(); // @viz init
        if (root == null) return res; // @viz empty
        ArrayDeque<TreeNode> queue = new ArrayDeque<>(); // @viz init
        queue.add(root); // @viz init
        while (!queue.isEmpty()) { // @viz level
            int size = queue.size(); // exactly one level is in the queue // @viz level
            for (int k = 0; k < size; k++) { // @viz pop
                TreeNode node = queue.poll(); // @viz pop
                if (k == size - 1) res.add(node.val); // the last node of the level is the one seen from the right // @viz last
                if (node.left != null) queue.add(node.left); // @viz push
                if (node.right != null) queue.add(node.right); // @viz push
            }
        }
        return res; // @viz return
    }
}
