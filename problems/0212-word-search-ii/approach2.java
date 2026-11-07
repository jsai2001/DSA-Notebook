import java.util.*;
class Solution {
    private static class Node {
        Node[] child = new Node[26];
        int kids; // children in use
        String word; // the word that ends at this node
    }
    private final List<String> res = new ArrayList<>();
    public List<String> findWords(char[][] board, String[] words) {
        Node root = new Node(); // a trie of all the words // @viz init
        for (String w : words) { // @viz init
            Node node = root; // @viz init
            for (int i = 0; i < w.length(); i++) { // @viz init
                int k = w.charAt(i) - 'a'; // @viz init
                if (node.child[k] == null) { node.child[k] = new Node(); node.kids++; } // @viz init
                node = node.child[k]; // @viz init
            }
            node.word = w; // @viz init
        }
        for (int r = 0; r < board.length; r++) // one DFS from every cell finds all the words at once // @viz start
            for (int c = 0; c < board[0].length; c++) // @viz start
                dfs(board, r, c, root); // @viz start
        return res; // @viz return
    }
    private void dfs(char[][] board, int r, int c, Node node) { // node = the trie node for the letters on the path so far // @viz dfs
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return; // @viz dfs
        char ch = board[r][c]; // @viz dfs
        if (ch == '#' || node.child[ch - 'a'] == null) return; // no word goes on with this letter, or the cell is on the path // @viz stop
        Node next = node.child[ch - 'a']; // @viz step
        if (next.word != null) { // the path spells a whole word // @viz found
            res.add(next.word); // @viz found
            next.word = null; // clear it, so it's reported once // @viz found
        }
        board[r][c] = '#'; // @viz step
        dfs(board, r + 1, c, next); // @viz step
        dfs(board, r - 1, c, next); // @viz step
        dfs(board, r, c + 1, next); // @viz step
        dfs(board, r, c - 1, next); // @viz step
        board[r][c] = ch; // @viz back
    }
}
