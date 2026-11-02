import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    private final Map<List<Integer>, Integer> ids = new HashMap<>(); // (val, left id, right id) -> a number // @viz init
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        ids.clear(); // two subtrees get the same number exactly when they're equal // @viz init
        int target = tag(subRoot, new ArrayList<>()); // @viz target
        List<Integer> everywhere = new ArrayList<>(); // the number of every subtree of root // @viz scan
        tag(root, everywhere); // @viz scan
        return everywhere.contains(target); // @viz return
    }
    private int tag(TreeNode node, List<Integer> out) { // returns node's number, and adds it to out // @viz tag
        if (node == null) return 0; // every empty subtree is number 0 // @viz tag
        int left = tag(node.left, out), right = tag(node.right, out); // children first // @viz key
        List<Integer> key = List.of(node.val, left, right); // @viz key
        Integer id = ids.get(key); // @viz key
        if (id == null) { // @viz key
            id = ids.size() + 1; // a shape not seen before: the next number // @viz key
            ids.put(key, id); // @viz key
        }
        out.add(id); // @viz key
        return id; // @viz key
    }
}
