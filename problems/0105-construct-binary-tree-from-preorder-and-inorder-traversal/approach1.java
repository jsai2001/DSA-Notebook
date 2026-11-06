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
import java.util.Arrays;
class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        if (preorder.length == 0) return null; // no values: no tree // @viz empty
        TreeNode root = new TreeNode(preorder[0]); // preorder starts with the root // @viz root
        int k = 0; // in inorder, everything before the root is its left subtree // @viz find
        while (inorder[k] != root.val) k++; // @viz find
        // The left subtree has k values: the next k of preorder, and the first k of inorder.
        root.left = buildTree(Arrays.copyOfRange(preorder, 1, k + 1), Arrays.copyOfRange(inorder, 0, k)); // @viz left
        root.right = buildTree(Arrays.copyOfRange(preorder, k + 1, preorder.length), Arrays.copyOfRange(inorder, k + 1, inorder.length)); // @viz right
        return root; // @viz return
    }
}
