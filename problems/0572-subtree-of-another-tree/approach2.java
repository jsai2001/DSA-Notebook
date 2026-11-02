import java.util.ArrayList;
import java.util.List;
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
    private static final int NONE = Integer.MIN_VALUE; // stands for a missing child; node values are only -10^4..10^4
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        List<Integer> textList = new ArrayList<>(), patternList = new ArrayList<>(); // @viz walk
        preorder(root, textList); // @viz walk
        preorder(subRoot, patternList); // @viz walk
        int[] text = textList.stream().mapToInt(Integer::intValue).toArray(); // @viz walk
        int[] pattern = patternList.stream().mapToInt(Integer::intValue).toArray(); // @viz walk
        // KMP. fail[i]: length of the longest proper prefix of pattern[0..i] that is also its suffix
        int[] fail = new int[pattern.length]; // @viz table
        int k = 0; // @viz table
        for (int i = 1; i < pattern.length; i++) { // @viz table
            while (k > 0 && pattern[i] != pattern[k]) k = fail[k - 1]; // @viz table
            if (pattern[i] == pattern[k]) k++; // @viz table
            fail[i] = k; // @viz table
        }
        k = 0; // how much of pattern matches the text read so far // @viz search
        for (int x : text) { // @viz search
            while (k > 0 && x != pattern[k]) k = fail[k - 1]; // mismatch: fall back in pattern, never back in text // @viz back
            if (x == pattern[k]) { // @viz search
                k++; // @viz search
                if (k == pattern.length) return true; // all of subRoot's preorder, in a row // @viz found
            }
        }
        return false; // @viz return
    }
    private void preorder(TreeNode node, List<Integer> out) { // values in preorder, with NONE for every missing child // @viz walk
        if (node == null) { // @viz walk
            out.add(NONE); // @viz walk
            return; // @viz walk
        }
        out.add(node.val); // @viz walk
        preorder(node.left, out); // @viz walk
        preorder(node.right, out); // @viz walk
    }
}
