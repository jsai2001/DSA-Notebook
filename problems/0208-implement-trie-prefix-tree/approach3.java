class Trie {
    private static class Node {
        Node[] child = new Node[26]; // child[k] = the node for letter 'a' + k
        boolean end;
    }
    private final Node root = new Node(); // @viz init
    public Trie() {}
    public void insert(String word) {
        Node node = root; // @viz insert
        for (int i = 0; i < word.length(); i++) { // @viz insert
            int k = word.charAt(i) - 'a'; // 'a' -> 0 ... 'z' -> 25 // @viz insert
            if (node.child[k] == null) node.child[k] = new Node(); // @viz insert
            node = node.child[k]; // @viz insert
        }
        node.end = true; // a word ends here // @viz end
    }
    public boolean search(String word) {
        Node node = walk(word); // @viz search
        return node != null && node.end; // spelled out, and a word ends exactly here // @viz search
    }
    public boolean startsWith(String prefix) {
        return walk(prefix) != null; // spelled out is enough // @viz prefix
    }
    private Node walk(String s) { // the node reached by spelling s, or null // @viz walk
        Node node = root; // @viz walk
        for (int i = 0; i < s.length(); i++) { // @viz walk
            node = node.child[s.charAt(i) - 'a']; // @viz walk
            if (node == null) return null; // @viz walk
        }
        return node; // @viz walk
    }
}
