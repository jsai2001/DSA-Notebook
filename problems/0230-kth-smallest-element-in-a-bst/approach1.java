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
    public int kthSmallest(TreeNode root, int k) {
        List<Integer> vals = new ArrayList<>(); // @viz init
        inorder(root, vals); // every value, smallest first // @viz init
        return vals.get(k - 1); // @viz return
    }
    private void inorder(TreeNode node, List<Integer> vals) { // left, node, right: a BST comes out sorted // @viz visit
        if (node == null) return; // @viz visit
        inorder(node.left, vals); // @viz visit
        vals.add(node.val); // @viz add
        inorder(node.right, vals); // @viz visit
    }
}
