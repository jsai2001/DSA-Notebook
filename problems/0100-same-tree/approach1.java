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
    public boolean isSameTree(TreeNode p, TreeNode q) {
        StringBuilder a = new StringBuilder(), b = new StringBuilder(); // @viz init
        write(p, a); // @viz init
        write(q, b); // @viz init
        return a.toString().equals(b.toString()); // same text means same shape and same values // @viz compare
    }
    private void write(TreeNode node, StringBuilder out) { // the tree as text, with "#" for every missing child // @viz write
        if (node == null) { // @viz write
            out.append("#,"); // without this, [1,2] and [1,null,2] would both give "1,2" // @viz write
            return; // @viz write
        }
        out.append(node.val).append(','); // the comma keeps 1,23 apart from 12,3 // @viz write
        write(node.left, out); // @viz write
        write(node.right, out); // @viz write
    }
}
