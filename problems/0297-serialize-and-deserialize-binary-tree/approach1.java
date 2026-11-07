import java.util.*;
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Codec {
    public String serialize(TreeNode root) {
        List<String> out = new ArrayList<>(); // level by level, "null" for every missing child // @viz ser
        List<TreeNode> q = new ArrayList<>(); // the queue, as a list: ArrayDeque can't hold null // @viz ser
        q.add(root); // @viz ser
        for (int k = 0; k < q.size(); k++) { // @viz ser
            TreeNode node = q.get(k); // @viz ser
            if (node != null) { // @viz ser
                out.add(String.valueOf(node.val)); // @viz ser
                q.add(node.left); // @viz ser
                q.add(node.right); // @viz ser
            } else out.add("null"); // @viz ser
        }
        while (!out.isEmpty() && out.get(out.size() - 1).equals("null")) out.remove(out.size() - 1); // trailing nulls carry no information // @viz trim
        return String.join(",", out); // @viz trim
    }
    public TreeNode deserialize(String data) {
        if (data.isEmpty()) return null; // @viz empty
        String[] vals = data.split(","); // @viz root
        TreeNode root = new TreeNode(Integer.parseInt(vals[0])); // @viz root
        ArrayDeque<TreeNode> queue = new ArrayDeque<>(); // parents waiting for their two children, in order // @viz root
        queue.add(root); // @viz root
        int i = 1; // @viz root
        while (!queue.isEmpty() && i < vals.length) { // @viz link
            TreeNode node = queue.poll(); // the next two tokens are its left and right child // @viz link
            if (i < vals.length && !vals[i].equals("null")) { // @viz link
                node.left = new TreeNode(Integer.parseInt(vals[i])); // @viz link
                queue.add(node.left); // @viz link
            }
            i++; // @viz link
            if (i < vals.length && !vals[i].equals("null")) { // @viz link
                node.right = new TreeNode(Integer.parseInt(vals[i])); // @viz link
                queue.add(node.right); // @viz link
            }
            i++; // @viz link
        }
        return root; // @viz return
    }
}
