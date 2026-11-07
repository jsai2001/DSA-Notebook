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
    private int left, ans;
    private boolean done;
    public int kthSmallest(TreeNode root, int k) {
        left = k; // how many values are still to be counted // @viz init
        inorder(root); // @viz init
        return ans; // @viz return
    }
    private void inorder(TreeNode node) { // @viz visit
        if (node == null || done) return; // nothing here, or already found: stop // @viz stop
        inorder(node.left); // @viz visit
        if (done) return; // @viz stop
        if (--left == 0) { // this node is the next smallest // @viz count, found
            ans = node.val; // @viz found
            done = true; // @viz found
            return; // @viz found
        }
        inorder(node.right); // @viz visit
    }
}
