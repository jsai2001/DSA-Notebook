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
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        TreeNode node = root; // @viz init
        while (true) { // @viz loop
            if (p.val < node.val && q.val < node.val) node = node.left; // both are smaller: both are in the left subtree // @viz left
            else if (p.val > node.val && q.val > node.val) node = node.right; // both bigger: both on the right // @viz right
            else return node; // they split here (or one of them is this node) // @viz found
        }
    }
}
