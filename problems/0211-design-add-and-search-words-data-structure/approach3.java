class WordDictionary {
    private static class Node {
        Node[] child = new Node[26];
        boolean end;
    }
    private final Node root = new Node(); // @viz init
    public WordDictionary() {}
    public void addWord(String word) {
        Node node = root; // @viz add
        for (int i = 0; i < word.length(); i++) { // @viz add
            int k = word.charAt(i) - 'a'; // @viz add
            if (node.child[k] == null) node.child[k] = new Node(); // @viz add
            node = node.child[k]; // @viz add
        }
        node.end = true; // a word ends here // @viz add
    }
    public boolean search(String word) {
        return dfs(root, word, 0); // @viz search
    }
    private boolean dfs(Node node, String word, int i) { // can word[i:] be spelled from node? // @viz dfs
        if (i == word.length()) return node.end; // every letter matched // @viz done
        char ch = word.charAt(i); // @viz dfs
        if (ch == '.') { // any child will do: try each one // @viz dot
            for (Node c : node.child) // @viz dot
                if (c != null && dfs(c, word, i + 1)) return true; // @viz dot
            return false; // @viz dot
        }
        Node next = node.child[ch - 'a']; // a letter: only one child to follow // @viz letter
        return next != null && dfs(next, word, i + 1); // @viz letter
    }
}
