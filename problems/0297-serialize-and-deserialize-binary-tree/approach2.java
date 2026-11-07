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
    private String[] tokens;
    private int pos;
    public String serialize(TreeNode root) {
        StringBuilder out = new StringBuilder(); // pre-order: node, left subtree, right subtree; "#" for null // @viz ser
        walk(root, out); // @viz ser
        out.setLength(out.length() - 1); // drop the last comma // @viz trim
        return out.toString(); // @viz trim
    }
    public TreeNode deserialize(String data) {
        tokens = data.split(","); // read the tokens in the same order they were written // @viz root
        pos = 0; // @viz root
        return build(); // @viz return
    }
    private void walk(TreeNode node, StringBuilder out) { // @viz ser
        if (node == null) { out.append("#,"); return; } // @viz ser
        out.append(node.val).append(','); // @viz ser
        walk(node.left, out); // @viz ser
        walk(node.right, out); // @viz ser
    }
    private TreeNode build() { // @viz link
        String t = tokens[pos++]; // @viz link
        if (t.equals("#")) return null; // @viz empty
        TreeNode node = new TreeNode(Integer.parseInt(t)); // @viz link
        node.left = build(); // the left subtree's tokens come right after the node // @viz link
        node.right = build(); // @viz link
        return node; // @viz link
    }
}
