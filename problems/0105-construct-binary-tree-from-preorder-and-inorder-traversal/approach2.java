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
import java.util.HashMap;
import java.util.Map;
class Solution {
    private Map<Integer, Integer> where;
    private int[] pre;
    private int next;
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        where = new HashMap<>(); // value -> its index in inorder: O(1) lookups // @viz init
        for (int i = 0; i < inorder.length; i++) where.put(inorder[i], i); // @viz init
        pre = preorder; // @viz init
        next = 0; // the next unused value of preorder // @viz init
        return build(0, inorder.length - 1); // @viz init
    }
    private TreeNode build(int lo, int hi) { // build the subtree made of inorder[lo..hi] // @viz call
        if (lo > hi) return null; // no values here: no subtree // @viz empty
        TreeNode root = new TreeNode(pre[next++]); // preorder gives the roots in the order they're needed // @viz root
        int k = where.get(root.val); // @viz find
        root.left = build(lo, k - 1); // left first: preorder lists the whole left subtree before the right // @viz left
        root.right = build(k + 1, hi); // @viz right
        return root; // @viz return
    }
}
