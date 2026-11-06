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
    public boolean isSameTree(TreeNode p, TreeNode q) {
        // ArrayDeque can't hold null, so pairs go in as a small array (null entries inside are fine).
        Deque<TreeNode[]> queue = new ArrayDeque<>(); // pairs of nodes at the same spot in both trees // @viz init
        queue.add(new TreeNode[] {p, q}); // @viz init
        while (!queue.isEmpty()) { // @viz loop
            TreeNode[] pair = queue.poll(); // @viz loop
            TreeNode a = pair[0], b = pair[1]; // @viz loop
            if (a == null && b == null) continue; // both missing: fine // @viz both
            if (a == null || b == null || a.val != b.val) return false; // one missing, or different values // @viz diff
            queue.add(new TreeNode[] {a.left, b.left}); // @viz push
            queue.add(new TreeNode[] {a.right, b.right}); // @viz push
        }
        return true; // every pair matched // @viz return
    }
}
