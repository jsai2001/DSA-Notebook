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
        if (root == null) return null; // @viz base
        TreeNode left = invertTree(root.left); // invert both sides first, keeping them in variables // @viz swap
        TreeNode right = invertTree(root.right); // @viz swap
        root.left = right; // then put them on the other side // @viz swap
        root.right = left; // @viz swap
        return root; // @viz return
    }
}
