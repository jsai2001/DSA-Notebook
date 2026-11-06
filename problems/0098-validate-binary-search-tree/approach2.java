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
    public boolean isValidBST(TreeNode root) {
        Integer prev = null; // the last value visited in order (null: nothing yet; a value can be Integer.MIN_VALUE) // @viz init
        Deque<TreeNode> stack = new ArrayDeque<>(); // @viz init
        TreeNode node = root; // @viz init
        while (!stack.isEmpty() || node != null) { // in-order: left subtree, node, right subtree // @viz loop
            while (node != null) { // go as far left as possible // @viz left
                stack.push(node); // @viz left
                node = node.left; // @viz left
            }
            node = stack.pop(); // the smallest value not visited yet // @viz visit
            if (prev != null && node.val <= prev) // in a BST the in-order values only go up // @viz check
                return false; // @viz bad
            prev = node.val; // @viz visit
            node = node.right; // @viz right
        }
        return true; // @viz return
    }
}
