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
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        Map<TreeNode, TreeNode> parent = new HashMap<>(); // each node's parent, found by walking the whole tree // @viz walk
        parent.put(root, null); // @viz walk
        ArrayDeque<TreeNode> stack = new ArrayDeque<>(); // @viz walk
        stack.push(root); // @viz walk
        while (!stack.isEmpty()) { // @viz walk
            TreeNode node = stack.pop(); // @viz walk
            for (TreeNode child : new TreeNode[] {node.left, node.right}) // @viz walk
                if (child != null) { // @viz walk
                    parent.put(child, node); // @viz walk
                    stack.push(child); // @viz walk
                }
        }
        Set<TreeNode> ancestors = new HashSet<>(); // p and everything above it // @viz up
        for (; p != null; p = parent.get(p)) ancestors.add(p); // @viz up
        while (!ancestors.contains(q)) q = parent.get(q); // climb from q until the paths meet // @viz meet
        return q; // @viz return
    }
}
