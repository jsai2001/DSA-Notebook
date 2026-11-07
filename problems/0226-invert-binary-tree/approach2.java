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
    public TreeNode invertTree(TreeNode root) {
        ArrayDeque<TreeNode> queue = new ArrayDeque<>(); // @viz init
        if (root != null) queue.add(root); // @viz init
        while (!queue.isEmpty()) { // visit every node, level by level // @viz pop
            TreeNode node = queue.poll(); // @viz pop
            TreeNode t = node.left; // swap its two children // @viz swap
            node.left = node.right; // @viz swap
            node.right = t; // @viz swap
            if (node.left != null) queue.add(node.left); // @viz push
            if (node.right != null) queue.add(node.right); // @viz push
        }
        return root; // @viz return
    }
}
