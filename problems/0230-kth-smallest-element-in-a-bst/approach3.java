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
        ArrayDeque<TreeNode> stack = new ArrayDeque<>(); // the path of nodes whose left side is being visited // @viz init
        TreeNode node = root; // @viz init
        while (true) { // @viz loop
            while (node != null) { // go as far left as possible: that's the smallest left // @viz down
                stack.push(node); // @viz down
                node = node.left; // @viz down
            }
            node = stack.pop(); // the next smallest value // @viz pop
            if (--k == 0) return node.val; // @viz pop, found
            node = node.right; // then everything to its right, smallest first // @viz right
        }
    }
}
